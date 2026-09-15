import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeSlug from "rehype-slug"
import rehypeKatex from "rehype-katex"
import { getAllBlogPosts, getBlogPost, getExcerpt } from "@/lib/mdx"
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_AUTHOR } from "@/lib/seo"
import type { TocItem } from "@/lib/toc"
import { mdxComponents } from "@/components/mdx-components"
import BlogPostClient from "@/components/BlogPostClient"
import "./article.css"

export const dynamicParams = false
export function generateStaticParams() {
  return getAllBlogPosts().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: "Post not found" }
  const description = post.description || getExcerpt(post.content)
  const image = post.coverImage ? absoluteUrl(post.coverImage) : DEFAULT_OG_IMAGE
  return {
    title: post.title, description, keywords: post.tags,
    alternates: { canonical: absoluteUrl(`/${slug}/`) },
    openGraph: {
      type: "article", title: post.title, description, url: absoluteUrl(`/${slug}/`),
      publishedTime: new Date(`${post.date}, ${post.year} 00:00:00 GMT`).toISOString(),
      authors: [post.author || SITE_AUTHOR], images: [{ url: image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description, images: [image] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const lines = post.content.split("\n")
  const refsIndex = lines.findIndex(line => line.trim() === "## References")
  const references: Record<string, string> = {}
  if (refsIndex !== -1) {
    for (const line of lines.slice(refsIndex + 1)) {
      const match = line.trim().match(/^(\d+)\.\s+(.+)$/)
      if (match) references[match[1]] = match[2]
    }
  }

  // Read the actual rendered heading IDs so contents links always match.
  const toc: TocItem[] = []
  type Node = { type?: string; tagName?: string; value?: string; properties?: { id?: string }; children?: Node[] }
  const textOf = (node: Node): string => node.value || (node.children || []).map(textOf).join("")
  function collectToc() {
    return (tree: Node) => {
      const visit = (node: Node) => {
        if (node.tagName === "h2" || node.tagName === "h3") {
          const item: TocItem = { id: String(node.properties?.id), title: textOf(node), level: node.tagName === "h2" ? 2 : 3 }
          if (item.level === 2 || !toc.length) toc.push(item)
          else (toc[toc.length - 1].children ||= []).push(item)
        }
        node.children?.forEach(visit)
      }
      visit(tree)
    }
  }
  const { content } = await compileMDX({
    source: refsIndex === -1 ? post.content : lines.slice(0, refsIndex).join("\n"),
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeSlug, collectToc, rehypeKatex] } },
  })
  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title,
    description: post.description || getExcerpt(post.content),
    image: post.coverImage ? absoluteUrl(post.coverImage) : DEFAULT_OG_IMAGE,
    datePublished: new Date(`${post.date}, ${post.year} 00:00:00 GMT`).toISOString(),
    author: { "@type": "Person", name: post.author || SITE_AUTHOR, url: absoluteUrl("/") },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/${slug}/`) },
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <BlogPostClient title={post.title} author={post.author} date={`${post.date}, ${post.year}`} coverImage={post.coverImage} references={references} toc={toc}>
      {content}
    </BlogPostClient>
  </>
}

import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"
import { getAllBlogPosts } from "@/lib/mdx"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...getAllBlogPosts().map(post => ({ url: absoluteUrl(`/${post.slug}/`), changeFrequency: "yearly" as const, priority: 0.6 })),
  ]
}

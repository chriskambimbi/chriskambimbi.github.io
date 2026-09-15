import { getAllBlogPosts, getExcerpt } from "@/lib/mdx"
import { SITE_URL, SITE_NAME, SITE_AUTHOR, DEFAULT_DESCRIPTION, absoluteUrl } from "@/lib/seo"

export const dynamic = "force-static"

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function GET() {
  const items = getAllBlogPosts()
    .map(post => {
      const url = absoluteUrl(`/${post.slug}/`)
      const pubDate = new Date(`${post.date}, ${post.year} 00:00:00 GMT`).toUTCString()
      const description = post.description || getExcerpt(post.content, 300)
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(SITE_AUTHOR)}</author>
      <description>${escapeXml(description)}</description>
    </item>`
    })
    .join("\n")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(DEFAULT_DESCRIPTION)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}

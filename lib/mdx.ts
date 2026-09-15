import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  author: string
  date: string
  year: number
  coverImage?: string
  description?: string
  tags?: string[]
  category: string
  readingMinutes: number
  content: string
}

function readingMinutes(content: string): number {
  return Math.max(1, Math.round(content.split(/\s+/).length / 220))
}

// Derive a plain-text summary from MDX content for meta descriptions.
// Falls back to this when a post has no explicit `description` in frontmatter.
export function getExcerpt(content: string, maxLength = 160): string {
  const plain = content
    .replace(/<[^>]+>/g, "") // strip JSX/HTML tags (e.g. <Citation />)
    .replace(/^#{1,6}\s+.*$/gm, "") // strip markdown headings
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // strip images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // unwrap links to their text
    .replace(/[*_`>#-]/g, "") // strip remaining markdown punctuation
    .replace(/\\([$%&#_{}])/g, "$1") // unescape escaped chars
    .replace(/\s+/g, " ")
    .trim()

  if (plain.length <= maxLength) return plain
  return plain.slice(0, maxLength).replace(/\s+\S*$/, "") + "…"
}

export function getAllBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(contentDirectory)

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(contentDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)

      return {
        slug,
        title: data.title || '',
        author: data.author || '',
        date: data.date || '',
        year: data.year || new Date().getFullYear(),
        coverImage: data.coverImage,
        description: data.description,
        tags: data.tags || [],
        category: data.category || 'research',
        readingMinutes: readingMinutes(content),
        content,
      }
    })
    .sort((a, b) => {
      // Sort by year and date, most recent first
      if (a.year !== b.year) {
        return b.year - a.year
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || '',
      author: data.author || '',
      date: data.date || '',
      year: data.year || new Date().getFullYear(),
      coverImage: data.coverImage,
      description: data.description,
      tags: data.tags || [],
      category: data.category || 'research',
      readingMinutes: readingMinutes(content),
      content,
    }
  } catch (error) {
    return null
  }
}

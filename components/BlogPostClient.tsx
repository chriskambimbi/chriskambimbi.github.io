"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import type { TocItem } from "@/lib/toc"

function ReferenceText({ text }: { text: string }) {
  return <>{text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    return match && /^https?:\/\//.test(match[2])
      ? <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer">{match[1]}</a>
      : <span key={i}>{part.replace(/\\\$/g, "$")}</span>
  })}</>
}

export default function BlogPostClient({ title, author, date, coverImage, children, references, toc }: {
  title: string; author: string; date: string; coverImage?: string; children: ReactNode;
  references: Record<string, string>; toc: TocItem[]
}) {
  const [tocVisible, setTocVisible] = useState(true)
  const [activeId, setActiveId] = useState("")
  const articleRef = useRef<HTMLElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const article = articleRef.current
    if (!article) return
    const headings = Array.from(article.querySelectorAll<HTMLElement>("h2[id], h3[id]"))
    const onScroll = () => {
      let current = headings[0]?.id || ""
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 130) current = heading.id
        else break
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}
    import("medium-zoom").then(({ default: mediumZoom }) => {
      if (disposed || !layoutRef.current) return
      const zoom = mediumZoom(layoutRef.current.querySelectorAll<HTMLImageElement>("[data-zoomable]"), {
        margin: 24, background: document.documentElement.classList.contains("dark") ? "#191c18" : "#ffffff",
      })
      cleanup = () => zoom.detach()
    })
    return () => { disposed = true; cleanup() }
  }, [])

  useEffect(() => {
    const article = articleRef.current
    if (!article) return
    const positionReferences = () => {
      const origin = article.getBoundingClientRect().top
      const positions = Object.keys(references).flatMap(num => {
        const citation = article.querySelector(`[data-citation="${num}"]`)
        const note = article.querySelector<HTMLElement>(`#reference-${num}`)
        return citation && note ? [{ note, top: citation.getBoundingClientRect().top - origin }] : []
      }).sort((a, b) => a.top - b.top)
      let nextTop = 0
      for (const { note, top } of positions) {
        const adjusted = Math.max(top, nextTop)
        note.style.top = `${adjusted}px`
        nextTop = adjusted + note.offsetHeight + 12
      }
    }
    positionReferences()
    const observer = new ResizeObserver(positionReferences)
    observer.observe(article)
    article.querySelectorAll('.margin-note').forEach(note => observer.observe(note))
    window.addEventListener("resize", positionReferences)
    return () => { observer.disconnect(); window.removeEventListener("resize", positionReferences) }
  }, [references])

  return (
    <div className="blog-layout" ref={layoutRef}>
      <div className="article-main">
        <a className="back-to-blog" href="/#blog">← All posts</a>
        <header className="article-header">
          <h1>{title}</h1>
          <div className="article-meta">
            {author && <p className="article-author">{author}</p>}
            <p className="article-date">{date}</p>
          </div>
        </header>
        {toc.length > 0 && <nav className="toc-sidebar" aria-label="Table of contents">
          <button type="button" className="toc-toggle" aria-expanded={tocVisible} aria-controls="article-contents" onClick={() => setTocVisible(!tocVisible)}>
            <span aria-hidden="true">{tocVisible ? "⌄" : "›"}</span> Contents
          </button>
          <ul className="toc-list" id="article-contents" hidden={!tocVisible}>
            {toc.map(item => {
              const childActive = item.children?.some(child => child.id === activeId)
              const itemClass = item.id === activeId ? "active" : childActive ? "active-parent" : undefined
              return <li key={item.id} className={itemClass}>
                <a href={`#${item.id}`}>{item.title}</a>
                {item.children && <ul>{item.children.map(child => (
                  <li key={child.id} className={child.id === activeId ? "active" : undefined}>
                    <a href={`#${child.id}`}>{child.title}</a>
                  </li>
                ))}</ul>}
              </li>
            })}
          </ul>
        </nav>}
        {coverImage && <figure className="cover-image"><img data-zoomable="" src={coverImage} alt="" /></figure>}
        <article className="article-content" ref={articleRef}>
          {children}
          {Object.keys(references).length > 0 && <aside className="margin-references" aria-label="References">
            <h2>References</h2>
            {Object.entries(references).map(([num, text]) => <div key={num} id={`reference-${num}`} className="margin-note" tabIndex={-1}>
              <sup>{num}</sup> <ReferenceText text={text} />
            </div>)}
          </aside>}
        </article>
        <a className="back-to-blog article-end" href="/#blog">← Back to all posts</a>
      </div>
    </div>
  )
}

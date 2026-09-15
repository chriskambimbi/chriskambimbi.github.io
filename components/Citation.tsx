import { ReactNode } from 'react'

interface CitationProps {
  num: number
  children?: ReactNode
}

export function Citation({ num }: CitationProps) {
  return (
    <sup data-citation={num} className="citation-marker">
      <a href={`#reference-${num}`} aria-label={`Reference ${num}`}>{num}</a>
    </sup>
  )
}

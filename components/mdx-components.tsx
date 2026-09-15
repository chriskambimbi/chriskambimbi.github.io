import type { ReactNode } from 'react'
import { Citation } from './Citation'

const ExampleBox = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="example-box"><div className="example-box-title">{title}</div><div className="example-box-content">{children}</div></div>
)
const ExampleSection = ({ children }: { children: ReactNode }) => <div className="example-box-section">{children}</div>
const ExampleCode = ({ children }: { children: ReactNode }) => <div className="example-box-code">{children}</div>
const HighlightTag = ({ children }: { children: ReactNode }) => <span className="highlight-tag">{children}</span>

export const mdxComponents = {
  Citation,
  ExampleBox,
  ExampleSection,
  ExampleCode,
  HighlightTag,
  img: ({ src, alt }: { src?: string; alt?: string }) => <img data-zoomable="" src={src} alt={alt || 'Figure'} loading="lazy" />,
}

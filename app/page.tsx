import { ArrowUpRight } from "lucide-react"
import { getAllBlogPosts, getExcerpt } from "@/lib/mdx"
import ThemeToggle from "@/components/ThemeToggle"

const projects = [
  {
    title: "MedLLM Attack Taxonomy",
    type: "AI SAFETY · RESEARCH TOOL",
    description: "An interactive taxonomy of adversarial attacks on medical large language models. Mapping vulnerabilities to better understand their risks.",
    links: [
      { label: "Explore project", url: "https://chriskambimbi.github.io/MedLLM-Attack-Taxonomy/" },
      { label: "GitHub", url: "https://github.com/chriskambimbi/MedLLM-Attack-Taxonomy" },
    ],
  },
  {
    title: "Tinker in Practice",
    type: "LLM TRAINING · INTERACTIVE TUTORIAL",
    description: "An interactive guide to using Tinker, from your first training loop to fine-tuning, reinforcement learning, and deployment. Learn through visual explanations and hands-on modules.",
    links: [
      { label: "Explore tutorial", url: "https://tinker-ochre.vercel.app/" },
    ],
  },
  {
    title: "Ellesia",
    type: "LANGUAGE MODELS · FINE-TUNING",
    description: "An AI assistant fine-tuned with Tinker. An exploration of specialized language models, with the model and training dataset openly available.",
    links: [
      { label: "GitHub", url: "https://github.com/chriskambimbi/Ellesia" },
      { label: "Model", url: "https://huggingface.co/Christim/ellesia-gpt-oss-120b" },
      { label: "Dataset", url: "https://huggingface.co/datasets/Christim/seventh-day-adventist-conversations" },
    ],
  },
]

const background = [
  { label: "Experience", rows: [
    ["2026–Present", "Research Engineer", "LibrAI"],
    ["2025", "AI Safety Student Researcher", "LibrAI"],
    ["2023–2026", "AI Safety Researcher", "Fudan University · FVL Lab"],
    ["2021–2023", "AI Operations & Community Specialist", "Dazzle AI, CivitAI, ET/Larix"],
  ] },
  { label: "Education", rows: [
    ["2023–2026", "M.S. in AI & Software Engineering", "Fudan University"],
    ["2019–2023", "B.S. in Electronic Information Engineering", "Tongji University"],
  ] },
]

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={13} aria-hidden="true" /></a>
}

const publications = [
  {
    year: "2026",
    title: "Research on Automated Jailbreak Safety Evaluation for Large Language Models",
    venue: "Master's thesis · Fudan University",
    url: "https://drive.google.com/file/d/1Rcp9KBi-M8X9J3q9Y801IZE-sqeMwyRv/view?usp=sharing",
  },
]

export default function Home() {
  const posts = getAllBlogPosts()
  const postGroups = [
    { label: "Research", posts: posts.filter(post => post.category !== "notes") },
    { label: "Notes", posts: posts.filter(post => post.category === "notes") },
  ].filter(group => group.posts.length > 0)

  return (
    <>
      <section id="about" className="intro" aria-labelledby="intro-title">
        <div className="intro-heading">
          <div>
            <p className="eyebrow">RESEARCHER & ENGINEER</p>
            <h1 id="intro-title">Chris Kambimbi<span>.</span></h1>
            <p className="intro-subtitle">Understanding AI. Making it safer.</p>
          </div>
          <img className="portrait" src="/images/chris.jpg" alt="Chris Kambimbi" width="112" height="112" fetchPriority="high" />
        </div>
        <div className="bio">
          <p>I’m a Research Engineer at <a href="https://www.librai.tech/" target="_blank" rel="noopener noreferrer">LibrAI</a>, investigating vulnerabilities in large language models. My work centers on AI safety, red teaming, and alignment.</p>
          <p>This is a small home for my work and writing: projects I’m building, ideas I’m exploring, and things I’m learning along the way.</p>
        </div>
        <div className="social-links" aria-label="Find me online">
          <a href="mailto:chriskambimbi@gmail.com">Email <ArrowUpRight size={13} aria-hidden="true" /></a>
          <ExternalLink href="https://github.com/chriskambimbi">GitHub</ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/chris-kambimbi-83757a176/">LinkedIn</ExternalLink>
          <ExternalLink href="https://x.com/chriskambimbi">X / Twitter</ExternalLink>
        </div>
        <details className="background-details">
          <summary>Experience & education <span className="details-plus" aria-hidden="true">+</span></summary>
          <div className="background-content">
            {background.map(({ label, rows }) => (
              <div key={label}>
                <h3>{label}</h3>
                {rows.map(([date, title, place]) => (
                  <div className="resume-row" key={`${title}-${place}`}>
                    <span>{date}</span><div><h4>{title}</h4><p>{place}</p></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </details>
      </section>

      <section id="blog" className="section blog-section" aria-labelledby="blog-title">
        <div className="section-heading"><h2 id="blog-title">Blog</h2><span className="section-note">Notes, research & reflections</span></div>
        {postGroups.map(group => (
          <div className="posts posts-group" key={group.label}>
            <p className="eyebrow posts-group-label">{group.label}</p>
            {group.posts.map(post => (
              <a className="post post-link" key={post.slug} href={`/${post.slug}/`}>
                <span className="post-date">{post.date}, {post.year}</span>
                <span className="post-heading">
                  <span className="post-title">{post.title}</span>
                  <span className="post-description">{post.description || getExcerpt(post.content, 150)}</span>
                  <span className="post-category">{(post.tags || []).join(" / ")} · {post.readingMinutes} min read</span>
                </span>
                <ArrowUpRight className="post-toggle" size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        ))}
      </section>

      <section id="projects" className="section" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">Projects</h2><span className="section-note">A few things I’ve built</span></div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.title}>
              <span className="project-number" aria-hidden="true">0{index + 1}</span>
              <div>
                <p className="eyebrow project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-links">{project.links.map(link => <ExternalLink key={link.url} href={link.url}>{link.label}</ExternalLink>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="publications" className="section" aria-labelledby="publications-title">
        <div className="section-heading"><h2 id="publications-title">Publications</h2><span className="section-note">Research output</span></div>
        <div className="publication-list">
          {publications.map(pub => (
            <article className="publication" key={pub.title}>
              <span className="publication-year">{pub.year}</span>
              <div>
                <h3><a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.title} <ArrowUpRight size={13} aria-hidden="true" /></a></h3>
                <p className="publication-venue">{pub.venue}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div><p>Always happy to exchange ideas.</p><a href="mailto:chriskambimbi@gmail.com">Say hello <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        <div className="footer-actions">
          <ThemeToggle />
          <a className="back-to-top" href="#about">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  )
}

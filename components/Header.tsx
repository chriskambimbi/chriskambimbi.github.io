"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  useEffect(() => setMounted(true), [])
  const isDark = resolvedTheme === "dark"

  return (
    <header className="site-header">
      <a className="wordmark" href="/#about" aria-label="Chris Kambimbi, home">ck<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="/#about">About</a>
        <a href="/#projects">Projects</a>
        <a href="/#blog">Blog</a>
        <span className="nav-divider" aria-hidden="true" />
        <button className="theme-toggle" type="button" disabled={!mounted}
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}>
          {mounted && isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </nav>
    </header>
  )
}

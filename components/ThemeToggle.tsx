"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  useEffect(() => setMounted(true), [])
  const isDark = resolvedTheme === "dark"

  return (
    <button className="theme-toggle" type="button" disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}>
      {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}

"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
    variant="outline"
    size = "icon"
    onClick = {() => setTheme(theme === "dark" ? "light" : "dark")}
    className="relative h-10 w-10 rounded-md p-0 hover:bg-zinc-300 dark:hover:bg-zinc-500 focus:outline-none"
    >
        <Sun className="h-[1.2em] w-[1.2em] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"/>
        <Moon className="absolute h-[1.2em] w-[1.2em] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
        <span className="sr-only">Toggle theme</span>
    </Button>
  ) 
}

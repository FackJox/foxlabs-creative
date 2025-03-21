"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface CursorContextType {
  cursorPosition: { x: number; y: number }
  cursorText: string
  setCursorText: (text: string) => void
}

const CursorContext = createContext<CursorContextType>({
  cursorPosition: { x: 0, y: 0 },
  cursorText: "",
  setCursorText: () => {},
})

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorTextState] = useState("")

  // Enhanced setCursorText that also updates data attribute on body
  const setCursorText = (text: string) => {
    setCursorTextState(text)
    if (text) {
      document.body.setAttribute('data-cursor-text', text)
    } else {
      document.body.removeAttribute('data-cursor-text')
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <CursorContext.Provider value={{ cursorPosition, cursorText, setCursorText }}>{children}</CursorContext.Provider>
  )
}

export function useCursor() {
  return useContext(CursorContext)
}


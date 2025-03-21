"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useCursor } from "@/hooks/use-cursor"

export default function CustomCursor() {
  const { cursorPosition, cursorText } = useCursor()
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add cursor-none class to html element
    document.documentElement.classList.add("cursor-none")

    return () => {
      document.documentElement.classList.remove("cursor-none")
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed z-[9999] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-xs font-bold text-white opacity-0 transition-opacity duration-300",
          cursorText && "opacity-100",
        )}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
        data-cursor
        data-testid="cursor"
        data-state={cursorText ? "active" : "inactive"}
      >
        {cursorText}
      </div>

      {/* Cursor small */}
      <motion.div
        className="pointer-events-none fixed z-[9998] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.2 }}
        data-cursor-small
        data-testid="cursor-small"
      />

    </>
  )
}


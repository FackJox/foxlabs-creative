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
          "pointer-events-none fixed z-50 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-xs font-bold text-white opacity-0 transition-opacity duration-300",
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

      {/* Cursor trail */}
      <div
        className="pointer-events-none fixed z-40 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black mix-blend-difference"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
        data-cursor-trail
        data-testid="cursor-trail"
      />

      {/* Cursor dots */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed z-40 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black opacity-70"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
          animate={{
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
            opacity: [0.7, 0.3, 0.7],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.2,
          }}
          data-cursor-dot
          data-testid="cursor-dot"
        />
      ))}
    </>
  )
}


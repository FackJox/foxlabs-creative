"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Point {
  x: number
  y: number
  opacity: number
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<Point[]>([])
  const maxTrailLength = 15

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      }

      setTrail((prevTrail) => {
        const updatedTrail = [...prevTrail, newPoint]

        // Remove oldest points if we exceed max length
        if (updatedTrail.length > maxTrailLength) {
          return updatedTrail.slice(updatedTrail.length - maxTrailLength)
        }

        return updatedTrail
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Fade out points over time
    const fadeInterval = setInterval(() => {
      setTrail((prevTrail) =>
        prevTrail
          .map((point) => ({
            ...point,
            opacity: point.opacity > 0 ? point.opacity - 0.05 : 0,
          }))
          .filter((point) => point.opacity > 0),
      )
    }, 50)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(fadeInterval)
    }
  }, [])

  return (
    <>
      {trail.map((point, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed z-40 h-2 w-2 rounded-full bg-black"
          style={{
            left: point.x,
            top: point.y,
            opacity: point.opacity,
            scale: 1 - i * 0.05,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 - i * 0.05 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </>
  )
}


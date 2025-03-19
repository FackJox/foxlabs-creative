"use client"

import { motion } from "framer-motion"

interface SplitTextProps {
  text: string
  delay?: number
}

export default function SplitText({ text, delay = 0 }: SplitTextProps) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div style={{ display: "flex", flexWrap: "wrap" }} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span key={index} style={{ marginRight: "0.5rem", display: "inline-block" }} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}


"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { KeyboardEvent } from "react"

import { useCursor } from "@/hooks/use-cursor"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  index: number
  detailed?: boolean
  onClick?: () => void
}

export default function ProjectCard({ project, index, detailed = false, onClick }: ProjectCardProps) {
  const { setCursorText } = useCursor()

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <motion.button
      className="group relative cursor-pointer overflow-hidden border border-black perspective text-left"
      onMouseEnter={() => setCursorText("VIEW")}
      onMouseLeave={() => setCursorText("")}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{
        rotateY: 5,
        rotateX: -5,
        z: 50,
        scale: 0.98,
      }}
      data-testid="project-card"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
    >
      <div className={`relative ${detailed ? "aspect-[3/2]" : "aspect-[4/3]"} w-full overflow-hidden`}>
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          style={{ transformOrigin: "top" }}
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-testid="project-image"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          style={{ transformOrigin: "bottom" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white p-4"
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold" data-testid="project-title" aria-label={project.title}>{project.title}</h2>
            <div className="flex gap-4 text-sm">
              <span data-testid="project-category">{project.category}</span>
              <span data-testid="project-year">{project.year}</span>
            </div>
            {detailed && <p className="mt-2 text-sm text-gray-600 max-w-md">{project.description}</p>}
          </div>
          <ArrowUpRight
            size={24}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </motion.button>
  )
}


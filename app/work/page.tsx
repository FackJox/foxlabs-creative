"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui"
import { Header, Footer } from "@/components/layout"
import { ContactSection } from "@/components/sections"
import { ProjectDetail } from "@/components/core"
import { cn } from "@/lib/utils"
import { projects } from "@/lib/data"

export default function WorkPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState("")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Disable body scroll when a project is selected
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedProject])

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId)
  }

  const closeProject = () => {
    setSelectedProject(null)
  }

  return (
    <main className="relative bg-white text-black selection:bg-black selection:text-white" ref={scrollRef}>
      {/* Custom cursor */}
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
      >
        {cursorText}
      </div>

      <Header setCursorText={setCursorText} />

      {/* Hero section */}
      <section className="flex min-h-[70vh] flex-col items-start justify-end p-4 pt-24">
        <div className="mb-8 w-full border-b border-black pb-4">
          <div className="mb-4 flex justify-between">
            <span className="text-sm uppercase">OUR WORK</span>
            <span className="text-sm uppercase">2020—2024</span>
          </div>
        </div>
        <motion.h1
          className="mb-8 text-6xl font-bold uppercase tracking-tighter md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          SELECTED
          <br />
          PROJECTS
        </motion.h1>
        <div className="mb-8 flex w-full flex-col justify-between gap-4 md:flex-row">
          <motion.p
            className="max-w-md text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A showcase of our most impactful work. Each project represents our commitment to creating bold, functional,
            and memorable digital experiences.
          </motion.p>
        </div>
        <motion.div
          className="mt-8 h-[1px] w-full bg-black"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{ transformOrigin: "left" }}
        />
      </section>

      {/* Projects section */}
      <section className="p-4">
        <div className="mb-8 flex items-center justify-between border-b border-black pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">ALL PROJECTS</h2>
          <span className="text-sm uppercase">SORTED BY DATE</span>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative cursor-pointer overflow-hidden border border-black"
              onClick={() => handleProjectClick(project.id)}
              onMouseEnter={() => setCursorText("EXPAND")}
              onMouseLeave={() => setCursorText("")}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 0.98 }}
              layoutId={`project-container-${project.id}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <motion.h3 className="text-xl font-bold" layoutId={`project-title-${project.id}`}>
                      {project.title}
                    </motion.h3>
                    <div className="flex gap-4 text-sm">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 max-w-md line-clamp-2">{project.description}</p>
                  </div>
                  <ArrowUpRight
                    size={24}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/">
            <Button
              className="group border border-black bg-white px-8 py-6 text-black hover:bg-black hover:text-white"
              onMouseEnter={() => setCursorText("HOME")}
              onMouseLeave={() => setCursorText("")}
            >
              <span className="mr-2 text-lg font-bold uppercase">BACK TO HOME</span>
              <ArrowUpRight
                size={20}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectDetail
            project={projects.find((p) => p.id === selectedProject)!}
            onClose={closeProject}
            setCursorText={setCursorText}
          />
        )}
      </AnimatePresence>

      <ContactSection setCursorText={setCursorText} />
      <Footer />
    </main>
  )
}


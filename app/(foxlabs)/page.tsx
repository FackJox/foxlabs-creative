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
import { projects, services } from "@/lib/data"
import CustomCursor from "@/components/effects/custom-cursor"
import { useCursor } from "@/hooks/use-cursor"

export default function Home() {
  const { setCursorText } = useCursor()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

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
    <main className="relative bg-white text-black selection:bg-black selection:text-white">
      <CustomCursor />

      <Header setCursorText={setCursorText} />

      {/* Hero section */}
      <section className="flex min-h-screen flex-col items-start justify-end p-4 pt-24">
        <div className="mb-8 w-full border-b border-black pb-4">
          <div className="mb-4 flex justify-between">
            <span className="text-sm uppercase">JACK FOXCROFT - CREATIVE TECHNOLOGIST</span>
            <span className="text-sm uppercase">EST. 2020</span>
          </div>
        </div>
        <motion.h1
          className="mb-8 text-6xl font-bold uppercase tracking-tighter md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          BREAKING
          <br />
          CREATIVE
          <br />
          BOUNDARIES
        </motion.h1>
        <div className="mb-8 flex w-full flex-col justify-between gap-4 md:flex-row">
          <motion.p
            className="max-w-md text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We are a design studio that creates unapologetically bold digital experiences for brands that want to stand
            out in the digital landscape.
          </motion.p>
          <Link href="/work">
            <Button
              className="group w-full border border-black bg-white px-8 py-6 text-black hover:bg-black hover:text-white md:w-auto"
              onMouseEnter={() => setCursorText("EXPLORE")}
              onMouseLeave={() => setCursorText("")}
            >
              <span className="mr-2 text-lg font-bold uppercase">OUR WORK</span>
              <ArrowUpRight
                size={20}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Button>
          </Link>
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
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">SELECTED WORK</h2>
          <span className="text-sm uppercase">2022—2024</span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative cursor-pointer overflow-hidden border border-black"
              onClick={() => handleProjectClick(project.id)}
              onMouseEnter={() => setCursorText("EXPAND")}
              onMouseLeave={() => setCursorText("")}
              whileHover={{ scale: 0.98 }}
              // transition={{ duration: 0.3 }}
              layoutId={`project-container-${project.id}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
          <Link href="/work">
            <Button
              className="group border border-black bg-white px-8 py-6 text-black hover:bg-black hover:text-white"
              onMouseEnter={() => setCursorText("VIEW ALL")}
              onMouseLeave={() => setCursorText("")}
            >
              <span className="mr-2 text-lg font-bold uppercase">VIEW ALL PROJECTS</span>
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

      {/* Services section */}
      <section className="mt-24 p-4">
        <div className="mb-8 flex items-center justify-between border-b border-black pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">SERVICES</h2>
          <Link
            href="/services"
            className="text-sm uppercase flex items-center gap-2 hover:underline"
            onMouseEnter={() => setCursorText("VIEW ALL")}
            onMouseLeave={() => setCursorText("")}
          >
            VIEW ALL <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          {services.slice(0, 4).map((service, index) => (
            <Link
              key={index}
              href={`/services?service=${index}`}
              className="group flex cursor-pointer items-center justify-between border-b border-black py-8"
              onMouseEnter={() => setCursorText("LEARN MORE")}
              onMouseLeave={() => setCursorText("")}
            >
              <motion.span
                className="text-3xl font-bold uppercase tracking-tighter md:text-5xl"
                whileHover={{ x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {service.title}
              </motion.span>
              <motion.div whileHover={{ x: 10, y: -10 }} transition={{ duration: 0.3 }}>
                <ArrowUpRight size={24} />
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* About section */}
      <section className="mt-24 p-4">
        <div className="mb-8 flex items-center justify-between border-b border-black pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">ABOUT US</h2>
          <Link
            href="/about"
            className="text-sm uppercase flex items-center gap-2 hover:underline"
            onMouseEnter={() => setCursorText("LEARN MORE")}
            onMouseLeave={() => setCursorText("")}
          >
            LEARN MORE <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <p className="mb-8 text-xl font-medium md:text-2xl">
              FoxLabs//Creative is a digital design agency founded in 2020. We believe in creating honest, functional, and
              impactful digital experiences that cut through the noise.
            </p>
            <p className="mb-8 text-xl font-medium md:text-2xl">
              Our approach is rooted in brutalist principles: stripping away unnecessary elements to reveal the raw
              essence of design. We embrace constraints and turn them into opportunities.
            </p>
            <Link href="/about">
              <Button
                className="group border border-black bg-white px-8 py-6 text-black hover:bg-black hover:text-white"
                onMouseEnter={() => setCursorText("ABOUT US")}
                onMouseLeave={() => setCursorText("")}
              >
                <span className="mr-2 text-lg font-bold uppercase">ABOUT US</span>
                <ArrowUpRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Button>
            </Link>
          </div>
          <div className="relative aspect-square w-full overflow-hidden border border-black">
            <Image src="/placeholder.svg?height=800&width=800" alt="Team photo" fill className="object-cover" />
          </div>
        </div>
      </section>

      <ContactSection setCursorText={setCursorText} />
      <Footer />
    </main>
  )
}


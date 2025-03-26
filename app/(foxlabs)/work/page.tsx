"use client"

import { useEffect, useState } from "react"
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
import CustomCursor from "@/components/effects/custom-cursor"
import { useCursor } from "@/hooks/use-cursor"

export default function WorkPage() {
  const { setCursorText } = useCursor()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [filteredProjects, setFilteredProjects] = useState(projects)

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

  const filterByCategory = (category: string) => {
    setActiveCategory(category)
    setFilteredProjects(projects.filter((project) => project.category === category))
  }

  const clearFilters = () => {
    setActiveCategory(null)
    setFilteredProjects(projects)
  }

  // Get unique categories for filter buttons
  const categories = [...new Set(projects.map(p => p.category))]

  return (
    <main className="relative bg-white text-black selection:bg-black selection:text-white">
      <CustomCursor />

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
        
        {/* Category filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`border ${
                  activeCategory === category ? 'bg-black text-white' : 'bg-white text-black'
                } border-black px-4 py-2 transition-colors hover:bg-black hover:text-white`}
                onClick={() => filterByCategory(category)}
                onMouseEnter={() => setCursorText("FILTER")}
                onMouseLeave={() => setCursorText("")}
                data-testid="category-filter"
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
            {activeCategory && (
              <button
                className="border border-black bg-white px-4 py-2 text-black transition-colors hover:bg-black hover:text-white"
                onClick={clearFilters}
                onMouseEnter={() => setCursorText("CLEAR")}
                onMouseLeave={() => setCursorText("")}
                data-testid="clear-filter"
              >
                CLEAR FILTERS
              </button>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex h-64 w-full items-center justify-center" data-testid="project-loading">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
            <span className="ml-4 text-lg font-bold">Loading projects...</span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="border border-red-500 bg-red-50 p-6 text-center" data-testid="project-error" role="alert" aria-live="polite">
            <h3 className="mb-2 text-xl font-bold text-red-700">Failed to load projects</h3>
            <p className="mb-4 text-red-600">{error}</p>
            <Button 
              className="border border-red-500 bg-white px-6 py-2 text-red-600 hover:bg-red-500 hover:text-white"
              onClick={() => window.location.reload()}
              data-testid="retry-button"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Project grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2" data-testid="project-grid" aria-label="Projects grid">
            {filteredProjects.map((project, index) => (
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
                data-testid="project-card"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    data-testid="project-image"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.h3 className="text-xl font-bold" layoutId={`project-title-${project.id}`} data-testid="project-title" aria-label={project.title}>
                        {project.title}
                      </motion.h3>
                      <div className="flex gap-4 text-sm">
                        <span data-testid="project-category">{project.category}</span>
                        <span data-testid="project-year">{project.year}</span>
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
        )}

        <div className="mt-12 flex justify-center">
          <Link href="/">
            <Button
              className="group border border-black bg-white px-8 py-6 text-black hover:bg-black hover:text-white"
              onMouseEnter={() => setCursorText("HOME")}
              onMouseLeave={() => setCursorText("")}
              data-testid="back-to-projects"
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


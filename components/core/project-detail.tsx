"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { X, ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui"
import type { Project } from "@/lib/types"

interface ProjectDetailProps {
  project: Project
  onClose: () => void
  setCursorText: (text: string) => void
}

export default function ProjectDetail({ project, onClose, setCursorText }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Focus management and scroll to top when opened
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
      // Focus the modal when it opens
      containerRef.current.focus()
    }
  }, [project.id])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === (project.gallery?.length || 0) - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? (project.gallery?.length || 0) - 1 : prev - 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  const motionProps = shouldReduceMotion ? { 
    transition: { duration: 0.1 },
    "data-reduce-motion": "true"
  } : { 
    transition: { duration: 0.5 },
    "data-reduce-motion": "false"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.id}`}
      data-testid="page-transition"
      {...motionProps}
    >
      <motion.div
        className="relative h-full max-h-[90vh] w-full max-w-6xl overflow-y-auto bg-white text-black"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        ref={containerRef}
        data-testid="project-detail"
      >
        {/* Close button */}
        <button
          className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center border border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
          onClick={onClose}
          onMouseEnter={() => setCursorText("CLOSE")}
          onMouseLeave={() => setCursorText("")}
          aria-label="Close project details"
          data-testid="back-to-projects"
        >
          <X size={24} aria-hidden="true" />
        </button>

        {/* Project gallery */}
        <div className="relative aspect-video w-full" data-testid="project-gallery" role="region" aria-label="Project gallery">
          {project.gallery && project.gallery.length > 0 ? (
            <>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
                className="relative h-full w-full"
                data-testid="gallery-transition"
                data-reduce-motion={shouldReduceMotion ? "true" : "false"}
              >
                <Image
                  src={project.gallery[currentImageIndex] || project.image}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  data-testid="gallery-image"
                />
              </motion.div>

              {project.gallery.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    onMouseEnter={() => setCursorText("PREV")}
                    onMouseLeave={() => setCursorText("")}
                    aria-label="Previous image"
                    data-testid="gallery-prev"
                  >
                    <ChevronLeft size={24} aria-hidden="true" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    onMouseEnter={() => setCursorText("NEXT")}
                    onMouseLeave={() => setCursorText("")}
                    aria-label="Next image"
                    data-testid="gallery-next"
                  >
                    <ChevronRight size={24} aria-hidden="true" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="group" aria-label="Gallery navigation">
                    {project.gallery.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 w-8 ${index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(index)
                        }}
                        aria-label={`Go to image ${index + 1}`}
                        aria-current={index === currentImageIndex ? "true" : "false"}
                      />
                    ))}
                  </div>
                  <div className="sr-only" aria-live="polite" data-testid="gallery-status">
                    Image {currentImageIndex + 1} of {project.gallery.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              data-testid="gallery-image"
            />
          )}
        </div>

        {/* Project content */}
        <div className="p-8">
          <div className="mb-8 border-b border-black pb-4">
            <div className="mb-4 flex justify-between">
              <span className="text-sm uppercase" data-testid="project-category">{project.category}</span>
              <span className="text-sm uppercase" data-testid="project-year">{project.year}</span>
            </div>
          </div>

          <motion.h1
            className="mb-6 text-4xl font-bold uppercase tracking-tighter md:text-6xl"
            data-testid="project-title"
            id={`project-title-${project.id}`}
          >
            {project.title}
          </motion.h1>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-bold uppercase">OVERVIEW</h2>
              <p className="mb-8 text-lg" data-testid="project-description">{project.description}</p>

              {project.client && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase">CLIENT</h3>
                  <p>{project.client}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase">SERVICES</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.services?.map((service, index) => (
                    <span key={index} className="border border-black px-3 py-1 text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {project.url && (
                <Button
                  className="group mt-8 flex items-center border border-black bg-white px-6 py-4 text-black transition-colors hover:bg-black hover:text-white"
                  onMouseEnter={() => setCursorText("VISIT")}
                  onMouseLeave={() => setCursorText("")}
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.url, "_blank")
                  }}
                  aria-label={`Visit ${project.title} website`}
                  role="link"
                >
                  <span className="mr-2 text-base font-bold uppercase">VIEW LIVE PROJECT</span>
                  <ExternalLink
                    size={18}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </Button>
              )}
            </div>

            <div>
              {project.challenge && (
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase">THE CHALLENGE</h2>
                  <p data-testid="project-challenge">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase">OUR SOLUTION</h2>
                  <p data-testid="project-solution">{project.solution}</p>
                </div>
              )}

              {project.results && (
                <div className="mb-8">
                  <h2 className="mb-4 text-xl font-bold uppercase">RESULTS</h2>
                  <p data-testid="project-results">{project.results}</p>
                </div>
              )}

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 border border-black bg-white px-6 py-3 text-black transition-colors hover:bg-black hover:text-white"
                  onMouseEnter={() => setCursorText("VISIT")}
                  onMouseLeave={() => setCursorText("")}
                  data-testid="project-url"
                  aria-label={`Visit ${project.title} website (opens in a new tab)`}
                >
                  <span className="font-bold">VIEW LIVE PROJECT</span>
                  <ExternalLink size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {project.testimonial && (
            <div className="mt-16 border-t border-black pt-8" data-testid="project-testimonial">
              <blockquote className="relative pl-8">
                <div className="absolute left-0 top-0 text-5xl font-bold" aria-hidden="true">"</div>
                <p className="mb-4 text-xl italic" data-testid="testimonial-quote">{project.testimonial.quote}</p>
                <footer className="text-right">
                  <p className="font-bold" data-testid="testimonial-author">{project.testimonial.author}</p>
                  <p className="text-sm" data-testid="testimonial-role">
                    {project.testimonial.role}, <span data-testid="testimonial-company">{project.testimonial.company}</span>
                  </p>
                </footer>
              </blockquote>
            </div>
          )}
          
          <div className="mt-16 flex flex-wrap gap-4">
            <Button
              className="group border border-black bg-white px-6 py-4 text-black transition-colors hover:bg-black hover:text-white"
              onMouseEnter={() => setCursorText("CONTACT")}
              onMouseLeave={() => setCursorText("")}
              onClick={(e) => {
                e.stopPropagation()
                onClose()
                // Scroll to contact section
                document.querySelector("#contact-section")?.scrollIntoView({ behavior: "smooth" })
              }}
              role="button"
              aria-label="Start a similar project"
            >
              <span className="mr-2 text-base font-bold uppercase">START A SIMILAR PROJECT</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Button>

            <Button
              className="group border border-black bg-black px-6 py-4 text-white transition-colors hover:bg-white hover:text-black"
              onMouseEnter={() => setCursorText("CLOSE")}
              onMouseLeave={() => setCursorText("")}
              onClick={onClose}
              role="button"
              aria-label="Back to projects"
            >
              <span className="mr-2 text-base font-bold uppercase">BACK TO PROJECTS</span>
              <X size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}


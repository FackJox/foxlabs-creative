"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
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

  // Scroll to top when opened
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [project.id])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === (project.gallery?.length || 0) - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? (project.gallery?.length || 0) - 1 : prev - 1))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-container-${project.id}`}
        className="relative h-full max-h-[90vh] w-full max-w-6xl overflow-y-auto bg-white text-black"
        onClick={(e) => e.stopPropagation()}
        ref={containerRef}
      >
        {/* Close button */}
        <button
          className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center border border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
          onClick={onClose}
          onMouseEnter={() => setCursorText("CLOSE")}
          onMouseLeave={() => setCursorText("")}
        >
          <X size={24} />
        </button>

        {/* Project gallery */}
        <div className="relative aspect-video w-full">
          {project.gallery && project.gallery.length > 0 ? (
            <>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full"
              >
                <Image
                  src={project.gallery[currentImageIndex] || project.image}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
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
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    onMouseEnter={() => setCursorText("NEXT")}
                    onMouseLeave={() => setCursorText("")}
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {project.gallery.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 w-8 ${index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(index)
                        }}
                      />
                    ))}
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
            />
          )}
        </div>

        {/* Project content */}
        <div className="p-8">
          <div className="mb-8 border-b border-black pb-4">
            <div className="mb-4 flex justify-between">
              <span className="text-sm uppercase">{project.category}</span>
              <span className="text-sm uppercase">{project.year}</span>
            </div>
          </div>

          <motion.h2
            layoutId={`project-title-${project.id}`}
            className="mb-6 text-4xl font-bold uppercase tracking-tighter md:text-6xl"
          >
            {project.title}
          </motion.h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold uppercase">OVERVIEW</h3>
              <p className="mb-8 text-lg">{project.description}</p>

              {project.client && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold uppercase">CLIENT</h4>
                  <p>{project.client}</p>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-sm font-bold uppercase">SERVICES</h4>
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
                >
                  <span className="mr-2 text-base font-bold uppercase">VIEW LIVE PROJECT</span>
                  <ExternalLink
                    size={18}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Button>
              )}
            </div>

            <div>
              {project.challenge && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold uppercase">THE CHALLENGE</h3>
                  <p>{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold uppercase">OUR SOLUTION</h3>
                  <p>{project.solution}</p>
                </div>
              )}

              {project.results && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold uppercase">RESULTS</h3>
                  <p>{project.results}</p>
                </div>
              )}
            </div>
          </div>

          {project.testimonial && (
            <div className="mt-16 border-t border-black pt-8">
              <blockquote className="relative pl-8">
                <div className="absolute left-0 top-0 text-5xl font-bold">"</div>
                <p className="mb-4 text-xl italic">{project.testimonial.quote}</p>
                <footer className="text-right">
                  <p className="font-bold">{project.testimonial.author}</p>
                  <p className="text-sm">
                    {project.testimonial.role}, {project.testimonial.company}
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
            >
              <span className="mr-2 text-base font-bold uppercase">START A SIMILAR PROJECT</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Button>

            <Button
              className="group border border-black bg-black px-6 py-4 text-white transition-colors hover:bg-white hover:text-black"
              onMouseEnter={() => setCursorText("CLOSE")}
              onMouseLeave={() => setCursorText("")}
              onClick={onClose}
            >
              <span className="mr-2 text-base font-bold uppercase">BACK TO PROJECTS</span>
              <X size={18} />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}


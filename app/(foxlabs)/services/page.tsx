"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Plus, Minus, ArrowRight, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui"
import { Header, Footer } from "@/components/layout"
import { ContactSection } from "@/components/sections"
import { cn } from "@/lib/utils"
import { services } from "@/lib/data"
import CustomCursor from "@/components/effects/custom-cursor"
import { useCursor } from "@/hooks/use-cursor"

export default function ServicesPage() {
  const { setCursorText } = useCursor()
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      const serviceIndex = parseInt(serviceParam)
      if (!isNaN(serviceIndex) && serviceIndex >= 0 && serviceIndex < services.length) {
        setExpandedService(serviceIndex)
        setTimeout(() => {
          if (serviceRefs.current[serviceIndex]) {
            serviceRefs.current[serviceIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 500)
      }
    }
  }, [searchParams])

  // Accordion toggle function
  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index)
  }

  return (
    <main className="relative bg-white text-black selection:bg-black selection:text-white">
      <CustomCursor />

      <Header setCursorText={setCursorText} />

      {/* Hero section */}
      <section className="flex min-h-[70vh] flex-col items-start justify-end p-4 pt-24">
        <div className="mb-8 w-full border-b border-black pb-4">
          <div className="mb-4 flex justify-between">
            <span className="text-sm uppercase">SERVICES</span>
            <span className="text-sm uppercase">EXPERTISE</span>
          </div>
        </div>
        <motion.h1
          className="mb-8 text-6xl font-bold uppercase tracking-tighter md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          WHAT
          <br />
          WE DO
        </motion.h1>
        <div className="mb-8 flex w-full flex-col justify-between gap-4 md:flex-row">
          <motion.p
            className="max-w-md text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We offer a comprehensive range of design and development services, all delivered with our signature
            brutalist approach and attention to detail.
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

      {/* Services section */}
      <section className="p-4 bg-black text-white">
        <div className="mb-8 flex items-center justify-between border-b border-white pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">OUR SERVICES</h2>
          <span className="text-sm uppercase">CLICK TO EXPAND</span>
        </div>

        <div className="grid grid-cols-1 gap-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              ref={(el) => (serviceRefs.current[index] = el)}
              className={cn(
                "group cursor-pointer border-b border-white transition-colors",
                expandedService === index ? "bg-white text-black" : "",
              )}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              id={`service-${index}`}
            >
              {/* Service header - always visible */}
              <div
                className="flex items-center justify-between py-8 px-4"
                onClick={() => toggleService(index)}
                onMouseEnter={() => setCursorText(expandedService === index ? "COLLAPSE" : "EXPAND")}
                onMouseLeave={() => setCursorText("")}
              >
                <motion.span
                  className={cn(
                    "text-3xl font-bold uppercase tracking-tighter md:text-5xl",
                    expandedService === index ? "text-black" : "text-white",
                  )}
                  animate={{
                    x: expandedService === index ? 20 : 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  {service.title}
                </motion.span>
                <div className="flex items-center">
                  {expandedService === index ? (
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                      <Minus size={24} />
                    </motion.div>
                  ) : (
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                      <Plus size={24} />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Expanded service content */}
              <AnimatePresence>
                {expandedService === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.5, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.3 },
                      },
                    }}
                    className="overflow-hidden bg-white text-black"
                  >
                    <div className="p-8 border-t border-black">
                      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        <div>
                          <h3 className="mb-6 text-xl font-bold uppercase">ABOUT THIS SERVICE</h3>
                          <p className="mb-8">{service.description}</p>

                          <h3 className="mb-4 text-xl font-bold uppercase">KEY BENEFITS</h3>
                          <ul className="space-y-4 mb-8">
                            {service.benefits?.map((benefit, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                              >
                                <ArrowRight className="mt-1 min-w-[20px]" size={20} />
                                <span>{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>

                          <Button
                            className="group mt-4 border border-black bg-white px-6 py-4 text-black hover:bg-black hover:text-white"
                            onMouseEnter={() => setCursorText("CONTACT")}
                            onMouseLeave={() => setCursorText("")}
                            onClick={(e) => {
                              e.stopPropagation()
                              // Scroll to contact section
                              document.querySelector("#contact-section")?.scrollIntoView({ behavior: "smooth" })
                            }}
                          >
                            <span className="mr-2 text-base font-bold uppercase">DISCUSS YOUR PROJECT</span>
                            <ArrowUpRight
                              size={18}
                              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                          </Button>
                        </div>

                        <div>
                          {service.process && (
                            <div className="mb-8">
                              <h3 className="mb-6 text-xl font-bold uppercase">OUR PROCESS</h3>
                              <div className="space-y-6">
                                {service.process.map((step, i) => (
                                  <motion.div
                                    key={i}
                                    className="flex gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                                  >
                                    <div className="flex h-8 w-8 items-center justify-center border border-black bg-black text-white">
                                      {i + 1}
                                    </div>
                                    <div>
                                      <h4 className="font-bold">{step.title}</h4>
                                      <p className="text-sm">{step.description}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {service.caseStudy && (
                            <div className="border border-black">
                              <div className="border-b border-black bg-black p-4 text-white">
                                <h3 className="text-xl font-bold uppercase">CASE STUDY</h3>
                              </div>
                              <div className="p-4">
                                <div className="relative aspect-video w-full mb-4 overflow-hidden border border-black">
                                  <Image
                                    src={service.caseStudy.image || "/placeholder.svg?height=400&width=600"}
                                    alt={service.caseStudy.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <h4 className="text-lg font-bold mb-2">{service.caseStudy.title}</h4>
                                <p className="text-sm mb-4">{service.caseStudy.description}</p>
                                {service.caseStudy.link && (
                                  <a
                                    href="#"
                                    className="flex items-center gap-2 text-sm font-bold hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseEnter={() => setCursorText("VIEW")}
                                    onMouseLeave={() => setCursorText("")}
                                  >
                                    VIEW FULL CASE STUDY <ExternalLink size={14} />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process section */}
      <section className="p-4 my-24">
        <div className="mb-12 flex items-center justify-between border-b border-black pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">OUR PROCESS</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <motion.p
              className="mb-8 text-xl font-medium md:text-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our approach is methodical yet flexible, allowing us to adapt to each project's unique needs while
              maintaining our commitment to bold, functional design.
            </motion.p>

            <div className="space-y-12 mt-12">
              {[
                {
                  number: "01",
                  title: "DISCOVERY",
                  description:
                    "We begin by understanding your brand, audience, and objectives through in-depth research and consultation.",
                },
                {
                  number: "02",
                  title: "STRATEGY",
                  description:
                    "We develop a comprehensive plan that aligns with your goals and sets the foundation for the creative process.",
                },
                {
                  number: "03",
                  title: "DESIGN",
                  description:
                    "Our designers create bold, functional concepts that challenge conventions while serving your needs.",
                },
                {
                  number: "04",
                  title: "DEVELOPMENT",
                  description: "We bring designs to life with clean, efficient code and cutting-edge technology.",
                },
                {
                  number: "05",
                  title: "LAUNCH",
                  description:
                    "We meticulously test and refine before launching your project to ensure flawless execution.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-5xl font-bold opacity-30">{step.number}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="relative aspect-[3/4] w-full overflow-hidden border border-black sticky top-24 h-fit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 0.98 }}
          >
            <Image src="/placeholder.svg?height=1200&width=900" alt="Our process" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      <ContactSection setCursorText={setCursorText} />
      <Footer />
    </main>
  )
}


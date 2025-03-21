"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui"

interface ContactSectionProps {
  setCursorText: (text: string) => void
}

export default function ContactSection({ setCursorText }: ContactSectionProps) {
  return (
    <section id="contact-section" className="mt-24 p-4 bg-black text-white">
      <div className="mb-8 flex items-center justify-between border-b border-white pb-4">
        <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">GET IN TOUCH</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <motion.p
            className="mb-8 text-xl font-medium md:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Have a project in mind? Let's create something bold together. Reach out to us and let's start a
            conversation.
          </motion.p>
          <div className="mb-8">
            <p className="mb-2 text-xl font-bold">hello@foxlabscreative.design</p>
            <p className="text-xl font-bold">+1 (555) 123-4567</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {["INSTAGRAM", "TWITTER", "LINKEDIN", "BEHANCE"].map((social, i) => (
              <a
                key={i}
                href="#"
                className="border border-white px-4 py-2 text-sm transition-colors hover:bg-white hover:text-black"
                onMouseEnter={() => setCursorText("VISIT")}
                onMouseLeave={() => setCursorText("")}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm uppercase">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-white bg-transparent p-4 focus:outline-none"
              onMouseEnter={() => setCursorText("TYPE")}
              onMouseLeave={() => setCursorText("")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm uppercase">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-white bg-transparent p-4 focus:outline-none"
              onMouseEnter={() => setCursorText("TYPE")}
              onMouseLeave={() => setCursorText("")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm uppercase">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="border border-white bg-transparent p-4 focus:outline-none"
              onMouseEnter={() => setCursorText("TYPE")}
              onMouseLeave={() => setCursorText("")}
            />
          </div>
          <Button
            className="group mt-4 border border-white bg-transparent px-8 py-6 text-white hover:bg-white hover:text-black"
            onMouseEnter={() => setCursorText("SEND")}
            onMouseLeave={() => setCursorText("")}
          >
            <span className="mr-2 text-lg font-bold uppercase">SEND MESSAGE</span>
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Button>
        </form>
      </div>
    </section>
  )
}


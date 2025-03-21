"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header, Footer } from "@/components/layout"
import { ContactSection } from "@/components/sections"
import { cn } from "@/lib/utils"
import { teamMembers } from "@/lib/data"
import CustomCursor from "@/components/effects/custom-cursor"
import { useCursor } from "@/hooks/use-cursor"

export default function AboutPage() {
  const { setCursorText } = useCursor()

  return (
    <main className="relative bg-white text-black selection:bg-black selection:text-white">
      <CustomCursor />

      <Header setCursorText={setCursorText} />

      {/* Hero section */}
      <section className="flex min-h-[70vh] flex-col items-start justify-end p-4 pt-24">
        <div className="mb-8 w-full border-b border-black pb-4">
          <div className="mb-4 flex justify-between">
            <span className="text-sm uppercase">ABOUT US</span>
            <span className="text-sm uppercase">EST. 2020</span>
          </div>
        </div>
        <h1 className="mb-8 text-6xl font-bold uppercase tracking-tighter md:text-8xl lg:text-9xl">
          WHO
          <br />
          WE ARE
        </h1>
        <div className="mb-8 flex w-full flex-col justify-between gap-4 md:flex-row">
          <p className="max-w-md text-lg md:text-xl">
            We are a collective of designers, developers, and strategists who believe in the power of bold, honest
            design to transform brands and create meaningful connections.
          </p>
        </div>
        <div className="mt-8 h-[1px] w-full bg-black" />
      </section>

      {/* Mission section */}
      <section className="p-4 mb-24">
        <div className="mb-8 flex items-center justify-between border-b border-black pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">OUR MISSION</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <motion.p
              className="mb-8 text-xl font-medium md:text-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              RAW/STUDIO was founded with a clear mission: to cut through the digital noise with honest, functional
              design that makes an impact.
            </motion.p>
            <motion.p
              className="mb-8 text-xl font-medium md:text-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We believe in stripping away unnecessary elements to reveal the raw essence of design. We embrace
              constraints and turn them into opportunities.
            </motion.p>
            <motion.p
              className="mb-8 text-xl font-medium md:text-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Our work is not just about aesthetics—it's about creating meaningful connections between brands and their
              audiences through thoughtful, strategic design.
            </motion.p>
          </div>
          <motion.div
            className="relative aspect-video w-full overflow-hidden border border-black"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 0.98 }}
          >
            <Image src="/placeholder.svg?height=600&width=800" alt="Our mission" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Team section */}
      <section className="p-4 mb-24 bg-black text-white">
        <div className="mb-8 flex items-center justify-between border-b border-white pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">OUR TEAM</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setCursorText(member.name)}
              onMouseLeave={() => setCursorText("")}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-white mb-4">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values section */}
      <section className="p-4 mb-24">
        <div className="mb-8 flex items-center justify-between border-b border-black pb-4">
          <h2 className="text-4xl font-bold uppercase tracking-tighter md:text-5xl">OUR VALUES</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "HONESTY",
              description: "We believe in transparent communication and authentic design that speaks truth.",
            },
            {
              title: "BOLDNESS",
              description:
                "We're not afraid to challenge conventions and push boundaries to create memorable experiences.",
            },
            {
              title: "FUNCTIONALITY",
              description: "Design should serve a purpose. We create solutions that work as good as they look.",
            },
            {
              title: "COLLABORATION",
              description: "We work closely with our clients, treating them as partners in the creative process.",
            },
            {
              title: "INNOVATION",
              description: "We constantly explore new technologies and approaches to stay ahead of the curve.",
            },
            {
              title: "IMPACT",
              description:
                "We measure our success by the meaningful difference our work makes for our clients and their users.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="border border-black p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "10px 10px 0 rgba(0,0,0,1)",
              }}
            >
              <h3 className="mb-4 text-2xl font-bold">{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactSection setCursorText={setCursorText} />
      <Footer />
    </main>
  )
}


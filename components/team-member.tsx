"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { useCursor } from "@/hooks/use-cursor"
import type { TeamMember as TeamMemberType } from "@/lib/types"

interface TeamMemberProps {
  member: TeamMemberType
  index: number
}

export default function TeamMember({ member, index }: TeamMemberProps) {
  const { setCursorText } = useCursor()

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.2 }}
      onMouseEnter={() => setCursorText(member.name)}
      onMouseLeave={() => setCursorText("")}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-white mb-4">
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
          style={{ transformOrigin: "top" }}
        >
          <Image
            src={member.image || "/placeholder.svg?height=600&width=450"}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
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
      </div>
      <h3 className="text-xl font-bold text-white">{member.name}</h3>
      <p className="text-sm text-gray-300">{member.role}</p>
    </motion.div>
  )
}


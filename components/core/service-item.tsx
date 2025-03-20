"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { useCursor } from "@/hooks/use-cursor"
import type { Service } from "@/lib/types"

interface ServiceItemProps {
  service: Service
  index?: number
  darkMode?: boolean
  detailed?: boolean
}

/**
 * Component to display a service item with optional detailed information
 * @param service Service object containing title, description, and optional fields
 * @param index Index for animation sequencing
 * @param darkMode Whether to display in dark mode
 * @param detailed Whether to show the detailed description
 */
export default function ServiceItem({ service, index = 0, darkMode = false, detailed = false }: ServiceItemProps) {
  const { setCursorText } = useCursor()

  return (
    <motion.div
      data-testid="service-item"
      className={`group flex cursor-pointer items-center justify-between py-8 ${darkMode ? 'dark-mode' : ''}`}
      style={{
        borderBottomColor: darkMode ? "#fff" : "#000",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.2 }}
      onMouseEnter={() => setCursorText("VIEW")}
      onMouseLeave={() => setCursorText("")}
    >
      <div className="flex-1">
        <motion.span
          data-testid="service-title"
          className="text-3xl font-bold uppercase tracking-tighter transition-transform group-hover:-translate-x-2 md:text-5xl block"
          whileHover={{ scale: 1.05 }}
          style={{ color: darkMode ? "#fff" : "#000" }}
        >
          {service.title}
        </motion.span>

        {detailed && (
          <motion.p
            data-testid="service-description"
            className="mt-4 max-w-xl text-sm md:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{ color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}
          >
            {service.description}
          </motion.p>
        )}
      </div>
      <motion.div whileHover={{ rotate: 45, scale: 1.2 }} transition={{ type: "spring", stiffness: 200 }}>
        <ArrowUpRight
          size={24}
          className="transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"
          style={{ color: darkMode ? "#fff" : "#000" }}
        />
      </motion.div>
    </motion.div>
  )
}


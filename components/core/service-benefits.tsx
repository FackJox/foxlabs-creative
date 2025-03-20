"use client"

import { motion } from "framer-motion"
import type { Service } from "@/lib/types"

interface ServiceBenefitsProps {
  benefits: string[] | null | undefined
}

/**
 * Component to display the benefits of a service
 * @param benefits List of benefits to display or null/undefined
 */
export default function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  if (!benefits || benefits.length === 0) {
    return (
      <motion.p
        data-testid="no-benefits"
        className="text-base text-neutral-600 dark:text-neutral-400 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        No benefits available
      </motion.p>
    )
  }

  return (
    <motion.ul
      data-testid="benefits-list"
      className="mt-6 space-y-2 text-sm md:text-base"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {benefits.map((benefit, index) => (
        <motion.li
          key={index}
          data-testid={`benefit-${index}`}
          className="flex items-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
        >
          <span className="mr-2 text-lg">•</span>
          <span>{benefit}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
} 
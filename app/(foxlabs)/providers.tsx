"use client"

import type React from "react"

import { CursorProvider } from "@/hooks/use-cursor"

export function Providers({ children }: { children: React.ReactNode }) {
  return <CursorProvider>{children}</CursorProvider>
}


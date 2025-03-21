import type React from "react"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import { Providers } from "./providers"

import "./globals.css"

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "RAW/STUDIO | Brutalist Design Agency",
  description: "A brutalist design agency creating bold digital experiences",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="font-mono antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}



import './globals.css'
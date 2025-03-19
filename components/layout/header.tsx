"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"

interface HeaderProps {
  setCursorText: (text: string) => void
}

export default function Header({ setCursorText }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Navigation */}
      <nav className="fixed left-0 top-0 z-40 flex w-full justify-between border-b border-black bg-white p-4">
        <Link
          href="/"
          className="text-xl font-bold uppercase tracking-tighter"
          onMouseEnter={() => setCursorText("HOME")}
          onMouseLeave={() => setCursorText("")}
        >
          RAW/STUDIO
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-sm uppercase"
          onMouseEnter={() => setCursorText("MENU")}
          onMouseLeave={() => setCursorText("")}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          {isMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Full screen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed left-0 top-0 z-30 flex h-screen w-full flex-col justify-between bg-white p-8 pt-24"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border-b border-black pb-4">
                <h3 className="mb-4 text-sm uppercase">Navigation</h3>
                {[
                  { name: "HOME", path: "/" },
                  { name: "WORK", path: "/work" },
                  { name: "ABOUT", path: "/about" },
                  { name: "SERVICES", path: "/services" },
                ].map((item, i) => (
                  <Link
                    href={item.path}
                    key={i}
                    className="group flex cursor-pointer items-center justify-between border-t border-black py-6"
                    onMouseEnter={() => setCursorText("GO")}
                    onMouseLeave={() => setCursorText("")}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-4xl font-bold uppercase tracking-tighter transition-transform group-hover:-translate-x-2 md:text-6xl">
                      {item.name}
                    </span>
                    <ArrowUpRight
                      size={24}
                      className="transition-transform group-hover:translate-x-2 group-hover:translate-y-0"
                    />
                  </Link>
                ))}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="mb-4 text-sm uppercase">Contact</h3>
                  <p className="mb-2 text-xl font-bold">hello@rawstudio.design</p>
                  <p className="mb-8 text-xl font-bold">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="mb-4 text-sm uppercase">Social</h3>
                  <div className="flex flex-wrap gap-4">
                    {["INSTAGRAM", "TWITTER", "LINKEDIN", "BEHANCE"].map((social, i) => (
                      <a
                        key={i}
                        href="#"
                        className="border border-black px-4 py-2 text-sm transition-colors hover:bg-black hover:text-white"
                        onMouseEnter={() => setCursorText("VISIT")}
                        onMouseLeave={() => setCursorText("")}
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-sm">© {new Date().getFullYear()} RAW/STUDIO. ALL RIGHTS RESERVED.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


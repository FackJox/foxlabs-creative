"use client"

import Link from 'next/link'
import { useCursor } from '@/hooks/use-cursor'
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  const { setCursorText } = useCursor()

  return (
    <footer className="mt-24 border-t border-black p-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold uppercase tracking-tighter">RAW/STUDIO</div>
          <div className="flex gap-4">
            <Link 
              href="https://instagram.com/rawstudio" 
              aria-label="Instagram"
              onMouseEnter={() => setCursorText('VISIT')}
              onMouseLeave={() => setCursorText('')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link 
              href="https://twitter.com/rawstudio" 
              aria-label="Twitter"
              onMouseEnter={() => setCursorText('VISIT')}
              onMouseLeave={() => setCursorText('')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link 
              href="https://linkedin.com/company/rawstudio" 
              aria-label="LinkedIn"
              onMouseEnter={() => setCursorText('VISIT')}
              onMouseLeave={() => setCursorText('')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link 
              href="https://github.com/rawstudio" 
              aria-label="GitHub"
              onMouseEnter={() => setCursorText('VISIT')}
              onMouseLeave={() => setCursorText('')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm">© {new Date().getFullYear()} RAW/STUDIO. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-4 text-sm">
            <Link 
              href="/privacy-policy"
              onMouseEnter={() => setCursorText('VIEW')}
              onMouseLeave={() => setCursorText('')}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-service"
              onMouseEnter={() => setCursorText('VIEW')}
              onMouseLeave={() => setCursorText('')}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


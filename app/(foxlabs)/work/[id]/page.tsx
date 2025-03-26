"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Header, Footer } from "@/components/layout"
import { ProjectDetail } from "@/components/core"
import { Button } from "@/components/ui"
import { projects } from "@/lib/data"
import type { Project } from "@/lib/types"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cursorText, setCursorText] = useState("")

  useEffect(() => {
    const projectId = Number(params.id)
    const foundProject = projects.find(p => p.id === projectId)
    
    // Simulate loading
    setLoading(true)
    
    setTimeout(() => {
      if (foundProject) {
        setProject(foundProject)
        setLoading(false)
      } else {
        setError("Project not found")
        setLoading(false)
      }
    }, 500)
  }, [params.id])

  const handleClose = () => {
    router.push("/work")
  }

  return (
    <div className="relative">
      <Header setCursorText={setCursorText} />
      
      {/* Loading state */}
      {loading && (
        <div className="flex h-96 w-full items-center justify-center" data-testid="project-detail-loading">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
          <span className="ml-4 text-lg font-bold">Loading project details...</span>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="mx-auto my-24 max-w-2xl text-center" data-testid="project-detail-error" role="alert" aria-live="polite">
          <h2 className="mb-4 text-3xl font-bold">Failed to load project</h2>
          <p className="mb-8 text-lg">{error}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              className="border border-black bg-white px-8 py-4 text-black hover:bg-black hover:text-white"
              onClick={() => window.location.reload()}
              data-testid="retry-button"
            >
              Retry
            </Button>
            <Link href="/work">
              <Button 
                className="border border-black bg-white px-8 py-4 text-black hover:bg-black hover:text-white"
                onMouseEnter={() => setCursorText("BACK")}
                onMouseLeave={() => setCursorText("")}
                data-testid="back-to-projects"
              >
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {/* Project not found */}
      {!loading && !project && error === "Project not found" && (
        <div className="mx-auto my-24 max-w-2xl text-center" data-testid="project-not-found" role="alert" aria-live="polite">
          <h2 className="mb-4 text-3xl font-bold">Project not found</h2>
          <p className="mb-8 text-lg">The project you're looking for doesn't exist or has been removed.</p>
          <Link href="/work">
            <Button 
              className="border border-black bg-white px-8 py-4 text-black hover:bg-black hover:text-white"
              onMouseEnter={() => setCursorText("BACK")}
              onMouseLeave={() => setCursorText("")}
              data-testid="back-to-projects"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Projects
            </Button>
          </Link>
        </div>
      )}
      
      {/* Project detail */}
      {!loading && project && (
        <div className="p-4">
          <ProjectDetail 
            project={project} 
            onClose={handleClose} 
            setCursorText={setCursorText} 
          />
        </div>
      )}
      
      <Footer />
    </div>
  )
} 
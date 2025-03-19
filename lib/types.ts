export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

export interface Project {
  id: number
  title: string
  category: string
  year: string
  image: string
  description: string
  gallery?: string[]
  client?: string
  services?: string[]
  challenge?: string
  solution?: string
  results?: string
  testimonial?: Testimonial
  url?: string
  formattedDate?: string
  summary?: string
  preview?: string
  serviceDetails?: Service[]
}

export interface ServiceProcess {
  title: string
  description: string
}

export interface ServiceCaseStudy {
  title: string
  description: string
  image: string
  link?: string
}

export interface Service {
  title: string
  description: string
  benefits?: string[]
  process?: ServiceProcess[]
  caseStudy?: ServiceCaseStudy
}

export interface TeamMember {
  name: string
  role: string
  image: string
}


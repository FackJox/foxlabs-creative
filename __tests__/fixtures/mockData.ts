import type { Project, Service, TeamMember, Testimonial } from '@/lib/types';

export const mockTestimonial: Testimonial = {
  quote: "Test quote",
  author: "Test Author",
  role: "Test Role",
  company: "Test Company"
};

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "RAW Studio Website",
    slug: "raw-studio-website",
    description: "A brutalist website for a cutting-edge design studio",
    category: "WEB DEVELOPMENT",
    year: "2023",
    client: "RAW Studio",
    challenge: "Create a visually striking website that showcases the studio's work while maintaining optimal performance and accessibility.",
    solution: "Implemented a Next.js-based website with brutalist design principles, focusing on typography and bold layouts.",
    results: "50% increase in time spent on site, 30% increase in client inquiries through the website.",
    gallery: [
      "/images/projects/raw-studio/1.jpg",
      "/images/projects/raw-studio/2.jpg",
      "/images/projects/raw-studio/3.jpg"
    ],
    featured: true,
    url: "https://rawstudio.com",
    testimonial: mockTestimonial
  },
  {
    id: 2,
    title: "Eco Ecommerce Platform",
    slug: "eco-ecommerce-platform",
    description: "Sustainable shopping platform for eco-friendly products",
    category: "E-COMMERCE",
    year: "2023",
    client: "GreenLife",
    challenge: "Build an e-commerce platform that highlights sustainable products while providing a seamless shopping experience.",
    solution: "Created a custom Shopify implementation with advanced filtering for sustainability metrics.",
    results: "200% increase in conversions, featured in Sustainable Business Monthly.",
    gallery: [
      "/images/projects/eco-commerce/1.jpg",
      "/images/projects/eco-commerce/2.jpg"
    ],
    featured: true,
    url: "https://greenlife-eco.com",
    testimonial: mockTestimonial
  },
  {
    id: 3,
    title: "Health App UI Design",
    slug: "health-app-ui-design",
    description: "Modern interface design for a health tracking application",
    category: "UI/UX DESIGN",
    year: "2022",
    client: "HealthTrack",
    challenge: "Design an intuitive interface for complex health data visualization.",
    solution: "Created a user-centered design system with accessibility at its core.",
    results: "95% user satisfaction rate, featured in Design Weekly.",
    gallery: [
      "/images/projects/health-app/1.jpg",
      "/images/projects/health-app/2.jpg",
      "/images/projects/health-app/3.jpg",
      "/images/projects/health-app/4.jpg"
    ],
    featured: false,
    url: "https://healthtrack.app",
    testimonial: null
  },
  {
    id: 4,
    title: "Minimal Photography Portfolio",
    slug: "minimal-photography-portfolio",
    description: "Clean and minimal portfolio for a professional photographer",
    category: "WEB DEVELOPMENT",
    year: "2022",
    client: "Alex Wong Photography",
    featured: false,
    url: null
  },
  {
    id: 5,
    title: "Festival Branding",
    slug: "festival-branding",
    description: "Complete brand identity for an international music festival",
    category: "BRANDING",
    year: "2023",
    client: "SoundWave Festival",
    challenge: "Create a distinctive brand identity that appeals to diverse audiences while being adaptable across multiple platforms.",
    solution: "Developed a dynamic brand system with a responsive logo and flexible color palette.",
    results: "Recognized with a Brand Design Award, 70% brand recognition in target demographic.",
    gallery: [
      "/images/projects/festival/1.jpg",
      "/images/projects/festival/2.jpg"
    ],
    featured: true,
    url: null,
    testimonial: mockTestimonial
  }
];

export const mockServiceProcess = [
  {
    title: "DISCOVERY",
    description: "Initial research phase"
  },
  {
    title: "DESIGN",
    description: "Creating visuals and prototypes"
  }
];

export const mockServiceCaseStudy = {
  title: "CASE STUDY",
  description: "Example case study",
  image: "/casestudy.jpg",
  link: "https://example.com/case-study"
};

export const mockServices: Service[] = [
  {
    id: 1,
    title: "WEB DEVELOPMENT",
    slug: "web-development",
    description: "Custom websites and web applications built with modern technologies",
    category: "DIGITAL",
    benefits: [
      "Fast-loading, responsive websites",
      "Optimized for search engines",
      "Accessible to all users",
      "Secure and scalable infrastructure"
    ],
    process: mockServiceProcess,
    features: [
      "Responsive design",
      "Content management systems",
      "E-commerce integration",
      "Performance optimization",
      "SEO best practices"
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Framer Motion"
    ],
    caseStudies: [
      {
        title: "RAW Studio Website",
        description: "A brutalist website for a cutting-edge design studio",
        projectId: 1
      },
      {
        title: "Minimal Photography Portfolio",
        description: "Clean and minimal portfolio for a professional photographer",
        projectId: 4
      }
    ],
    faq: [
      {
        question: "How long does it take to build a website?",
        answer: "Typically 8-12 weeks, depending on complexity and requirements."
      },
      {
        question: "Do you provide website maintenance?",
        answer: "Yes, we offer ongoing maintenance packages to keep your site secure and up-to-date."
      },
      {
        question: "Can you help with content creation?",
        answer: "Yes, we have copywriters and content strategists who can help craft your message."
      }
    ]
  },
  {
    id: 2,
    title: "UI/UX DESIGN",
    slug: "ui-ux-design",
    description: "User-centered interfaces that deliver exceptional experiences",
    category: "DESIGN",
    benefits: [
      "Intuitive user interfaces",
      "Seamless user journeys",
      "Increased conversion rates",
      "Reduced user frustration"
    ],
    process: mockServiceProcess,
    features: [
      "User research",
      "Wireframing",
      "Interactive prototyping",
      "Design systems",
      "Accessibility compliance"
    ],
    technologies: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Principle",
      "InVision"
    ],
    caseStudies: [
      {
        title: "Health App UI Design",
        description: "Modern interface design for a health tracking application",
        projectId: 3
      }
    ],
    faq: [
      {
        question: "What is your design process?",
        answer: "Our process includes research, wireframing, design, prototyping, and testing."
      },
      {
        question: "Do you create design systems?",
        answer: "Yes, we create comprehensive design systems for consistent experiences across platforms."
      }
    ]
  },
  {
    id: 3,
    title: "BRANDING",
    slug: "branding",
    description: "Strategic brand identities that communicate your unique vision",
    category: "DESIGN",
    benefits: [
      "Distinctive brand presence",
      "Consistent brand experience",
      "Enhanced brand recognition",
      "Improved customer loyalty"
    ],
    process: null,
    features: null,
    technologies: null,
    caseStudies: [
      {
        title: "Festival Branding",
        description: "Complete brand identity for an international music festival",
        projectId: 5
      }
    ],
    faq: null
  },
  {
    id: 4,
    title: "E-COMMERCE",
    slug: "e-commerce",
    description: "Online stores that convert visitors into customers",
    category: "DIGITAL",
    benefits: [
      "Seamless shopping experiences",
      "Optimized checkout process",
      "Increased conversion rates",
      "Secure payment processing"
    ],
    process: null,
    features: null,
    technologies: null,
    caseStudies: [
      {
        title: "Eco Ecommerce Platform",
        description: "Sustainable shopping platform for eco-friendly products",
        projectId: 2
      }
    ],
    faq: null
  },
  {
    id: 5,
    title: "DIGITAL MARKETING",
    slug: "digital-marketing",
    description: "Data-driven strategies to grow your online presence",
    category: "MARKETING",
    benefits: [
      "Increased website traffic",
      "Higher conversion rates",
      "Improved brand awareness",
      "Better ROI on marketing spend"
    ],
    process: null,
    features: null,
    technologies: null,
    caseStudies: null,
    faq: null
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Creative Director",
    image: "/images/team/alex.jpg",
    bio: "Alex has over 15 years of experience in design and creative direction, having worked with major brands including Nike and Apple.",
    skills: [
      "Creative Direction",
      "Brand Strategy",
      "Design Leadership",
      "Client Relations"
    ],
    projects: [
      {
        id: 1,
        title: "RAW Studio Website",
        description: "A brutalist website for a cutting-edge design studio"
      },
      {
        id: 5,
        title: "Festival Branding",
        description: "Complete brand identity for an international music festival"
      }
    ],
    socials: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      github: null
    }
  },
  {
    id: 2,
    name: "Sarah Kim",
    role: "Lead Developer",
    image: "/images/team/sarah.jpg",
    bio: "Sarah is a full-stack developer with expertise in React and Node.js. She's passionate about creating performant, accessible web applications.",
    skills: [
      "Front-end Development",
      "Back-end Development",
      "Performance Optimization",
      "Accessibility"
    ],
    projects: [
      {
        id: 1,
        title: "RAW Studio Website",
        description: "A brutalist website for a cutting-edge design studio"
      },
      {
        id: 4,
        title: "Minimal Photography Portfolio",
        description: "Clean and minimal portfolio for a professional photographer"
      }
    ],
    socials: {
      linkedin: "https://linkedin.com/in/sarahkim",
      twitter: null,
      github: "https://github.com/sarahkim"
    }
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "UI/UX Designer",
    image: "/images/team/marcus.jpg",
    bio: "Marcus specializes in creating intuitive interfaces and seamless user experiences. His background in psychology informs his user-centered approach.",
    skills: [
      "User Interface Design",
      "User Experience Design",
      "Wireframing",
      "Prototyping",
      "User Research"
    ],
    projects: [
      {
        id: 2,
        title: "Eco Ecommerce Platform",
        description: "Sustainable shopping platform for eco-friendly products"
      },
      {
        id: 3,
        title: "Health App UI Design",
        description: "Modern interface design for a health tracking application"
      }
    ],
    socials: {
      linkedin: "https://linkedin.com/in/marcuschen",
      twitter: "https://twitter.com/marcuschen",
      github: null
    }
  },
  {
    id: 4,
    name: "Olivia Rodriguez",
    role: "Brand Strategist",
    image: "/images/team/olivia.jpg",
    bio: "Olivia has 10 years of experience in brand strategy and marketing. She excels at helping clients discover and articulate their unique voice.",
    skills: [
      "Brand Strategy",
      "Market Research",
      "Competitive Analysis",
      "Positioning"
    ],
    projects: [
      {
        id: 5,
        title: "Festival Branding",
        description: "Complete brand identity for an international music festival"
      }
    ],
    socials: {
      linkedin: "https://linkedin.com/in/oliviarodriguez",
      twitter: "https://twitter.com/oliviarodriguez",
      github: null
    }
  },
  {
    id: 5,
    name: "David Patterson",
    role: "Digital Marketing Specialist",
    image: "/images/team/david.jpg",
    bio: null,
    skills: [
      "SEO",
      "Content Marketing",
      "Social Media Strategy",
      "Analytics"
    ],
    projects: [],
    socials: {
      linkedin: "https://linkedin.com/in/davidpatterson",
      twitter: null,
      github: null
    }
  }
];

// Mock Project Categories
export const mockCategories = [
  "ALL",
  "WEB DEVELOPMENT",
  "UI/UX DESIGN",
  "BRANDING",
  "E-COMMERCE"
];

// Mock Form submission result
export const mockFormSubmission = {
  success: true,
  message: "Thank you for your message. We will be in touch soon!"
};

describe('Mock Data Fixtures', () => {
  it('should have a dummy test', () => {
    expect(true).toBe(true);
  });
}); 
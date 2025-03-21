import type { Project, Service, TeamMember } from "./types"

export const projects: Project[] = [
  {
    id: 1,
    title: "BRUTALIST COMMERCE",
    category: "E-COMMERCE",
    year: "2024",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A revolutionary e-commerce platform that challenges conventional design norms with a raw, brutalist aesthetic while maintaining exceptional usability.",
    gallery: [
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
    ],
    client: "CONCRETE FASHION",
    services: ["WEB DESIGN", "UX STRATEGY", "DEVELOPMENT", "E-COMMERCE"],
    challenge:
      "CONCRETE FASHION needed an e-commerce platform that would stand out in a crowded market while maintaining high conversion rates. They wanted to challenge conventional e-commerce design without sacrificing usability or sales performance.",
    solution:
      "We created a brutalist e-commerce experience that strips away unnecessary elements and focuses on product presentation. The design uses exposed grids, raw typography, and high contrast to create a memorable shopping experience that aligns with the brand's avant-garde aesthetic.",
    results:
      "The new platform increased conversion rates by 35% and average order value by 28%. The distinctive design generated significant social media attention, with a 215% increase in Instagram mentions and features in multiple design publications.",
    testimonial: {
      quote:
        "FoxLabs//Creative delivered exactly what we needed—a bold, distinctive e-commerce experience that sets us apart while driving real business results. Our customers love the unique design and find it refreshingly easy to navigate.",
      author: "Maya Chen",
      role: "Creative Director",
      company: "CONCRETE FASHION",
    },
    url: "https://example.com/brutalist-commerce",
  },
  {
    id: 2,
    title: "RAW INTERFACE",
    category: "WEB APP",
    year: "2023",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A web application with an exposed framework design that celebrates the beauty of functional, unadorned interfaces for a financial technology startup.",
    gallery: [
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
    ],
    client: "BLOCK FINANCE",
    services: ["UX DESIGN", "UI DESIGN", "DEVELOPMENT", "MOTION DESIGN"],
    challenge:
      "BLOCK FINANCE wanted to disrupt the traditionally conservative fintech space with a dashboard that felt modern and transparent, reflecting their company values while remaining highly functional for complex financial data.",
    solution:
      "We designed a brutalist interface that exposes the underlying structure of the application, using monospaced typography, visible grids, and raw data visualization. The design emphasizes transparency and functionality while creating a distinctive visual identity.",
    results:
      "User testing showed a 42% improvement in task completion rates compared to their previous interface. The distinctive design helped BLOCK FINANCE establish a unique brand identity in the fintech space, contributing to a successful Series A funding round.",
    testimonial: {
      quote:
        "The FoxLabs//Creative team understood our vision immediately. They created an interface that perfectly balances our need for functionality with our desire to stand out. Our users consistently mention how refreshing and intuitive the experience is.",
      author: "Alex Rivera",
      role: "CEO",
      company: "BLOCK FINANCE",
    },
    url: "https://example.com/raw-interface",
  },
  {
    id: 3,
    title: "CONCRETE DIGITAL",
    category: "BRANDING",
    year: "2023",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A comprehensive brand identity system for an architectural firm that embraces brutalist principles across digital and print touchpoints.",
    gallery: [
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
    ],
    client: "AXIS ARCHITECTS",
    services: ["BRANDING", "PRINT DESIGN", "WEB DESIGN", "MOTION DESIGN"],
    challenge:
      "AXIS ARCHITECTS needed a brand identity that would reflect their focus on brutalist and modernist architectural principles while establishing them as a forward-thinking firm in a competitive market.",
    solution:
      "We developed a comprehensive brand system rooted in brutalist design principles, featuring exposed grids, raw materials in print applications, and a stark black and white color palette with strategic use of concrete gray. The system extends across digital and print touchpoints with consistent application of these principles.",
    results:
      "The new brand identity has helped AXIS ARCHITECTS secure three major commercial projects and has been featured in Architectural Digest. Their social media following has increased by 175% since the rebrand launch.",
    testimonial: {
      quote:
        "FoxLabs//Creative created a brand identity that perfectly captures our architectural philosophy. The brutalist approach feels authentic to our work while giving us a distinctive presence in the market. We've received countless compliments from clients and peers alike.",
      author: "Sarah Nakamura",
      role: "Principal Architect",
      company: "AXIS ARCHITECTS",
    },
  },
  {
    id: 4,
    title: "EXPOSED FRAMEWORK",
    category: "WEBSITE",
    year: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A portfolio website for a photographer that uses grid-based layouts and raw typography to showcase work without distraction.",
    gallery: [
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
    ],
    client: "MARCO VISUALS",
    services: ["WEB DESIGN", "DEVELOPMENT", "CONTENT STRATEGY"],
    challenge:
      "Photographer Julian Marco needed a portfolio website that would showcase his work without competing with it, while still reflecting his distinctive artistic vision and standing out from typical photographer websites.",
    solution:
      "We created a brutalist portfolio that uses exposed grid systems and raw typography to frame the photography without distracting from it. The design deliberately avoids decorative elements, instead using structural components as visual elements that complement rather than compete with the photography.",
    results:
      "The website has received recognition in multiple design publications and has led to a 40% increase in client inquiries. Julian reports that clients frequently mention the distinctive design as a factor in their decision to reach out.",
    testimonial: {
      quote:
        "My portfolio finally feels like an authentic extension of my photography style. FoxLabs//Creative understood exactly what I needed—a design that showcases my work while making a statement of its own. The brutalist approach perfectly complements my visual aesthetic.",
      author: "Julian Marco",
      role: "Photographer",
      company: "MARCO VISUALS",
    },
    url: "https://example.com/exposed-framework",
  },
  {
    id: 5,
    title: "STRUCTURAL IDENTITY",
    category: "BRANDING",
    year: "2022",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A bold brand identity for a construction company that embraces industrial aesthetics and structural elements in its visual language.",
    gallery: [
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
    ],
    client: "FOUNDATION BUILDERS",
    services: ["BRANDING", "PRINT DESIGN", "SIGNAGE", "WEB DESIGN"],
    challenge:
      "FOUNDATION BUILDERS wanted to differentiate themselves from competitors with a brand identity that reflected their focus on modern construction techniques and architectural integrity.",
    solution:
      "We developed a brand identity system that draws inspiration from construction blueprints, exposed materials, and structural forms. The system uses a limited color palette of black, white, and construction yellow, with typography that references industrial signage.",
    results:
      "The rebrand has helped FOUNDATION BUILDERS secure contracts for three major commercial projects and has contributed to a 65% increase in qualified leads from their target market of modern architectural firms.",
    testimonial: {
      quote:
        "Our new brand identity perfectly captures the essence of our approach to construction. It's bold, honest, and structural—just like our buildings. FoxLabs//Creative delivered exactly what we needed to stand out in a crowded market.",
      author: "Robert Torres",
      role: "CEO",
      company: "FOUNDATION BUILDERS",
    },
  },
  {
    id: 6,
    title: "MONOCHROME EXPERIENCE",
    category: "UX DESIGN",
    year: "2021",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A stark, high-contrast user experience design for a digital art platform that focuses on content without unnecessary embellishment.",
    gallery: [
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
    ],
    client: "CANVAS DIGITAL",
    services: ["UX DESIGN", "UI DESIGN", "DEVELOPMENT", "CONTENT STRATEGY"],
    challenge:
      "CANVAS DIGITAL needed a platform that would showcase digital art without the interface competing with the artwork, while still providing a distinctive and memorable user experience.",
    solution:
      "We designed a brutalist user experience that uses stark black and white contrasts, exposed navigation elements, and raw typography to create a distinctive frame for the artwork. The interface deliberately avoids decorative elements, using structural components as visual elements.",
    results:
      "User testing showed a 78% preference for the new interface over competitors. The platform has attracted partnerships with several prominent digital artists who specifically cited the distinctive design approach as a factor in their decision.",
    testimonial: {
      quote:
        "The FoxLabs//Creative team created exactly what we needed—a platform that makes the art the star while still having a strong point of view. The brutalist approach perfectly complements our curation philosophy and has become a key part of our brand identity.",
      author: "Elena Kim",
      role: "Founder",
      company: "CANVAS DIGITAL",
    },
    url: "https://example.com/monochrome-experience",
  },
  {
    id: 7,
    title: "GRID SYSTEM",
    category: "WEB DESIGN",
    year: "2021",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "An exposed grid system design for a digital magazine that celebrates the structural elements of layout design.",
    gallery: ["/placeholder.svg?height=900&width=1600", "/placeholder.svg?height=900&width=1600"],
    client: "STRUCTURE MAGAZINE",
    services: ["WEB DESIGN", "DEVELOPMENT", "EDITORIAL DESIGN"],
    challenge:
      "STRUCTURE MAGAZINE wanted to reinvent the digital magazine format with a design that would reflect their focus on architecture and design while providing an innovative reading experience.",
    solution:
      "We created a website that exposes and celebrates its underlying grid system, using it as both a functional and aesthetic element. The design features visible columns, raw typography, and interactive elements that reveal the structural framework of the content.",
    results:
      "The redesign has led to a 45% increase in average time on site and a 30% increase in return visitors. The distinctive approach has also attracted premium advertisers from the architecture and design sectors.",
    testimonial: {
      quote:
        "Our readers love the new design—it's become a signature part of our brand. FoxLabs//Creative understood our vision for a magazine that doesn't just cover design but embodies it through every aspect of the reading experience.",
      author: "David Chen",
      role: "Editor-in-Chief",
      company: "STRUCTURE MAGAZINE",
    },
    url: "https://example.com/grid-system",
  },
  {
    id: 8,
    title: "TYPOGRAPHY FORWARD",
    category: "WEBSITE",
    year: "2020",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "A website for a literary journal that puts typography at the forefront with a brutalist approach to text hierarchy and spacing.",
    gallery: [
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
      "/placeholder.svg?height=900&width=1600",
    ],
    client: "VERSE QUARTERLY",
    services: ["WEB DESIGN", "TYPOGRAPHY", "DEVELOPMENT"],
    challenge:
      "VERSE QUARTERLY needed a website that would elevate the reading experience for their literary content while establishing a distinctive visual identity in the crowded digital publishing space.",
    solution:
      "We designed a typography-forward website that treats text as both content and visual element. The design uses dramatic scale contrasts, exposed structural elements, and raw typographic treatments to create a distinctive reading experience that honors the written word.",
    results:
      "The website has won two design awards and has contributed to a 55% increase in submissions from writers. Subscriber retention has improved by 40% since the redesign.",
    testimonial: {
      quote:
        "FoxLabs//Creative created a digital home for our journal that truly celebrates the written word. The brutalist approach to typography perfectly reflects our literary aesthetic and has helped us attract both readers and contributors who appreciate our distinctive point of view.",
      author: "Olivia Mercer",
      role: "Managing Editor",
      company: "VERSE QUARTERLY",
    },
    url: "https://example.com/typography-forward",
  },
]

export const services: Service[] = [
  {
    title: "TECHNOLOGY-DRIVEN INNOVATION",
    description:
      "We create bold, functional websites that challenge conventions while delivering exceptional user experiences. Our approach strips away unnecessary elements to focus on what truly matters.",
    benefits: [
      "Distinctive visual identity that stands out from competitors",
      "Functional, intuitive interfaces that prioritize user needs",
      "Responsive designs that work flawlessly across all devices",
      "Performance-optimized code for fast loading times",
      "Accessibility-first approach that ensures inclusivity",
    ],
    process: [
      {
        title: "DISCOVERY & STRATEGY",
        description:
          "We begin by understanding your brand, audience, and objectives to develop a strategic foundation for the design.",
      },
      {
        title: "WIREFRAMING & PROTOTYPING",
        description:
          "We create structural blueprints and interactive prototypes to test and refine the user experience.",
      },
      {
        title: "VISUAL DESIGN",
        description:
          "We develop a distinctive visual language that embodies brutalist principles while serving your brand needs.",
      },
      {
        title: "DEVELOPMENT",
        description: "We build your website with clean, efficient code that prioritizes performance and accessibility.",
      },
      {
        title: "TESTING & LAUNCH",
        description: "We rigorously test across devices and browsers before launching your site to the world.",
      },
    ],
    caseStudy: {
      title: "EXPOSED FRAMEWORK",
      description:
        "A portfolio website for photographer Julian Marco that uses grid-based layouts and raw typography to showcase work without distraction.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  },
  {
    title: "CREATIVE AUTOMATION",
    description:
      "We develop distinctive brand identities that stand out in crowded markets. Our brutalist approach to branding creates memorable, honest visual systems that communicate with clarity and impact.",
    benefits: [
      "Distinctive visual identity that cuts through market noise",
      "Cohesive brand system that works across all touchpoints",
      "Strategic positioning that differentiates your brand",
      "Honest, authentic expression of your brand values",
      "Flexible systems that can evolve with your business",
    ],
    process: [
      {
        title: "BRAND DISCOVERY",
        description: "We explore your brand's values, audience, market position, and competitive landscape.",
      },
      {
        title: "STRATEGY DEVELOPMENT",
        description: "We define your brand's positioning, messaging framework, and strategic direction.",
      },
      {
        title: "IDENTITY DESIGN",
        description: "We create your visual identity system including logo, typography, color, and graphic elements.",
      },
      {
        title: "SYSTEM EXPANSION",
        description: "We extend your brand across key touchpoints and create comprehensive guidelines.",
      },
      {
        title: "IMPLEMENTATION",
        description: "We support the rollout of your new brand across digital and physical channels.",
      },
    ],
    caseStudy: {
      title: "CONCRETE DIGITAL",
      description:
        "A comprehensive brand identity system for AXIS ARCHITECTS that embraces brutalist principles across digital and print touchpoints.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  },
  {
    title: "CUTTING-EDGE CONSULTING",
    description:
      "We craft user experience strategies that balance bold design choices with intuitive functionality. Our approach focuses on creating meaningful interactions that serve real user needs.",
    benefits: [
      "User-centered design that prioritizes real needs",
      "Strategic approach that aligns business goals with user goals",
      "Research-driven insights that inform design decisions",
      "Innovative interaction models that create memorable experiences",
      "Measurable improvements in key performance indicators",
    ],
    process: [
      {
        title: "USER RESEARCH",
        description:
          "We conduct interviews, surveys, and analysis to understand your users' needs, behaviors, and pain points.",
      },
      {
        title: "EXPERIENCE MAPPING",
        description: "We map user journeys and identify key touchpoints and opportunities for improvement.",
      },
      {
        title: "STRATEGIC FRAMEWORK",
        description: "We develop a UX strategy that aligns business objectives with user needs.",
      },
      {
        title: "CONCEPT DEVELOPMENT",
        description: "We create wireframes, prototypes, and interaction models to test and refine the experience.",
      },
      {
        title: "IMPLEMENTATION PLANNING",
        description: "We create a roadmap for implementing the UX strategy across your digital products.",
      },
    ],
    caseStudy: {
      title: "RAW INTERFACE",
      description:
        "A web application with an exposed framework design for BLOCK FINANCE that celebrates the beauty of functional, unadorned interfaces.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  },
  {
    title: "AUTOMATION & EFFICIENCIES",
    description:
      "We build robust, performant digital products using cutting-edge technologies. Our development approach emphasizes clean code, accessibility, and scalable architecture.",
    benefits: [
      "Performance-optimized code for fast loading times",
      "Accessible implementations that work for all users",
      "Scalable architecture that grows with your business",
      "Secure, reliable systems that protect user data",
      "Maintainable codebase for long-term sustainability",
    ],
    process: [
      {
        title: "TECHNICAL PLANNING",
        description: "We define the technical architecture, stack, and approach based on project requirements.",
      },
      {
        title: "FRONTEND DEVELOPMENT",
        description: "We build the user interface with clean, semantic code and a focus on performance.",
      },
      {
        title: "BACKEND DEVELOPMENT",
        description: "We develop robust server-side systems that power your application's functionality.",
      },
      {
        title: "TESTING & QA",
        description: "We rigorously test for functionality, performance, accessibility, and security.",
      },
      {
        title: "DEPLOYMENT & MAINTENANCE",
        description: "We handle deployment and provide ongoing support and maintenance.",
      },
    ],
    caseStudy: {
      title: "BRUTALIST COMMERCE",
      description:
        "A revolutionary e-commerce platform for CONCRETE FASHION that challenges conventional design norms while maintaining exceptional usability.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  },
  {
    title: "ENHANCE CREATIVITY",
    description:
      "We create dynamic motion design that adds depth and dimension to digital experiences. Our animations and transitions enhance storytelling while maintaining our brutalist aesthetic.",
    benefits: [
      "Enhanced user engagement through meaningful animation",
      "Improved usability with intuitive motion cues",
      "Distinctive brand expression through movement",
      "Storytelling enhanced by thoughtful transitions",
      "Performance-optimized animations that don't slow down your site",
    ],
    process: [
      {
        title: "MOTION STRATEGY",
        description: "We define how motion will enhance your brand and user experience.",
      },
      {
        title: "CONCEPT DEVELOPMENT",
        description: "We create storyboards and concept animations to establish the motion language.",
      },
      {
        title: "PROTOTYPING",
        description: "We build interactive prototypes to test and refine motion concepts.",
      },
      {
        title: "IMPLEMENTATION",
        description: "We develop production-ready animations using efficient, performant code.",
      },
      {
        title: "OPTIMIZATION",
        description: "We fine-tune animations for performance across devices and browsers.",
      },
    ],
    caseStudy: {
      title: "MONOCHROME EXPERIENCE",
      description:
        "A stark, high-contrast user experience design for CANVAS DIGITAL that focuses on content without unnecessary embellishment.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  },
  {
    title: "CONTENT CREATION",
    description:
      "We develop strategic digital marketing campaigns that cut through the noise. Our approach focuses on authentic messaging and bold creative that drives meaningful engagement.",
    benefits: [
      "Strategic campaigns aligned with business objectives",
      "Distinctive creative that stands out in crowded channels",
      "Data-driven approach that optimizes for results",
      "Authentic messaging that resonates with target audiences",
      "Integrated strategy across multiple digital touchpoints",
    ],
    process: [
      {
        title: "STRATEGY DEVELOPMENT",
        description: "We create a comprehensive marketing strategy based on your goals and audience.",
      },
      {
        title: "CREATIVE DEVELOPMENT",
        description: "We develop distinctive creative concepts that embody your brand and message.",
      },
      {
        title: "CHANNEL PLANNING",
        description: "We identify the optimal channels and tactics to reach your target audience.",
      },
      {
        title: "CAMPAIGN EXECUTION",
        description: "We implement campaigns across selected channels with meticulous attention to detail.",
      },
      {
        title: "ANALYSIS & OPTIMIZATION",
        description: "We continuously monitor performance and optimize for improved results.",
      },
    ],
    caseStudy: {
      title: "STRUCTURAL IDENTITY",
      description:
        "A bold brand identity and marketing campaign for FOUNDATION BUILDERS that embraces industrial aesthetics in its visual language.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: "ALEX MORGAN",
    role: "Founder & Creative Director",
    image: "/placeholder.svg?height=600&width=450",
  },
  {
    name: "JORDAN CHEN",
    role: "Design Lead",
    image: "/placeholder.svg?height=600&width=450",
  },
  {
    name: "TAYLOR WRIGHT",
    role: "Development Director",
    image: "/placeholder.svg?height=600&width=450",
  },
  {
    name: "CASEY RODRIGUEZ",
    role: "UX Strategist",
    image: "/placeholder.svg?height=600&width=450",
  },
  {
    name: "RILEY KIM",
    role: "Motion Designer",
    image: "/placeholder.svg?height=600&width=450",
  },
  {
    name: "MORGAN PATEL",
    role: "Project Manager",
    image: "/placeholder.svg?height=600&width=450",
  },
]


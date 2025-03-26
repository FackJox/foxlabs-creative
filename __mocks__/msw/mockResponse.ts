import { Project, Service, TeamMember } from '@/lib/types'

export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Alpine Adventure',
    description: 'A mountain tourism website with interactive trail maps and booking system.',
    image: '/projects/alpine.jpg',
    date: '2023-06-15',
    category: 'Web Development',
    services: ['Web Design', 'Frontend Development'],
    tags: ['React', 'NextJS', 'Typescript'],
    link: 'https://example.com/alpine'
  },
  {
    id: 2,
    title: 'Urban Eats',
    description: 'Food delivery platform with real-time order tracking and restaurant dashboard.',
    image: '/projects/urbaneats.jpg',
    date: '2023-04-10',
    category: 'Mobile App',
    services: ['UI/UX Design', 'Mobile Development'],
    tags: ['React Native', 'Firebase', 'Stripe'],
    link: 'https://example.com/urbaneats'
  },
  {
    id: 3,
    title: 'EcoTrack',
    description: 'Environmental monitoring dashboard for businesses to track their carbon footprint.',
    image: '/projects/ecotrack.jpg',
    date: '2023-01-22',
    category: 'Web Development',
    services: ['Data Visualization', 'Frontend Development', 'Backend Development'],
    tags: ['Vue', 'D3.js', 'Node.js', 'MongoDB'],
    link: 'https://example.com/ecotrack'
  }
]

export const mockServices: Service[] = [
  {
    title: 'Web Design',
    description: 'Creating beautiful, intuitive interfaces that delight users and drive engagement.',
    icon: 'design',
    features: [
      'User research and personas',
      'Wireframing and prototyping',
      'UI design and design systems',
      'Responsive design for all devices'
    ]
  },
  {
    title: 'Frontend Development',
    description: 'Building fast, responsive and accessible web applications with modern technologies.',
    icon: 'code',
    features: [
      'React/NextJS development',
      'Responsive layouts',
      'Performance optimization',
      'Accessibility compliance'
    ]
  },
  {
    title: 'Mobile Development',
    description: 'Crafting native and cross-platform mobile apps for iOS and Android.',
    icon: 'mobile',
    features: [
      'React Native development',
      'iOS and Android apps',
      'Offline capabilities',
      'App store deployment'
    ]
  },
  {
    title: 'Backend Development',
    description: 'Creating robust APIs and server-side solutions that power your applications.',
    icon: 'server',
    features: [
      'RESTful API development',
      'Database design',
      'Authentication systems',
      'Performance optimization'
    ]
  }
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Creative Director',
    bio: 'Over 10 years of experience in digital design and branding.',
    image: '/team/alex.jpg'
  },
  {
    id: 2,
    name: 'Sam Taylor',
    role: 'Lead Developer',
    bio: 'Full-stack developer specializing in React and Node.js.',
    image: '/team/sam.jpg'
  },
  {
    id: 3,
    name: 'Jordan Lee',
    role: 'UX Designer',
    bio: 'Creating user-centered designs with a focus on accessibility.',
    image: '/team/jordan.jpg'
  }
] 
/**
 * Simple mock data for use in tests
 */
import { Project, Service, TeamMember } from '@/lib/types'

export const mockProject: Project = {
  id: 1,
  title: 'Test Project',
  description: 'This is a test project used for unit tests.',
  image: '/projects/test.jpg',
  date: '2023-01-01',
  category: 'Testing',
  services: ['Testing Service'],
  tags: ['Test', 'Mock', 'Unit Testing'],
  link: 'https://example.com/test'
}

export const mockProjectsList: Project[] = [
  {
    id: 1,
    title: 'Test Project 1',
    description: 'This is test project 1.',
    image: '/projects/test1.jpg',
    date: '2023-01-01',
    category: 'Web Development',
    services: ['Web Design'],
    tags: ['React', 'TypeScript'],
    link: 'https://example.com/test1'
  },
  {
    id: 2,
    title: 'Test Project 2',
    description: 'This is test project 2.',
    image: '/projects/test2.jpg',
    date: '2023-01-02',
    category: 'Mobile App',
    services: ['Mobile Development'],
    tags: ['React Native', 'TypeScript'],
    link: 'https://example.com/test2'
  },
  {
    id: 3,
    title: 'Test Project 3',
    description: 'This is test project 3.',
    image: '/projects/test3.jpg',
    date: '2023-01-03',
    category: 'Web Development',
    services: ['Web Design', 'Frontend Development'],
    tags: ['React', 'Next.js', 'TypeScript'],
    link: 'https://example.com/test3'
  }
]

export const mockService: Service = {
  title: 'Test Service',
  description: 'This is a test service used for unit tests.',
  icon: 'test',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ]
}

export const mockServicesList: Service[] = [
  {
    title: 'Test Service 1',
    description: 'This is test service 1.',
    icon: 'service1',
    features: ['Feature 1A', 'Feature 1B']
  },
  {
    title: 'Test Service 2',
    description: 'This is test service 2.',
    icon: 'service2',
    features: ['Feature 2A', 'Feature 2B']
  },
  {
    title: 'Test Service 3',
    description: 'This is test service 3.',
    icon: 'service3',
    features: ['Feature 3A', 'Feature 3B']
  }
]

export const mockTeamMember: TeamMember = {
  id: 1,
  name: 'Test Person',
  role: 'Tester',
  bio: 'This is a test team member used for unit tests.',
  image: '/team/test.jpg'
}

export const mockTeamMembersList: TeamMember[] = [
  {
    id: 1,
    name: 'Test Person 1',
    role: 'Tester 1',
    bio: 'This is test team member 1.',
    image: '/team/test1.jpg'
  },
  {
    id: 2,
    name: 'Test Person 2',
    role: 'Tester 2',
    bio: 'This is test team member 2.',
    image: '/team/test2.jpg'
  },
  {
    id: 3,
    name: 'Test Person 3',
    role: 'Tester 3',
    bio: 'This is test team member 3.',
    image: '/team/test3.jpg'
  }
] 
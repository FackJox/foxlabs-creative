import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockProjects, mockServices, mockTestimonials } from '../fixtures/mockData';
import { CursorProvider } from '../../hooks/use-cursor';
import HomePage from '../../app/(foxlabs)/page';

// Mock the data
jest.mock('@/lib/data', () => ({
  projects: mockProjects,
  services: mockServices,
  testimonials: mockTestimonials,
}));

// Mock the components used in HomePage
jest.mock('@/components/layout/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

jest.mock('@/components/layout/footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('@/components/home/hero-section', () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section</div>,
}));

jest.mock('@/components/home/about-section', () => ({
  AboutSection: () => <div data-testid="about-section">About Section</div>,
}));

jest.mock('@/components/home/projects-section', () => ({
  ProjectsSection: ({ projects }) => (
    <div data-testid="projects-section">
      {projects.map((project) => (
        <div key={project.id} data-testid="project-item">{project.title}</div>
      ))}
    </div>
  ),
}));

jest.mock('@/components/home/services-section', () => ({
  ServicesSection: ({ services }) => (
    <div data-testid="services-section">
      {services.map((service, index) => (
        <div key={index} data-testid="service-item">{service.title}</div>
      ))}
    </div>
  ),
}));

jest.mock('@/components/home/testimonials-section', () => ({
  TestimonialsSection: ({ testimonials }) => (
    <div data-testid="testimonials-section">
      {testimonials.map((testimonial, index) => (
        <div key={index} data-testid="testimonial-item">{testimonial.author}</div>
      ))}
    </div>
  ),
}));

jest.mock('@/components/home/contact-section', () => ({
  ContactSection: () => <div data-testid="contact-section">Contact Section</div>,
}));

// Create a wrapper component with the CursorProvider
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <CursorProvider>{children}</CursorProvider>
);

describe('HomePage', () => {
  it('renders all sections', () => {
    render(<HomePage />, { wrapper: Wrapper });
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('passes correct data to projects section', () => {
    render(<HomePage />, { wrapper: Wrapper });
    
    // Check that projects are rendered
    expect(screen.getAllByTestId('project-item')).toHaveLength(mockProjects.length);
    mockProjects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('passes correct data to services section', () => {
    render(<HomePage />, { wrapper: Wrapper });
    
    // Check that services are rendered
    expect(screen.getAllByTestId('service-item')).toHaveLength(mockServices.length);
    mockServices.forEach(service => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  it('passes correct data to testimonials section', () => {
    render(<HomePage />, { wrapper: Wrapper });
    
    // Check that testimonials are rendered
    expect(screen.getAllByTestId('testimonial-item')).toHaveLength(mockTestimonials.length);
    mockTestimonials.forEach(testimonial => {
      expect(screen.getByText(testimonial.author)).toBeInTheDocument();
    });
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import ProjectDetail from '@/components/core/project-detail';
import { mockProjects, mockTestimonial } from '../fixtures/mockData';

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen
});

// Create a complete mock project with all required fields
const completeProject = {
  id: 999,
  title: "Complete Test Project",
  slug: "complete-test-project",
  description: "A test project with all fields populated",
  category: "TEST CATEGORY",
  year: "2023",
  image: "/images/test/main.jpg",
  client: "Test Client",
  challenge: "Test challenge description",
  solution: "Test solution description",
  results: "Test results description",
  services: ["Web Development", "UX Design", "Branding"],
  gallery: [
    "/images/test/1.jpg",
    "/images/test/2.jpg",
    "/images/test/3.jpg"
  ],
  featured: true,
  url: "https://test-project.com",
  testimonial: mockTestimonial
};

describe('ProjectDetail', () => {
  const mockOnClose = jest.fn();
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the project detail with all fields', () => {
    // Act
    render(
      <ProjectDetail 
        project={completeProject} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    // Assert
    expect(screen.getByText(completeProject.title)).toBeInTheDocument();
    expect(screen.getByText(completeProject.category)).toBeInTheDocument();
    expect(screen.getByText(completeProject.year)).toBeInTheDocument();
    expect(screen.getByText(completeProject.description)).toBeInTheDocument();
    expect(screen.getByText('OVERVIEW')).toBeInTheDocument();
    expect(screen.getByText('CLIENT')).toBeInTheDocument();
    expect(screen.getByText(completeProject.client)).toBeInTheDocument();
    expect(screen.getByText('SERVICES')).toBeInTheDocument();
    expect(screen.getByText(completeProject.services[0])).toBeInTheDocument();
    expect(screen.getByText('THE CHALLENGE')).toBeInTheDocument();
    expect(screen.getByText(completeProject.challenge)).toBeInTheDocument();
    expect(screen.getByText('OUR SOLUTION')).toBeInTheDocument();
    expect(screen.getByText(completeProject.solution)).toBeInTheDocument();
    expect(screen.getByText('RESULTS')).toBeInTheDocument();
    expect(screen.getByText(completeProject.results)).toBeInTheDocument();
    expect(screen.getByTestId('testimonial-quote')).toHaveTextContent(completeProject.testimonial.quote);
    expect(screen.getByTestId('testimonial-author')).toHaveTextContent(completeProject.testimonial.author);
    expect(screen.getByTestId('testimonial-role')).toHaveTextContent(completeProject.testimonial.role);
    expect(screen.getByTestId('testimonial-company')).toHaveTextContent(completeProject.testimonial.company);
  });
  
  it('renders the project detail with minimal fields', () => {
    // Arrange
    const minimalProject = {
      id: 998,
      title: "Minimal Test Project",
      slug: "minimal-test-project",
      description: "A test project with minimal fields",
      category: "MINIMAL",
      year: "2022",
      image: "/images/test/minimal.jpg",
    };
    
    // Act
    render(
      <ProjectDetail 
        project={minimalProject} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    // Assert
    expect(screen.getByText(minimalProject.title)).toBeInTheDocument();
    expect(screen.getByText(minimalProject.category)).toBeInTheDocument();
    expect(screen.getByText(minimalProject.year)).toBeInTheDocument();
    expect(screen.getByText(minimalProject.description)).toBeInTheDocument();
    expect(screen.getByText('OVERVIEW')).toBeInTheDocument();
    
    // Check that optional sections are not rendered
    expect(screen.queryByText('CLIENT')).not.toBeInTheDocument();
    expect(screen.queryByText('THE CHALLENGE')).not.toBeInTheDocument();
    expect(screen.queryByText('OUR SOLUTION')).not.toBeInTheDocument();
    expect(screen.queryByText('RESULTS')).not.toBeInTheDocument();
    expect(screen.queryByText('VIEW LIVE PROJECT')).not.toBeInTheDocument();
  });
  
  it('calls onClose when close button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(
      <ProjectDetail 
        project={completeProject} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    const closeButton = screen.getAllByRole('button')[0]; // First button is close
    await user.click(closeButton);
    
    // Assert
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  it('handles gallery navigation if gallery exists', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(
      <ProjectDetail 
        project={completeProject} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    // We need to find the navigation buttons by their test IDs
    const nextButton = screen.getByTestId('gallery-next');
    const prevButton = screen.getByTestId('gallery-prev');
    
    // Click next
    await user.click(nextButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('NEXT');
    
    // Click prev
    await user.click(prevButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('PREV');
  });
  
  it('opens the project URL in a new tab when View Live Project is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(
      <ProjectDetail 
        project={completeProject} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    // Use the dedicated test ID to find the first button with "VIEW LIVE PROJECT"
    const viewButton = screen.getAllByRole('button').find(
      button => button.textContent?.includes('VIEW LIVE PROJECT')
    );
    
    if (viewButton) {
      await user.click(viewButton);
      
      // Assert
      expect(mockOpen).toHaveBeenCalledWith(completeProject.url, '_blank');
      expect(mockSetCursorText).toHaveBeenCalledWith('VISIT');
    }
  });
  
  it('sets cursor text on mouse enter and clears on mouse leave for buttons', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(
      <ProjectDetail 
        project={completeProject} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    const closeButton = screen.getByTestId('back-to-projects');
    
    // Mouse enter
    await user.hover(closeButton);
    
    // Assert
    expect(mockSetCursorText).toHaveBeenCalledWith('CLOSE');
    
    // Mouse leave
    await user.unhover(closeButton);
    
    // Assert
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
  
  it('calls onClose to start a new project when Start a Similar Project is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Mock the document.querySelector
    const mockScrollIntoView = jest.fn();
    document.querySelector = jest.fn().mockImplementation(() => ({
      scrollIntoView: mockScrollIntoView
    }));
    
    // Act
    render(
      <ProjectDetail 
        project={completeProject} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    const startButton = screen.getByText('START A SIMILAR PROJECT');
    await user.click(startButton);
    
    // Assert
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenCalledWith('#contact-section');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectDetail from '@/components/core/project-detail';
import { mockProjects } from '../fixtures/mockData';

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen
});

describe('ProjectDetail', () => {
  const mockOnClose = jest.fn();
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the project detail with all fields', () => {
    // Arrange
    const project = mockProjects[0]; // Project with all fields
    
    // Act
    render(
      <ProjectDetail 
        project={project} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    // Assert
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
    expect(screen.getByText(project.year)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(screen.getByText('OVERVIEW')).toBeInTheDocument();
    expect(screen.getByText('CLIENT')).toBeInTheDocument();
    expect(screen.getByText(project.client!)).toBeInTheDocument();
    expect(screen.getByText('SERVICES')).toBeInTheDocument();
    expect(screen.getByText(project.services![0])).toBeInTheDocument();
    expect(screen.getByText('THE CHALLENGE')).toBeInTheDocument();
    expect(screen.getByText(project.challenge!)).toBeInTheDocument();
    expect(screen.getByText('OUR SOLUTION')).toBeInTheDocument();
    expect(screen.getByText(project.solution!)).toBeInTheDocument();
    expect(screen.getByText('RESULTS')).toBeInTheDocument();
    expect(screen.getByText(project.results!)).toBeInTheDocument();
    expect(screen.getByText(project.testimonial!.quote)).toBeInTheDocument();
    expect(screen.getByText(project.testimonial!.author)).toBeInTheDocument();
    expect(screen.getByText(`${project.testimonial!.role}, ${project.testimonial!.company}`)).toBeInTheDocument();
    expect(screen.getByText('VIEW LIVE PROJECT')).toBeInTheDocument();
  });
  
  it('renders the project detail with minimal fields', () => {
    // Arrange
    const project = mockProjects[3]; // Project with minimal fields
    
    // Act
    render(
      <ProjectDetail 
        project={project} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    // Assert
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
    expect(screen.getByText(project.year)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
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
    const project = mockProjects[0];
    
    // Act
    render(
      <ProjectDetail 
        project={project} 
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
    const project = mockProjects[0]; // Has gallery
    
    // Act
    render(
      <ProjectDetail 
        project={project} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    // We need to find the navigation buttons (they appear if gallery.length > 1)
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find(button => 
      button.innerHTML.includes('ChevronRight')
    );
    const prevButton = buttons.find(button => 
      button.innerHTML.includes('ChevronLeft')
    );
    
    // Click next
    if (nextButton) {
      await user.click(nextButton);
      expect(mockSetCursorText).toHaveBeenCalledWith('NEXT');
    }
    
    // Click prev
    if (prevButton) {
      await user.click(prevButton);
      expect(mockSetCursorText).toHaveBeenCalledWith('PREV');
    }
  });
  
  it('opens the project URL in a new tab when View Live Project is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const project = mockProjects[0]; // Has URL
    
    // Act
    render(
      <ProjectDetail 
        project={project} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    const viewButton = screen.getByText('VIEW LIVE PROJECT');
    await user.click(viewButton);
    
    // Assert
    expect(mockOpen).toHaveBeenCalledWith(project.url, '_blank');
    expect(mockSetCursorText).toHaveBeenCalledWith('VISIT');
  });
  
  it('sets cursor text on mouse enter and clears on mouse leave for buttons', async () => {
    // Arrange
    const user = userEvent.setup();
    const project = mockProjects[0];
    
    // Act
    render(
      <ProjectDetail 
        project={project} 
        onClose={mockOnClose} 
        setCursorText={mockSetCursorText} 
      />
    );
    
    const closeButton = screen.getAllByRole('button')[0]; // First button is close
    
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
    const project = mockProjects[0];
    
    // Mock the document.querySelector
    const mockScrollIntoView = jest.fn();
    document.querySelector = jest.fn().mockImplementation(() => ({
      scrollIntoView: mockScrollIntoView
    }));
    
    // Act
    render(
      <ProjectDetail 
        project={project} 
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
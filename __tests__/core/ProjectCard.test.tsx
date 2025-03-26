import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from '@/components/core/project-card';
import { mockProject, mockProjects } from '../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

describe('ProjectCard', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });
  
  it('renders the project card with required fields', () => {
    // Arrange - Use a known good mock project instead of relying on array index
    const project = mockProject;
    
    // Act
    render(<ProjectCard project={project} index={0} />);
    
    // Assert
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
    expect(screen.getByText(project.year)).toBeInTheDocument();
    expect(screen.getByAltText(project.title)).toHaveAttribute('src');
  });
  
  it('renders the project card with all fields', () => {
    // Arrange - Use a known good mock project
    const project = mockProject;
    
    // Act
    render(<ProjectCard project={project} index={0} />);
    
    // Assert
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
    expect(screen.getByText(project.year)).toBeInTheDocument();
    expect(screen.getByAltText(project.title)).toHaveAttribute('src');
  });
  
  it('renders detailed project description when detailed prop is true', () => {
    // Arrange
    const project = mockProject;
    
    // Act
    render(<ProjectCard project={project} index={0} detailed={true} />);
    
    // Assert
    expect(screen.getByText(project.description)).toBeInTheDocument();
  });
  
  it('does not render project description when detailed prop is false', () => {
    // Arrange
    const project = mockProject;
    
    // Act
    render(<ProjectCard project={project} index={0} detailed={false} />);
    
    // Assert
    expect(screen.queryByText(project.description)).not.toBeInTheDocument();
  });
  
  it('sets cursor text on mouse enter and clears on mouse leave', async () => {
    // Arrange
    const user = userEvent.setup();
    const project = mockProject;
    
    // Act
    const { container } = render(<ProjectCard project={project} index={0} />);
    const card = container.firstChild as HTMLElement;
    
    // Mouse enter
    await user.hover(card);
    
    // Assert
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    // Mouse leave
    await user.unhover(card);
    
    // Assert
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
}); 
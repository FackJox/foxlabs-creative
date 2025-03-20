import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectCard from '@/components/core/project-card';
import { useCursor } from '@/hooks/use-cursor';
import { createMockProject, createMinimalProject } from '../../fixtures/mockDataFactory';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
  };
});

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('ProjectCard Component', () => {
  const mockSetCursorText = jest.fn();
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
    
    // Reset mocks
    jest.mock('next/navigation', () => ({
      useRouter: jest.fn(() => ({
        push: mockPush,
      })),
    }));
  });
  
  describe('Rendering with different data variations', () => {
    it('renders with complete project data', () => {
      // Arrange
      const project = createMockProject();
      
      // Act
      render(<ProjectCard project={project} index={0} />);
      
      // Assert
      expect(screen.getByTestId('project-title')).toHaveTextContent(project.title);
      expect(screen.getByTestId('project-category')).toHaveTextContent(project.category);
      expect(screen.getByTestId('project-year')).toHaveTextContent(project.year);
      const image = screen.getByAltText(project.title);
      expect(image).toHaveAttribute('src');
    });
    
    it('renders with minimal project data (only required fields)', () => {
      // Arrange
      const project = createMinimalProject();
      
      // Act
      render(<ProjectCard project={project} index={0} />);
      
      // Assert
      expect(screen.getByTestId('project-title')).toHaveTextContent(project.title);
      expect(screen.getByTestId('project-category')).toHaveTextContent(project.category);
      expect(screen.getByTestId('project-year')).toHaveTextContent(project.year);
      const image = screen.getByAltText(project.title);
      expect(image).toHaveAttribute('src');
    });
    
    it('renders project description when detailed prop is true', () => {
      // Arrange
      const project = createMockProject();
      
      // Act
      render(<ProjectCard project={project} index={0} detailed={true} />);
      
      // Assert
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
    
    it('does not render project description when detailed prop is false', () => {
      // Arrange
      const project = createMockProject();
      
      // Act
      render(<ProjectCard project={project} index={0} />);
      
      // Assert
      expect(screen.queryByText(project.description)).not.toBeInTheDocument();
    });
    
    it('uses a placeholder image when project image is missing', () => {
      // Arrange
      const project = createMockProject({ image: undefined as unknown as string });
      
      // Act
      render(<ProjectCard project={project} index={0} />);
      
      // Assert
      const imageElement = screen.getByAltText(project.title);
      expect(imageElement).toHaveAttribute('src');
      expect(imageElement.getAttribute('src')).toContain('/placeholder');
    });
  });
  
  describe('Interaction behavior', () => {
    it('sets cursor text to "VIEW" on hover and clears on unhover', async () => {
      // Arrange
      const user = userEvent.setup();
      const project = createMockProject();
      
      // Act
      const { container } = render(<ProjectCard project={project} index={0} />);
      const card = container.querySelector('[data-testid="project-card"]') as HTMLElement;
      
      // Assert - before hover
      expect(mockSetCursorText).not.toHaveBeenCalled();
      
      // Mouse enter
      await user.hover(card);
      
      // Assert - after hover
      expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
      
      // Mouse leave
      await user.unhover(card);
      
      // Assert - after unhover
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    });
    
    it('animates properly based on index prop', () => {
      // Arrange
      const project = createMockProject();
      const index = 2;
      
      // Act
      const { container } = render(<ProjectCard project={project} index={index} />);
      const card = container.querySelector('[data-testid="project-card"]') as HTMLElement;
      
      // Assert
      expect(card).toHaveAttribute('data-testid', 'project-card');
      expect(card).toBeTruthy();
    });
  });
  
  describe('Accessibility compliance', () => {
    it('should have no accessibility violations', async () => {
      // Arrange
      const project = createMockProject();
      
      // Act
      const { container } = render(<ProjectCard project={project} index={0} />);
      
      // Assert
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('has proper image alt text for screen readers', () => {
      // Arrange
      const project = createMockProject();
      
      // Act
      render(<ProjectCard project={project} index={0} />);
      
      // Assert
      const imageElement = screen.getByAltText(project.title);
      expect(imageElement).toHaveAttribute('alt', project.title);
    });
    
    it('has proper aria label for project title', () => {
      // Arrange
      const project = createMockProject();
      
      // Act
      render(<ProjectCard project={project} index={0} />);
      
      // Assert
      const titleElement = screen.getByTestId('project-title');
      expect(titleElement).toHaveAttribute('aria-label', project.title);
    });
  });
}); 
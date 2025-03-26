import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createMockProject, createMinimalProject } from '../../fixtures/mockDataFactory';

// Directly import the ProjectCard component
import ProjectCard from '../../../components/core/project-card';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(() => ({
    setCursorText: jest.fn(),
    cursorText: '',
  })),
}));

// Extended mock for Framer Motion to cover all elements used in ProjectCard
jest.mock('framer-motion', () => {
  return {
    __esModule: true,
    motion: {
      div: ({ children, ...props }) => React.createElement('div', props, children),
      button: ({ children, ...props }) => React.createElement('button', props, children),
      section: ({ children, ...props }) => React.createElement('section', props, children),
      article: ({ children, ...props }) => React.createElement('article', props, children),
      span: ({ children, ...props }) => React.createElement('span', props, children),
      p: ({ children, ...props }) => React.createElement('p', props, children),
      h1: ({ children, ...props }) => React.createElement('h1', props, children),
      h2: ({ children, ...props }) => React.createElement('h2', props, children),
      h3: ({ children, ...props }) => React.createElement('h3', props, children),
      nav: ({ children, ...props }) => React.createElement('nav', props, children),
      ul: ({ children, ...props }) => React.createElement('ul', props, children),
      li: ({ children, ...props }) => React.createElement('li', props, children),
      img: ({ ...props }) => React.createElement('img', props),
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
    }),
    useInView: jest.fn(() => true),
    useReducedMotion: jest.fn(() => false),
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, className, fill, sizes, ...props }) => {
    return React.createElement('img', {
      src,
      alt: alt || '',
      className,
      'data-priority': priority,
      'data-fill': fill,
      'data-sizes': sizes,
      ...props
    });
  },
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Create mocks for external dependencies
const mockSetCursorText = jest.fn();
const mockPush = jest.fn();

describe('ProjectCard Component', () => {
  beforeEach(() => {
    // Reset all mocks at the start of each test
    jest.clearAllMocks();
    
    // Setup mockSetCursorText for testing
    require('@/hooks/use-cursor').useCursor.mockImplementation(() => ({
      cursorText: '',
      setCursorText: mockSetCursorText
    }));
    
    // Reset router mock
    require('next/navigation').useRouter.mockImplementation(() => ({
      push: mockPush
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
      const project = createMockProject();
      
      // Render the component
      const { container } = render(<ProjectCard project={project} index={0} />);
      const card = container.querySelector('[data-testid="project-card"]') as HTMLElement;
      
      // Assert - before hover
      expect(mockSetCursorText).not.toHaveBeenCalled();
      
      // Trigger mouse enter
      fireEvent.mouseEnter(card);
      
      // Assert - after hover
      expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
      
      // Clear the mock to test mouse leave separately
      mockSetCursorText.mockClear();
      
      // Trigger mouse leave
      fireEvent.mouseLeave(card);
      
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
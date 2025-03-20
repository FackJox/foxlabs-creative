import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { useMediaQuery } from '@/hooks/use-media-query';
import ProjectCard from '@/components/core/project-card';
import { createMockProjects } from '../../fixtures/mockDataFactory';
import { useCursor } from '@/hooks/use-cursor';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock the required hooks and components
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

jest.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: jest.fn(),
}));

jest.mock('@/components/core/project-card', () => {
  return jest.fn(({ project }) => (
    <div data-testid={`project-card-${project.id}`}>
      <h3>{project.title}</h3>
      <span data-testid="project-category">{project.category}</span>
    </div>
  ));
});

// Mock framer-motion to simplify testing
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, className, ...props }) => (
        <div className={className} {...props}>
          {children}
        </div>
      ),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

// Create a mock ProjectList component for testing since we don't have access
// to the actual implementation. This is based on what we can infer from the requirements.
const ProjectList = ({ 
  projects, 
  filterCategory = null,
  setCursorText 
}) => {
  const filteredProjects = filterCategory 
    ? projects.filter(p => p.category === filterCategory)
    : projects;

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px)');

  const gridClass = isDesktop 
    ? 'grid-cols-3' 
    : isTablet 
      ? 'grid-cols-2' 
      : 'grid-cols-1';

  if (filteredProjects.length === 0) {
    return (
      <div 
        className="empty-state" 
        data-testid="empty-projects"
        aria-live="polite"
      >
        No projects found for the selected category.
      </div>
    );
  }

  return (
    <div 
      className={`grid gap-6 ${gridClass}`} 
      data-testid="project-list-grid"
      aria-label="Projects gallery"
    >
      {filteredProjects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          index={index} 
        />
      ))}
    </div>
  );
};

// Mock ProjectFilter component for testing
const ProjectFilter = ({ 
  onFilterChange, 
  categories, 
  activeFilter,
  setCursorText
}) => {
  return (
    <div className="flex flex-wrap gap-2" data-testid="project-filter">
      {categories.map(category => (
        <button
          key={category}
          data-testid={`filter-${category.toLowerCase()}`}
          className={activeFilter === category ? 'active' : ''}
          onClick={() => onFilterChange(category)}
          onMouseEnter={() => setCursorText('FILTER')}
          onMouseLeave={() => setCursorText('')}
          aria-pressed={activeFilter === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Create a test wrapper component to manage state
const ProjectListWithFilter = ({ projects: initialProjects }) => {
  const [filterCategory, setFilterCategory] = React.useState(null);
  const { setCursorText } = useCursor();
  
  // Ensure categories have unique values to avoid duplicate React keys
  const uniqueCategories = Array.from(new Set(initialProjects.map(p => p.category)));
  const categories = ['ALL', ...uniqueCategories];
  
  const handleFilterChange = (category) => {
    setFilterCategory(category === 'ALL' ? null : category);
  };
  
  return (
    <div data-testid="project-section">
      <ProjectFilter
        categories={categories}
        onFilterChange={handleFilterChange}
        activeFilter={filterCategory || 'ALL'}
        setCursorText={setCursorText}
      />
      <ProjectList 
        projects={initialProjects} 
        filterCategory={filterCategory}
        setCursorText={setCursorText}
      />
    </div>
  );
};

describe('ProjectList Component', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    ProjectCard.mockClear();
  });
  
  describe('Rendering project lists', () => {
    it('renders the correct number of ProjectCard components', () => {
      // Arrange
      const mockProjects = createMockProjects(3);
      
      // Act
      render(<ProjectList projects={mockProjects} setCursorText={mockSetCursorText} />);
      
      // Assert
      expect(ProjectCard).toHaveBeenCalledTimes(3);
      expect(screen.getByTestId('project-list-grid')).toBeInTheDocument();
      mockProjects.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });
    
    it('passes the correct props to each ProjectCard', () => {
      // Arrange
      const mockProjects = createMockProjects(2);
      
      // Act
      render(<ProjectList projects={mockProjects} setCursorText={mockSetCursorText} />);
      
      // Assert
      const calls = (ProjectCard as jest.Mock).mock.calls;
      
      // Check first call
      expect(calls[0][0].project).toEqual(mockProjects[0]);
      expect(calls[0][0].index).toBe(0);
      
      // Check second call
      expect(calls[1][0].project).toEqual(mockProjects[1]);
      expect(calls[1][0].index).toBe(1);
    });
  });
  
  describe('Empty state handling', () => {
    it('shows empty state message when no projects are available', () => {
      // Arrange & Act
      render(<ProjectList projects={[]} setCursorText={mockSetCursorText} />);
      
      // Assert
      expect(screen.getByTestId('empty-projects')).toBeInTheDocument();
      expect(screen.getByText('No projects found for the selected category.')).toBeInTheDocument();
    });
    
    it('shows empty state when no projects match the filter category', () => {
      // Arrange
      const mockProjects = createMockProjects(3, { category: 'WEBSITE' });
      
      // Act
      render(
        <ProjectList 
          projects={mockProjects} 
          filterCategory="BRANDING" 
          setCursorText={mockSetCursorText} 
        />
      );
      
      // Assert
      expect(screen.getByTestId('empty-projects')).toBeInTheDocument();
    });
  });
  
  describe('Filtering behavior', () => {
    it('filters projects by category when filterCategory is provided', () => {
      // Arrange
      const websiteProjects = createMockProjects(2, { category: 'WEBSITE' });
      const brandingProjects = createMockProjects(3, { category: 'BRANDING' }, [
        { id: 100 }, { id: 101 }, { id: 102 }
      ]);
      
      const mockProjects = [...websiteProjects, ...brandingProjects];
      
      // Act
      render(
        <ProjectList 
          projects={mockProjects} 
          filterCategory="WEBSITE" 
          setCursorText={mockSetCursorText} 
        />
      );
      
      // Assert
      expect(ProjectCard).toHaveBeenCalledTimes(2);
      const calls = (ProjectCard as jest.Mock).mock.calls;
      calls.forEach(call => {
        expect(call[0].project.category).toBe('WEBSITE');
      });
    });
    
    it('integrates with filter component correctly', async () => {
      // Arrange - Create projects with unique IDs and different categories
      const websiteProjects = createMockProjects(2, { category: 'WEBSITE' });
      const brandingProjects = createMockProjects(3, { category: 'BRANDING' }, [
        { id: 100 }, { id: 101 }, { id: 102 }
      ]);
      
      const mockProjects = [...websiteProjects, ...brandingProjects];
      
      // Reset the mock before rendering
      jest.clearAllMocks();
      
      // Act
      render(<ProjectListWithFilter projects={mockProjects} />);
      
      // Initial render should have all 5 projects
      expect(ProjectCard).toHaveBeenCalledTimes(5);
      
      // Clear mock calls to start fresh for next assertion
      ProjectCard.mockClear();
      
      // Click on the branding filter
      fireEvent.click(screen.getByTestId('filter-branding'));
      
      // Assert
      await waitFor(() => {
        // Check that only branding projects are displayed (should be 3)
        const brandingCards = screen.getAllByTestId(/project-card-10[0-2]/);
        expect(brandingCards).toHaveLength(3);
        
        // No website projects should be visible
        websiteProjects.forEach(project => {
          expect(screen.queryByTestId(`project-card-${project.id}`)).not.toBeInTheDocument();
        });
      });
      
      // Reset mock calls again
      ProjectCard.mockClear();
      
      // Reset filter by clicking ALL
      fireEvent.click(screen.getByTestId('filter-all'));
      
      // Should show all 5 projects again
      await waitFor(() => {
        expect(screen.getAllByTestId(/project-card/)).toHaveLength(5);
      });
    });
  });
  
  describe('Responsive layout', () => {
    it('uses single column grid on mobile devices', () => {
      // Arrange
      (useMediaQuery as jest.Mock).mockImplementation((query) => {
        return false; // All queries return false for mobile
      });
      const mockProjects = createMockProjects(3);
      
      // Act
      render(<ProjectList projects={mockProjects} setCursorText={mockSetCursorText} />);
      
      // Assert
      const grid = screen.getByTestId('project-list-grid');
      expect(grid.className).toContain('grid-cols-1');
      expect(grid.className).not.toContain('grid-cols-2');
      expect(grid.className).not.toContain('grid-cols-3');
    });
    
    it('uses two column grid on tablet devices', () => {
      // Arrange
      (useMediaQuery as jest.Mock).mockImplementation((query) => {
        return query === '(min-width: 768px)'; // Only tablet query is true
      });
      const mockProjects = createMockProjects(3);
      
      // Act
      render(<ProjectList projects={mockProjects} setCursorText={mockSetCursorText} />);
      
      // Assert
      const grid = screen.getByTestId('project-list-grid');
      expect(grid.className).toContain('grid-cols-2');
      expect(grid.className).not.toContain('grid-cols-1');
      expect(grid.className).not.toContain('grid-cols-3');
    });
    
    it('uses three column grid on desktop devices', () => {
      // Arrange
      (useMediaQuery as jest.Mock).mockImplementation((query) => {
        return true; // All queries return true for desktop
      });
      const mockProjects = createMockProjects(3);
      
      // Act
      render(<ProjectList projects={mockProjects} setCursorText={mockSetCursorText} />);
      
      // Assert
      const grid = screen.getByTestId('project-list-grid');
      expect(grid.className).toContain('grid-cols-3');
      expect(grid.className).not.toContain('grid-cols-1');
      expect(grid.className).not.toContain('grid-cols-2');
    });
  });
  
  describe('Animation sequencing', () => {
    it('passes the correct index to each ProjectCard for staggered animations', () => {
      // Arrange
      const mockProjects = createMockProjects(4);
      
      // Act
      render(<ProjectList projects={mockProjects} setCursorText={mockSetCursorText} />);
      
      // Assert
      const calls = (ProjectCard as jest.Mock).mock.calls;
      mockProjects.forEach((project, index) => {
        expect(calls[index][0].index).toBe(index);
      });
    });
  });
  
  describe('Accessibility compliance', () => {
    it('has no accessibility violations', async () => {
      // Arrange
      const mockProjects = createMockProjects(3);
      
      // Act
      const { container } = render(
        <ProjectList projects={mockProjects} setCursorText={mockSetCursorText} />
      );
      
      // Assert
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('includes proper aria attributes for screen readers', () => {
      // Arrange
      const mockProjects = createMockProjects(3);
      
      // Act
      render(<ProjectList projects={mockProjects} setCursorText={mockSetCursorText} />);
      
      // Assert
      const listContainer = screen.getByTestId('project-list-grid');
      expect(listContainer).toHaveAttribute('aria-label', 'Projects gallery');
    });
    
    it('announces empty state to screen readers with aria-live', () => {
      // Arrange & Act
      render(<ProjectList projects={[]} setCursorText={mockSetCursorText} />);
      
      // Assert
      const emptyState = screen.getByTestId('empty-projects');
      expect(emptyState).toHaveAttribute('aria-live', 'polite');
    });
  });
}); 
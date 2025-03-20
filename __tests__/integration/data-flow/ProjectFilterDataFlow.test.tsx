import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockProjects } from '../../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Create a simplified ProjectFilter component
function ProjectFilter({ onFilterChange, activeFilter }) {
  const { setCursorText } = useCursor();
  
  return (
    <div data-testid="project-filters">
      <button 
        data-testid="filter-all"
        onClick={() => onFilterChange('ALL')}
        className={activeFilter === 'ALL' ? 'active' : ''}
        onMouseEnter={() => setCursorText('FILTER')}
        onMouseLeave={() => setCursorText('')}
      >
        ALL
      </button>
      <button 
        data-testid="filter-website"
        onClick={() => onFilterChange('WEB DEVELOPMENT')}
        className={activeFilter === 'WEB DEVELOPMENT' ? 'active' : ''}
        onMouseEnter={() => setCursorText('FILTER')}
        onMouseLeave={() => setCursorText('')}
      >
        WEB DEVELOPMENT
      </button>
      <button 
        data-testid="filter-branding"
        onClick={() => onFilterChange('BRANDING')}
        className={activeFilter === 'BRANDING' ? 'active' : ''}
        onMouseEnter={() => setCursorText('FILTER')}
        onMouseLeave={() => setCursorText('')}
      >
        BRANDING
      </button>
      <button 
        data-testid="filter-ecommerce"
        onClick={() => onFilterChange('E-COMMERCE')}
        className={activeFilter === 'E-COMMERCE' ? 'active' : ''}
        onMouseEnter={() => setCursorText('FILTER')}
        onMouseLeave={() => setCursorText('')}
      >
        E-COMMERCE
      </button>
    </div>
  );
}

// Create a simplified ProjectGrid component
function ProjectGrid({ projects }) {
  const { setCursorText } = useCursor();
  
  return (
    <div data-testid="project-grid">
      {projects.map(project => (
        <div 
          key={project.id} 
          data-testid={`project-card-${project.id}`}
          onMouseEnter={() => setCursorText('VIEW')}
          onMouseLeave={() => setCursorText('')}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <span data-testid={`project-category-${project.id}`}>{project.category}</span>
        </div>
      ))}
    </div>
  );
}

// Create a parent component that manages state between the filter and grid
function ProjectsPageWithState() {
  const [filteredProjects, setFilteredProjects] = React.useState(mockProjects);
  const [activeFilter, setActiveFilter] = React.useState('ALL');
  
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    if (category === 'ALL') {
      setFilteredProjects(mockProjects);
    } else {
      setFilteredProjects(mockProjects.filter(p => p.category === category));
    }
  };
  
  return (
    <div data-testid="projects-container">
      <ProjectFilter onFilterChange={handleFilterChange} activeFilter={activeFilter} />
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
}

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

describe('Project Filter Data Flow Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders all projects by default', () => {
    render(<ProjectsPageWithState />);
    
    // Check that all projects are initially rendered
    mockProjects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('filters projects correctly when a category filter is clicked', async () => {
    render(<ProjectsPageWithState />);
    
    // Find and click the Web Development filter
    const webDevFilter = screen.getByTestId('filter-website');
    fireEvent.click(webDevFilter);
    
    // Check that only Web Development projects are visible
    const webDevProjects = mockProjects.filter(p => p.category === 'WEB DEVELOPMENT');
    const otherProjects = mockProjects.filter(p => p.category !== 'WEB DEVELOPMENT');
    
    // Web Development projects should be displayed
    await waitFor(() => {
      webDevProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });
    
    // Non-Web Development projects should not be displayed
    await waitFor(() => {
      otherProjects.forEach(project => {
        expect(screen.queryByText(project.title)).not.toBeInTheDocument();
      });
    });
  });

  it('displays all projects again when ALL filter is clicked after filtering', async () => {
    render(<ProjectsPageWithState />);
    
    // First filter by BRANDING
    const brandingFilter = screen.getByTestId('filter-branding');
    fireEvent.click(brandingFilter);
    
    // Then click ALL to reset filters
    const allFilter = screen.getByTestId('filter-all');
    fireEvent.click(allFilter);
    
    // Check all projects are visible again
    await waitFor(() => {
      mockProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });
  });

  it('updates activeFilter state which reflects in the UI with active class', async () => {
    render(<ProjectsPageWithState />);
    
    // By default, ALL filter should be active
    const allFilter = screen.getByTestId('filter-all');
    expect(allFilter).toHaveClass('active');
    
    // Click E-COMMERCE filter
    const ecommerceFilter = screen.getByTestId('filter-ecommerce');
    fireEvent.click(ecommerceFilter);
    
    // E-COMMERCE filter should now be active
    await waitFor(() => {
      expect(ecommerceFilter).toHaveClass('active');
      expect(allFilter).not.toHaveClass('active');
    });
  });

  it('updates cursor text when hovering over filter buttons', () => {
    render(<ProjectsPageWithState />);
    
    // Find a filter button
    const brandingFilter = screen.getByTestId('filter-branding');
    
    // Test mouse interactions
    fireEvent.mouseEnter(brandingFilter);
    expect(mockSetCursorText).toHaveBeenCalledWith('FILTER');
    
    fireEvent.mouseLeave(brandingFilter);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('updates cursor text when hovering over project cards', () => {
    render(<ProjectsPageWithState />);
    
    // Find a project card
    const projectCard = screen.getByTestId(`project-card-${mockProjects[0].id}`);
    
    // Test mouse interactions
    fireEvent.mouseEnter(projectCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(projectCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
}); 
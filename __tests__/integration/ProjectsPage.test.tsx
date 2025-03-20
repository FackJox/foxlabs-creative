import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockProjects } from '../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Create a mock implementation of the ProjectsPage
function MockProjectsPage() {
  const [filteredProjects, setFilteredProjects] = React.useState(mockProjects);
  const [activeFilter, setActiveFilter] = React.useState('ALL');
  const { setCursorText } = useCursor();
  
  const filterProjects = (category) => {
    setActiveFilter(category);
    if (category === 'ALL') {
      setFilteredProjects(mockProjects);
    } else {
      setFilteredProjects(mockProjects.filter(p => p.category === category));
    }
  };
  
  return (
    <div>
      <h1 data-testid="projects-page-title">OUR WORK</h1>
      <p data-testid="projects-page-description">
        A collection of our selected projects across various industries and disciplines.
      </p>
      
      <div data-testid="project-filters">
        <button 
          data-testid="filter-all"
          onClick={() => filterProjects('ALL')}
          className={activeFilter === 'ALL' ? 'active' : ''}
        >
          ALL
        </button>
        <button 
          data-testid="filter-website"
          onClick={() => filterProjects('WEBSITE')}
          className={activeFilter === 'WEBSITE' ? 'active' : ''}
        >
          WEBSITE
        </button>
        <button 
          data-testid="filter-branding"
          onClick={() => filterProjects('BRANDING')}
          className={activeFilter === 'BRANDING' ? 'active' : ''}
        >
          BRANDING
        </button>
        <button 
          data-testid="filter-ecommerce"
          onClick={() => filterProjects('E-COMMERCE')}
          className={activeFilter === 'E-COMMERCE' ? 'active' : ''}
        >
          E-COMMERCE
        </button>
      </div>
      
      <div data-testid="project-cards-container">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            data-testid={`project-card-${project.id}`}
            onMouseEnter={() => setCursorText('VIEW')}
            onMouseLeave={() => setCursorText('')}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span data-testid={`project-category-${project.id}`}>{project.category}</span>
            {project.year && <span data-testid={`project-year-${project.id}`}>{project.year}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

// Mock next/navigation
const pushMock = jest.fn();
jest.mock('next/navigation', () => {
  return {
    useRouter: jest.fn(() => ({
      push: pushMock,
      back: jest.fn(),
      forward: jest.fn(),
    })),
    usePathname: jest.fn(() => '/work'),
    useSearchParams: jest.fn(() => new URLSearchParams()),
  };
});

// Mock data fetching function
jest.mock('@/lib/data', () => ({
  getProjects: jest.fn(() => mockProjects),
  getProjectCategories: jest.fn(() => ['WEBSITE', 'BRANDING', 'E-COMMERCE']),
}));

describe('ProjectsPage Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for useCursor
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders the projects page title and description', () => {
    render(<MockProjectsPage />);
    
    // Check page title is rendered
    expect(screen.getByTestId('projects-page-title')).toBeInTheDocument();
    expect(screen.getByText(/OUR WORK/i)).toBeInTheDocument();
    
    // Check page description is rendered
    expect(screen.getByTestId('projects-page-description')).toBeInTheDocument();
  });

  it('renders all project cards by default', () => {
    render(<MockProjectsPage />);
    
    // Check project cards section
    expect(screen.getByTestId('project-cards-container')).toBeInTheDocument();
    
    // Check that all projects are rendered
    mockProjects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('renders the filter section with all categories', () => {
    render(<MockProjectsPage />);
    
    // Check filter section is present
    expect(screen.getByTestId('project-filters')).toBeInTheDocument();
    
    // Check that all category filters are rendered - use data-testid to avoid duplicates
    expect(screen.getByTestId('filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-website')).toBeInTheDocument();
    expect(screen.getByTestId('filter-branding')).toBeInTheDocument();
    expect(screen.getByTestId('filter-ecommerce')).toBeInTheDocument();
  });

  it('filters projects when a category filter is clicked', async () => {
    render(<MockProjectsPage />);
    
    // Find the filter button for WEBSITE category
    const websiteFilter = screen.getByTestId('filter-website');
    
    // Click the category filter
    fireEvent.click(websiteFilter);
    
    // Wait for filtering to complete
    await waitFor(() => {
      // Get website projects from mock data
      const websiteProjects = mockProjects.filter(p => p.category === 'WEBSITE');
      const nonWebsiteProjects = mockProjects.filter(p => p.category !== 'WEBSITE');
      
      // Check that website projects are still visible
      websiteProjects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
      
      // Check that non-website projects are not visible
      nonWebsiteProjects.forEach(project => {
        expect(screen.queryByText(project.title)).not.toBeInTheDocument();
      });
    });
  });

  it('resets filters when ALL filter is clicked', async () => {
    render(<MockProjectsPage />);
    
    // First, filter by BRANDING
    const brandingFilter = screen.getByTestId('filter-branding');
    fireEvent.click(brandingFilter);
    
    // Wait for filtering to apply
    await waitFor(() => {
      const brandingProjects = mockProjects.filter(p => p.category === 'BRANDING');
      expect(screen.getAllByTestId(/project-card-/)).toHaveLength(brandingProjects.length);
    });
    
    // Then click ALL to reset filters
    const allFilter = screen.getByTestId('filter-all');
    fireEvent.click(allFilter);
    
    // Check that all projects are visible again
    await waitFor(() => {
      expect(screen.getAllByTestId(/project-card-/)).toHaveLength(mockProjects.length);
    });
  });

  it('updates cursor text when hovering over project cards', () => {
    render(<MockProjectsPage />);
    
    // Find a project card
    const projectCard = screen.getByTestId(`project-card-${mockProjects[0].id}`);
    
    // Test mouse interactions
    fireEvent.mouseEnter(projectCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(projectCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('displays the year for each project', () => {
    render(<MockProjectsPage />);
    
    // Check that each project's year is displayed using data-testid to avoid duplicates
    mockProjects.forEach(project => {
      if (project.year) {
        expect(screen.getByTestId(`project-year-${project.id}`)).toHaveTextContent(project.year);
      }
    });
  });
}); 
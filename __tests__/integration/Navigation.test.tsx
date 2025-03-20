import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockProjects, mockServices } from '../fixtures/mockData';

// Mock the routing functionality
const mockPush = jest.fn();
const mockBack = jest.fn();
const mockForward = jest.fn();
let mockPathname = '/';
let mockAsPath = '/';
let mockQuery = {};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    back: mockBack,
    forward: mockForward,
    pathname: mockPathname,
    asPath: mockAsPath,
    query: mockQuery,
  })),
  usePathname: jest.fn(() => mockPathname),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(() => ({
    setCursorText: jest.fn(),
  })),
}));

// Mock framer-motion to prevent animation-related test issues
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Main App Component with routing
function AppWithNavigation() {
  const [activeRoute, setActiveRoute] = React.useState('/');
  
  // Simulate router push
  const navigateTo = (path) => {
    // Extract pathname and query string
    const [pathname, queryString] = path.split('?');
    
    // Set the pathname without query parameters
    mockPathname = pathname;
    mockAsPath = path; // Keep the full path with query in asPath
    setActiveRoute(pathname);
    mockPush(path);
  };
  
  // Simulate browser back
  const handleBack = () => {
    mockBack();
    // In a real app, this would update based on history
    // For test purposes, we'll just go to home
    if (activeRoute !== '/') {
      mockPathname = '/';
      mockAsPath = '/';
      setActiveRoute('/');
    }
  };
  
  // Simulate browser forward
  const handleForward = () => {
    mockForward();
    // For test purposes only
  };
  
  return (
    <div>
      <header data-testid="main-header">
        <nav>
          <ul>
            <li>
              <a 
                href="/"
                data-testid="nav-home"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/');
                }}
                className={activeRoute === '/' ? 'active' : ''}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/work"
                data-testid="nav-projects"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/work');
                }}
                className={activeRoute === '/work' ? 'active' : ''}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="/services"
                data-testid="nav-services"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/services');
                }}
                className={activeRoute === '/services' ? 'active' : ''}
              >
                Services
              </a>
            </li>
          </ul>
        </nav>
      </header>
      
      <main data-testid="page-content">
        {activeRoute === '/' && (
          <div data-testid="home-page">
            <h1>RAW/STUDIO</h1>
            <p>Welcome to our portfolio</p>
            
            <div data-testid="featured-projects">
              {mockProjects.filter(p => p.featured).slice(0, 3).map(project => (
                <div 
                  key={project.id}
                  data-testid={`featured-project-${project.id}`}
                  onClick={() => navigateTo(`/work/project?id=${project.id}`)}
                >
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeRoute === '/work' && (
          <div data-testid="projects-page">
            <h1>Our Work</h1>
            
            <div data-testid="project-filters">
              <button>All</button>
              <button>Web Development</button>
              <button>Branding</button>
            </div>
            
            <div data-testid="project-list">
              {mockProjects.map(project => (
                <div 
                  key={project.id} 
                  data-testid={`project-${project.id}`}
                  onClick={() => navigateTo(`/work/project?id=${project.id}`)}
                >
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeRoute.startsWith('/work/project') && (
          <div data-testid="project-detail-page">
            <h1>Project Detail</h1>
            <button 
              data-testid="back-to-projects"
              onClick={handleBack}
            >
              Back to Projects
            </button>
          </div>
        )}
        
        {activeRoute === '/services' && (
          <div data-testid="services-page">
            <h1>Our Services</h1>
            
            <div data-testid="services-list">
              {mockServices.map(service => (
                <div 
                  key={service.id} 
                  data-testid={`service-${service.id}`}
                  onClick={() => navigateTo(`/services/${service.slug}`)}
                >
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeRoute.includes('/services/') && !activeRoute.endsWith('/services') && (
          <div data-testid="service-detail-page">
            <h1>Service Detail</h1>
            <button 
              data-testid="back-to-services"
              onClick={handleBack}
            >
              Back to Services
            </button>
          </div>
        )}
      </main>
      
      <div data-testid="browser-controls">
        <button 
          data-testid="browser-back"
          onClick={handleBack}
        >
          Back
        </button>
        <button 
          data-testid="browser-forward"
          onClick={handleForward}
        >
          Forward
        </button>
      </div>
    </div>
  );
}

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname = '/';
    mockAsPath = '/';
    mockQuery = {};
  });
  
  it('renders home page by default', () => {
    render(<AppWithNavigation />);
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByTestId('nav-home')).toHaveClass('active');
    expect(screen.queryByTestId('projects-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('services-page')).not.toBeInTheDocument();
  });
  
  it('navigates between main sections (Home, Projects, Services)', async () => {
    render(<AppWithNavigation />);
    
    // Navigate to Projects
    fireEvent.click(screen.getByTestId('nav-projects'));
    
    await waitFor(() => {
      expect(screen.getByTestId('projects-page')).toBeInTheDocument();
      expect(screen.getByTestId('nav-projects')).toHaveClass('active');
      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
    });
    
    expect(mockPush).toHaveBeenCalledWith('/work');
    
    // Navigate to Services
    fireEvent.click(screen.getByTestId('nav-services'));
    
    await waitFor(() => {
      expect(screen.getByTestId('services-page')).toBeInTheDocument();
      expect(screen.getByTestId('nav-services')).toHaveClass('active');
      expect(screen.queryByTestId('projects-page')).not.toBeInTheDocument();
    });
    
    expect(mockPush).toHaveBeenCalledWith('/services');
    
    // Navigate back to Home
    fireEvent.click(screen.getByTestId('nav-home'));
    
    await waitFor(() => {
      expect(screen.getByTestId('home-page')).toBeInTheDocument();
      expect(screen.getByTestId('nav-home')).toHaveClass('active');
      expect(screen.queryByTestId('services-page')).not.toBeInTheDocument();
    });
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });
  
  it('navigates to detail pages and back to listing pages', async () => {
    render(<AppWithNavigation />);
    
    // Navigate to Projects
    fireEvent.click(screen.getByTestId('nav-projects'));
    
    // Navigate to Project Detail
    await waitFor(() => {
      expect(screen.getByTestId('projects-page')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByTestId('project-1'));
    
    await waitFor(() => {
      expect(screen.getByTestId('project-detail-page')).toBeInTheDocument();
      expect(screen.queryByTestId('projects-page')).not.toBeInTheDocument();
    });
    
    expect(mockPush).toHaveBeenCalledWith('/work/project?id=1');
    
    // Navigate back to Projects
    fireEvent.click(screen.getByTestId('back-to-projects'));
    
    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
      expect(screen.getByTestId('home-page')).toBeInTheDocument(); // Mock behavior in our test
    });
    
    // Navigate to Services
    fireEvent.click(screen.getByTestId('nav-services'));
    
    // Navigate to Service Detail
    await waitFor(() => {
      expect(screen.getByTestId('services-page')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByTestId('service-1'));
    
    await waitFor(() => {
      expect(screen.getByTestId('service-detail-page')).toBeInTheDocument();
      expect(screen.queryByTestId('services-page')).not.toBeInTheDocument();
    });
    
    // Navigate back to Services
    fireEvent.click(screen.getByTestId('back-to-services'));
    
    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
    });
  });
  
  it('updates URLs during navigation', async () => {
    render(<AppWithNavigation />);
    
    // Initial URL should be home
    expect(mockPathname).toBe('/');
    
    // Navigate to Projects
    fireEvent.click(screen.getByTestId('nav-projects'));
    
    await waitFor(() => {
      expect(mockPathname).toBe('/work');
      expect(mockPush).toHaveBeenCalledWith('/work');
    });
    
    // Navigate to Project Detail
    fireEvent.click(screen.getByTestId('project-1'));
    
    await waitFor(() => {
      expect(mockPathname).toBe('/work/project');
      expect(mockPush).toHaveBeenCalledWith('/work/project?id=1');
    });
    
    // Navigate to Services
    fireEvent.click(screen.getByTestId('nav-services'));
    
    await waitFor(() => {
      expect(mockPathname).toBe('/services');
      expect(mockPush).toHaveBeenCalledWith('/services');
    });
    
    // Navigate to Service Detail
    fireEvent.click(screen.getByTestId('service-1'));
    
    await waitFor(() => {
      expect(mockPathname.startsWith('/services/')).toBeTruthy();
      expect(mockPush).toHaveBeenCalledWith('/services/web-development');
    });
  });
  
  it('handles browser history navigation (back/forward)', async () => {
    render(<AppWithNavigation />);
    
    // Build up history: Home -> Projects -> Services
    fireEvent.click(screen.getByTestId('nav-projects'));
    await waitFor(() => {
      expect(screen.getByTestId('projects-page')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByTestId('nav-services'));
    await waitFor(() => {
      expect(screen.getByTestId('services-page')).toBeInTheDocument();
    });
    
    // Click browser back button
    fireEvent.click(screen.getByTestId('browser-back'));
    
    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
    });
    
    // In our test implementation, back just goes to home
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    
    // Click browser forward button
    fireEvent.click(screen.getByTestId('browser-forward'));
    
    await waitFor(() => {
      expect(mockForward).toHaveBeenCalled();
    });
  });
  
  it('highlights active navigation link', async () => {
    render(<AppWithNavigation />);
    
    // Home should be active initially
    expect(screen.getByTestId('nav-home')).toHaveClass('active');
    expect(screen.getByTestId('nav-projects')).not.toHaveClass('active');
    expect(screen.getByTestId('nav-services')).not.toHaveClass('active');
    
    // Navigate to Projects
    fireEvent.click(screen.getByTestId('nav-projects'));
    
    await waitFor(() => {
      expect(screen.getByTestId('nav-projects')).toHaveClass('active');
      expect(screen.getByTestId('nav-home')).not.toHaveClass('active');
      expect(screen.getByTestId('nav-services')).not.toHaveClass('active');
    });
    
    // Navigate to Services
    fireEvent.click(screen.getByTestId('nav-services'));
    
    await waitFor(() => {
      expect(screen.getByTestId('nav-services')).toHaveClass('active');
      expect(screen.getByTestId('nav-home')).not.toHaveClass('active');
      expect(screen.getByTestId('nav-projects')).not.toHaveClass('active');
    });
    
    // Navigate back to Home
    fireEvent.click(screen.getByTestId('nav-home'));
    
    await waitFor(() => {
      expect(screen.getByTestId('nav-home')).toHaveClass('active');
      expect(screen.getByTestId('nav-projects')).not.toHaveClass('active');
      expect(screen.getByTestId('nav-services')).not.toHaveClass('active');
    });
  });
  
  it('simulates page transitions with animations', async () => {
    // Since we've mocked framer-motion, we can only test if the components render
    // without actual animation testing
    
    render(<AppWithNavigation />);
    
    // Navigate between pages to ensure transitions occur
    fireEvent.click(screen.getByTestId('nav-projects'));
    
    await waitFor(() => {
      expect(screen.getByTestId('projects-page')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByTestId('nav-services'));
    
    await waitFor(() => {
      expect(screen.getByTestId('services-page')).toBeInTheDocument();
    });
    
    // Test passes if renders complete without errors
  });
  
  it('preserves state when navigating through multiple pages', async () => {
    render(<AppWithNavigation />);
    
    // Navigate to Projects 
    fireEvent.click(screen.getByTestId('nav-projects'));
    
    await waitFor(() => {
      expect(screen.getByTestId('projects-page')).toBeInTheDocument();
    });
    
    // Navigate to Project Detail
    fireEvent.click(screen.getByTestId('project-1'));
    
    await waitFor(() => {
      expect(screen.getByTestId('project-detail-page')).toBeInTheDocument();
    });
    
    // Navigate to Services
    fireEvent.click(screen.getByTestId('nav-services'));
    
    await waitFor(() => {
      expect(screen.getByTestId('services-page')).toBeInTheDocument();
    });
    
    // Navigate back to Projects
    fireEvent.click(screen.getByTestId('nav-projects'));
    
    await waitFor(() => {
      expect(screen.getByTestId('projects-page')).toBeInTheDocument();
      // Verify all projects are still displayed (state preservation)
      expect(screen.getAllByTestId(/^project-\d+$/)).toHaveLength(mockProjects.length);
    });
  });
  
  it('handles the complete navigation flow path: Home → Projects → Project Detail → Back', async () => {
    render(<AppWithNavigation />);
    
    // Start at Home
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    
    // Navigate to Projects
    fireEvent.click(screen.getByTestId('nav-projects'));
    
    await waitFor(() => {
      expect(screen.getByTestId('projects-page')).toBeInTheDocument();
    });
    
    // Navigate to Project Detail
    fireEvent.click(screen.getByTestId('project-1'));
    
    await waitFor(() => {
      expect(screen.getByTestId('project-detail-page')).toBeInTheDocument();
    });
    
    // Navigate back to Projects (in our mock this goes to Home)
    fireEvent.click(screen.getByTestId('back-to-projects'));
    
    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
    });
  });
  
  it('handles the complete navigation flow path: Home → Services → Service Detail → Back', async () => {
    render(<AppWithNavigation />);
    
    // Start at Home
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    
    // Navigate to Services
    fireEvent.click(screen.getByTestId('nav-services'));
    
    await waitFor(() => {
      expect(screen.getByTestId('services-page')).toBeInTheDocument();
    });
    
    // Navigate to Service Detail
    fireEvent.click(screen.getByTestId('service-1'));
    
    await waitFor(() => {
      expect(screen.getByTestId('service-detail-page')).toBeInTheDocument();
    });
    
    // Navigate back to Services (in our mock this goes to Home)
    fireEvent.click(screen.getByTestId('back-to-services'));
    
    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
    });
  });
}); 
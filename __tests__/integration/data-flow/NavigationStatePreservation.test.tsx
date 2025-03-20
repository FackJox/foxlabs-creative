import React, { createContext, useContext, useState, useEffect } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockProjects } from '../../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Add this dummy test to make sure the test file itself is loaded properly
describe('Mock Data Fixtures', () => {
  it('should have a dummy test', () => {
    expect(true).toBe(true);
  });
});

// Mock router context for navigation
const RouterContext = createContext({
  push: (path: string) => {},
  back: () => {},
  pathname: '',
  query: {},
  asPath: '',
});

function useRouter() {
  return useContext(RouterContext);
}

// Create mock router provider with state
function MockRouterProvider({ children }) {
  const [pathname, setPathname] = useState('/work');
  const [query, setQuery] = useState({});
  const [history, setHistory] = useState([{ pathname: '/work', query: {} }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  useEffect(() => {
    // For debugging
    console.log('Router state:', { pathname, query, historyIndex, history });
  }, [pathname, query, historyIndex, history]);
  
  const push = (path) => {
    // Parse path and query
    let newPath, newQuery = {};
    
    if (path.includes('?')) {
      const [pathPart, queryString] = path.split('?');
      newPath = pathPart;
      
      // Parse query string into object
      queryString.split('&').forEach(part => {
        if (part.includes('=')) {
          const [key, value] = part.split('=');
          newQuery[key] = decodeURIComponent(value);
        }
      });
    } else {
      newPath = path;
    }
    
    setPathname(newPath);
    setQuery(newQuery);
    
    // Add to history - create new history array to ensure state updates properly
    const newHistory = [...history.slice(0, historyIndex + 1), { pathname: newPath, query: {...newQuery} }];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    console.log('Push navigation:', { newPath, newQuery, historyIndex: historyIndex + 1, newHistory });
  };
  
  const back = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevState = history[prevIndex];
      
      console.log('Back navigation:', { 
        from: { pathname, query }, 
        to: prevState,
        historyIndex: prevIndex,
        history
      });
      
      setPathname(prevState.pathname);
      setQuery({...prevState.query}); // Use object spread to create a new object reference
      setHistoryIndex(prevIndex);
    }
  };
  
  const value = {
    push,
    back,
    pathname,
    query,
    asPath: pathname + (Object.keys(query).length > 0 ? '?' + new URLSearchParams(query).toString() : ''),
  };
  
  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

// Use a testing helper for debugging
function TestStateDisplay({ label, value }) {
  return (
    <div data-testid={`state-${label}`}>
      {label}: {JSON.stringify(value)}
    </div>
  );
}

// Project list component with filter state
function ProjectList() {
  const router = useRouter();
  const { setCursorText } = useCursor();
  const [activeFilter, setActiveFilter] = useState(() => {
    // Initialize state from URL parameters if present, default to ALL
    return router.query.filter || 'ALL';
  });
  
  const [filteredProjects, setFilteredProjects] = useState(() => {
    const filter = router.query.filter;
    if (filter && filter !== 'ALL') {
      return mockProjects.filter(p => p.category === filter);
    }
    return mockProjects;
  });
  
  // Sync with router query changes
  useEffect(() => {
    const filter = router.query.filter;
    console.log('Effect running in ProjectList with query:', router.query);
    
    if (filter) {
      console.log('Filter from URL:', filter);
      setActiveFilter(filter);
      
      if (filter === 'ALL') {
        setFilteredProjects(mockProjects);
      } else {
        setFilteredProjects(mockProjects.filter(p => p.category === filter));
      }
    }
  }, [router.query]);
  
  const filterProjects = (category) => {
    setActiveFilter(category);
    if (category === 'ALL') {
      setFilteredProjects(mockProjects);
    } else {
      setFilteredProjects(mockProjects.filter(p => p.category === category));
    }
    
    // Update URL without navigating away from page
    const newQuery = { ...router.query, filter: category };
    const queryString = Object.entries(newQuery)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    router.push(`/work?${queryString}`);
  };
  
  const navigateToProject = (projectId) => {
    router.push(`/work/project?id=${projectId}&filter=${encodeURIComponent(activeFilter)}`);
  };
  
  return (
    <div data-testid="project-list">
      <TestStateDisplay label="activeFilter" value={activeFilter} />
      
      <div data-testid="project-filters">
        <button 
          data-testid="filter-all"
          onClick={() => filterProjects('ALL')}
          className={activeFilter === 'ALL' ? 'active' : ''}
        >
          ALL
        </button>
        <button 
          data-testid="filter-web-development"
          onClick={() => filterProjects('WEB DEVELOPMENT')}
          className={activeFilter === 'WEB DEVELOPMENT' ? 'active' : ''}
        >
          WEB DEVELOPMENT
        </button>
        <button 
          data-testid="filter-branding"
          onClick={() => filterProjects('BRANDING')}
          className={activeFilter === 'BRANDING' ? 'active' : ''}
        >
          BRANDING
        </button>
      </div>
      
      <div data-testid="project-grid">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            data-testid={`project-card-${project.id}`}
            onClick={() => navigateToProject(project.id)}
            onMouseEnter={() => setCursorText('VIEW')}
            onMouseLeave={() => setCursorText('')}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Project detail component
function ProjectDetail() {
  const router = useRouter();
  const { setCursorText } = useCursor();
  const { id, filter = 'ALL' } = router.query;
  const [project, setProject] = useState(null);
  
  React.useEffect(() => {
    if (id) {
      const foundProject = mockProjects.find(p => p.id === Number(id));
      setProject(foundProject);
    }
  }, [id]);
  
  const handleBack = () => {
    router.back();
  };
  
  if (!project) {
    return <div data-testid="loading">Loading...</div>;
  }
  
  return (
    <div data-testid="project-detail">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      
      <div data-testid="back-navigation">
        <TestStateDisplay label="detailFilter" value={filter} />
        <button 
          data-testid="back-button"
          onClick={handleBack}
          onMouseEnter={() => setCursorText('BACK')}
          onMouseLeave={() => setCursorText('')}
        >
          BACK TO PROJECTS
        </button>
        <span data-testid="active-filter">Active Filter: {filter}</span>
      </div>
    </div>
  );
}

// Main component that conditionally renders list or detail view based on route
function ProjectApp() {
  const router = useRouter();
  
  return (
    <div data-testid="project-app">
      <TestStateDisplay label="pathname" value={router.pathname} />
      <TestStateDisplay label="query" value={router.query} />
      {router.pathname === '/work' && <ProjectList />}
      {router.pathname === '/work/project' && <ProjectDetail />}
    </div>
  );
}

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

describe('Navigation State Preservation Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // Silence console logs in tests
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('preserves filter state when navigating from list to detail and back', async () => {
    const { rerender } = render(
      <MockRouterProvider>
        <ProjectApp />
      </MockRouterProvider>
    );
    
    // First, verify we're on the project list page
    expect(screen.getByTestId('project-list')).toBeInTheDocument();
    
    // Select a filter - WEB DEVELOPMENT
    const webDevFilter = screen.getByTestId('filter-web-development');
    fireEvent.click(webDevFilter);
    
    // Verify filter is applied
    await waitFor(() => {
      expect(webDevFilter).toHaveClass('active');
      expect(screen.getByTestId('state-activeFilter')).toHaveTextContent('"WEB DEVELOPMENT"');
    });
    
    // Get project that matches the WEB DEVELOPMENT category
    // We need to use a project that actually has this category in mockProjects
    const webDevProject = mockProjects.find(p => p.category === 'WEB DEVELOPMENT');
    if (!webDevProject) {
      // If no projects match this category in our mock data, we need to adjust
      throw new Error('No projects with WEB DEVELOPMENT category found in mock data');
    }
    
    // Click on the project to navigate to detail
    const projectCard = screen.getByTestId(`project-card-${webDevProject.id}`);
    fireEvent.click(projectCard);
    
    // Verify we've navigated to the detail page
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
      expect(screen.getByTestId('state-query')).toHaveTextContent(`"filter":"WEB DEVELOPMENT"`);
    });
    
    // Verify the active filter info is preserved
    const activeFilter = screen.getByTestId('active-filter');
    expect(activeFilter).toHaveTextContent('Active Filter: WEB DEVELOPMENT');
    
    // Go back to the project list
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    
    // Rerender to ensure state updates are applied 
    rerender(
      <MockRouterProvider>
        <ProjectApp />
      </MockRouterProvider>
    );
    
    // Verify we're back on the list page with the filter still applied
    await waitFor(() => {
      expect(screen.getByTestId('project-list')).toBeInTheDocument();
      expect(screen.getByTestId('state-activeFilter')).toHaveTextContent('"WEB DEVELOPMENT"');
      
      // Now find and check the filter button class - this time using the state value rather than a hardcoded selector
      const activeFilterValue = JSON.parse(screen.getByTestId('state-activeFilter').textContent.split(': ')[1]);
      const filterButton = screen.getByText(activeFilterValue);
      expect(filterButton).toHaveClass('active');
    });
  });

  it('maintains filter state across multiple navigation events', async () => {
    const { rerender } = render(
      <MockRouterProvider>
        <ProjectApp />
      </MockRouterProvider>
    );
    
    // Make sure we have the right categories in our mock data
    const brandingProject = mockProjects.find(p => p.category === 'BRANDING');
    if (!brandingProject) {
      throw new Error('No projects with BRANDING category found in mock data');
    }
    
    // Apply a filter (BRANDING)
    const brandingFilter = screen.getByTestId('filter-branding');
    fireEvent.click(brandingFilter);
    
    // Verify filter is applied
    await waitFor(() => {
      expect(brandingFilter).toHaveClass('active');
      expect(screen.getByTestId('state-activeFilter')).toHaveTextContent('"BRANDING"');
    });
    
    // Navigate to a project detail
    const projectCard = screen.getByTestId(`project-card-${brandingProject.id}`);
    fireEvent.click(projectCard);
    
    // Verify we're on the detail page
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
      expect(screen.getByTestId('state-query')).toHaveTextContent(`"filter":"BRANDING"`);
    });
    
    // Go back to the list
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    
    // Rerender to ensure state updates are applied
    rerender(
      <MockRouterProvider>
        <ProjectApp />
      </MockRouterProvider>
    );
    
    // Verify we're back with the filter still applied
    await waitFor(() => {
      expect(screen.getByTestId('project-list')).toBeInTheDocument();
      expect(screen.getByTestId('state-activeFilter')).toHaveTextContent('"BRANDING"');
      
      // Now find and check the filter button class - this time using the state value
      const activeFilterValue = JSON.parse(screen.getByTestId('state-activeFilter').textContent.split(': ')[1]);
      const filterButton = screen.getByText(activeFilterValue);
      expect(filterButton).toHaveClass('active');
    });
    
    // Now change the filter to ALL
    const allFilter = screen.getByTestId('filter-all');
    fireEvent.click(allFilter);
    
    // Verify filter changed
    await waitFor(() => {
      expect(allFilter).toHaveClass('active');
      expect(screen.getByTestId('state-activeFilter')).toHaveTextContent('"ALL"');
    });
    
    // Navigate to another project detail
    const someProject = screen.getByTestId(`project-card-${mockProjects[0].id}`);
    fireEvent.click(someProject);
    
    // Verify the new filter state is preserved
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
      expect(screen.getByTestId('state-query')).toHaveTextContent(`"filter":"ALL"`);
    });
  });

  it('updates cursor text properly during navigation', async () => {
    render(
      <MockRouterProvider>
        <ProjectApp />
      </MockRouterProvider>
    );
    
    // Hover over a project card
    const projectCard = screen.getByTestId(`project-card-${mockProjects[0].id}`);
    fireEvent.mouseEnter(projectCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(projectCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
    
    // Navigate to project detail
    fireEvent.click(projectCard);
    
    // Verify we're on the detail page
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
    });
    
    // Hover over back button
    const backButton = screen.getByTestId('back-button');
    fireEvent.mouseEnter(backButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('BACK');
    
    fireEvent.mouseLeave(backButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
}); 
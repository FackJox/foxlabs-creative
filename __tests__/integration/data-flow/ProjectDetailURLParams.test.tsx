import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockProjects } from '../../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Mock the useSearchParams and useRouter functionality
function createMockRouter() {
  const router = {
    push: jest.fn(),
    back: jest.fn(),
    pathname: '/work',
    query: {},
  };
  return router;
}

// Simple component that uses URL parameters to display project details
function ProjectDetailWithURLParams({ router }) {
  const [project, setProject] = React.useState(null);
  const { setCursorText } = useCursor();
  
  // Simulate retrieving project ID from URL parameters
  React.useEffect(() => {
    const projectId = router.query.id;
    if (projectId) {
      const foundProject = mockProjects.find(p => p.id === Number(projectId));
      setProject(foundProject);
    }
  }, [router.query.id]);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleViewNextProject = () => {
    if (project) {
      const currentIndex = mockProjects.findIndex(p => p.id === project.id);
      const nextIndex = (currentIndex + 1) % mockProjects.length;
      const nextProject = mockProjects[nextIndex];
      
      router.push(`/work?id=${nextProject.id}`);
    }
  };
  
  if (!project) {
    return <div data-testid="loading">Loading...</div>;
  }
  
  return (
    <div data-testid="project-detail">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <div data-testid="project-metadata">
        <span data-testid="project-category">{project.category}</span>
        <span data-testid="project-year">{project.year}</span>
      </div>
      
      <button 
        data-testid="back-button"
        onClick={handleBack}
        onMouseEnter={() => setCursorText('BACK')}
        onMouseLeave={() => setCursorText('')}
      >
        BACK TO PROJECTS
      </button>
      
      <button 
        data-testid="next-project-button"
        onClick={handleViewNextProject}
        onMouseEnter={() => setCursorText('NEXT')}
        onMouseLeave={() => setCursorText('')}
      >
        NEXT PROJECT
      </button>
    </div>
  );
}

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

describe('Project Detail URL Parameters Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders loading state when no project ID is in URL parameters', () => {
    const router = createMockRouter();
    render(<ProjectDetailWithURLParams router={router} />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('loads and displays the correct project based on URL parameter', async () => {
    const router = createMockRouter();
    
    // Set project ID in URL parameters
    router.query.id = '1';
    
    render(<ProjectDetailWithURLParams router={router} />);
    
    // Find the expected project based on ID
    const expectedProject = mockProjects.find(p => p.id === 1);
    
    // Verify project details are displayed correctly
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
      expect(screen.getByText(expectedProject.title)).toBeInTheDocument();
      expect(screen.getByText(expectedProject.description)).toBeInTheDocument();
      expect(screen.getByTestId('project-category')).toHaveTextContent(expectedProject.category);
      expect(screen.getByTestId('project-year')).toHaveTextContent(expectedProject.year);
    });
  });

  it('navigates to the next project when the next button is clicked', async () => {
    const router = createMockRouter();
    
    // Start with project ID 1
    router.query.id = '1';
    
    const { rerender } = render(<ProjectDetailWithURLParams router={router} />);
    
    // Click the next project button
    await waitFor(() => {
      const nextButton = screen.getByTestId('next-project-button');
      fireEvent.click(nextButton);
    });
    
    // Verify router.push was called with the URL for the next project
    expect(router.push).toHaveBeenCalledWith('/work?id=2');
    
    // Update the router query to simulate the URL change
    router.query.id = '2';
    
    // Re-render the component with the updated router
    rerender(<ProjectDetailWithURLParams router={router} />);
    
    // Get the expected next project
    const nextProject = mockProjects.find(p => p.id === 2);
    
    // Verify the next project is now displayed
    await waitFor(() => {
      expect(screen.getByText(nextProject.title)).toBeInTheDocument();
      expect(screen.getByText(nextProject.description)).toBeInTheDocument();
    });
  });

  it('calls router.back when the back button is clicked', async () => {
    const router = createMockRouter();
    router.query.id = '1';
    
    render(<ProjectDetailWithURLParams router={router} />);
    
    // Wait for the component to render with project data
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
    });
    
    // Click the back button
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    
    // Verify router.back was called
    expect(router.back).toHaveBeenCalled();
  });

  it('updates cursor text when hovering over navigation buttons', async () => {
    const router = createMockRouter();
    router.query.id = '1';
    
    render(<ProjectDetailWithURLParams router={router} />);
    
    // Wait for the component to render with project data
    await waitFor(() => {
      expect(screen.getByTestId('project-detail')).toBeInTheDocument();
    });
    
    // Test mouse interactions with the back button
    const backButton = screen.getByTestId('back-button');
    fireEvent.mouseEnter(backButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('BACK');
    
    fireEvent.mouseLeave(backButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
    
    // Test mouse interactions with the next button
    const nextButton = screen.getByTestId('next-project-button');
    fireEvent.mouseEnter(nextButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('NEXT');
    
    fireEvent.mouseLeave(nextButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
  
  it('handles non-existent project IDs gracefully', async () => {
    const router = createMockRouter();
    
    // Set non-existent project ID
    router.query.id = '999';
    
    render(<ProjectDetailWithURLParams router={router} />);
    
    // Should show loading state since no project would be found
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
}); 
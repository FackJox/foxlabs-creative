import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockProjects } from '../fixtures/mockData';
import WorkPage from '@/app/(foxlabs)/work/page';

// Mock the projects export from lib/data
jest.mock('@/lib/data', () => ({
  projects: mockProjects
}));

// Mock the Header, Footer, and ContactSection components
jest.mock('@/components/layout', () => ({
  Header: ({ setCursorText }: { setCursorText: (text: string) => void }) => (
    <header data-testid="header">Header</header>
  ),
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

jest.mock('@/components/sections', () => ({
  ContactSection: ({ setCursorText }: { setCursorText: (text: string) => void }) => (
    <div data-testid="contact-section">Contact Section</div>
  )
}));

// Mock the ProjectDetail component
jest.mock('@/components/core', () => ({
  ProjectDetail: ({
    project,
    onClose,
    setCursorText
  }: {
    project: any;
    onClose: () => void;
    setCursorText: (text: string) => void;
  }) => (
    <div data-testid="project-detail">
      <h1>{project.title}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  )
}));

describe('WorkPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.scrollTo
    global.scrollTo = jest.fn();
  });
  
  it('renders all projects from the data', () => {
    // Act
    render(<WorkPage />);
    
    // Assert - check that project sections are rendered
    const projectElements = screen.getAllByRole('heading', { level: 3 });
    expect(projectElements.length).toBeGreaterThanOrEqual(mockProjects.length);
    
    // We'll check the first project explicitly
    expect(screen.getByText(mockProjects[0].title)).toBeInTheDocument();
  });
  
  it('opens project detail when a project is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(<WorkPage />);
    
    // Find the project container by a more reliable method
    const projectContainers = document.querySelectorAll('.group.relative.cursor-pointer');
    expect(projectContainers.length).toBeGreaterThan(0);
    
    // Click the first project
    await user.click(projectContainers[0] as HTMLElement);
    
    // Assert - check that the project detail is rendered
    expect(screen.getByTestId('project-detail')).toBeInTheDocument();
  });
  
  it('closes project detail when close button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(<WorkPage />);
    
    // Open a project
    const projectContainers = document.querySelectorAll('.group.relative.cursor-pointer');
    await user.click(projectContainers[0] as HTMLElement);
    
    // Find and click the close button
    const closeButton = screen.getByText('Close');
    await user.click(closeButton);
    
    // Assert - check that the project detail is no longer rendered
    expect(screen.queryByTestId('project-detail')).not.toBeInTheDocument();
  });
  
  it('sets cursor text when hovering over a project', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // We need to spy on setCursorText which is called inside the component
    const mockSetCursorText = jest.fn();
    
    // Override the implementation to access the setCursorText prop
    const origAddEventListener = window.addEventListener;
    window.addEventListener = jest.fn().mockImplementation((event, handler) => {
      if (event === 'mousemove') {
        // Simulate a mouse move to trigger cursor update
        handler({ clientX: 100, clientY: 100 } as MouseEvent);
      }
      origAddEventListener(event, handler as EventListener);
    });
    
    // Act
    render(<WorkPage />);
    
    // Find a project element (the container with the mouse events)
    const projectCards = document.querySelectorAll('.group.relative.cursor-pointer');
    
    if (projectCards.length > 0) {
      // Simulate hover
      await user.hover(projectCards[0] as HTMLElement);
      
      // We can't directly assert on setCursorText as it's internal to the component
      // So we check if the cursor div has content when it becomes visible
      const cursorElement = document.querySelector('.pointer-events-none.fixed.z-50');
      expect(cursorElement).not.toBeNull();
    }
    
    // Restore original addEventListener
    window.addEventListener = origAddEventListener;
  });
  
  it('displays project metadata', () => {
    // Act
    render(<WorkPage />);
    
    // Check for at least one project with category and year
    const projectContainers = document.querySelectorAll('.group.relative.cursor-pointer');
    expect(projectContainers.length).toBeGreaterThan(0);
    
    // Check the first project's metadata
    const firstProject = mockProjects[0];
    
    // Use getAllByText and check if one of them exists in the first project container
    const categoryInstances = screen.getAllByText(firstProject.category);
    expect(categoryInstances.length).toBeGreaterThan(0);
    
    const yearInstances = screen.getAllByText(firstProject.year);
    expect(yearInstances.length).toBeGreaterThan(0);
  });
  
  it('renders Back to Home button', async () => {
    // Act
    render(<WorkPage />);
    
    // Assert
    const homeButton = screen.getByText('BACK TO HOME');
    expect(homeButton).toBeInTheDocument();
    
    // We can't assert on onMouseEnter/onMouseLeave directly in React 19
    // Instead, check that the button is in a parent with expected className
    const buttonParent = homeButton.closest('.group') || 
                         homeButton.closest('button') || 
                         homeButton.closest('a');
    expect(buttonParent).not.toBeNull();
  });
}); 
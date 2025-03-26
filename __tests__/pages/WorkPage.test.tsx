import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockProjects } from '../fixtures/mockData';
import WorkPage from '@/app/(foxlabs)/work/page';
import { CursorProvider } from '../test-utils/cursor-provider-mock';

// Mock the projects export from lib/data
jest.mock('@/lib/data', () => ({
  projects: mockProjects
}));

// Mock the custom cursor component
jest.mock('@/components/effects/custom-cursor', () => ({
  __esModule: true,
  default: () => <div data-testid="custom-cursor">Custom Cursor</div>
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
  ),
  ProjectCard: ({ 
    project, 
    index, 
    detailed,
    onClick 
  }: { 
    project: any; 
    index: number; 
    detailed?: boolean;
    onClick?: () => void;
  }) => (
    <div 
      className="group relative cursor-pointer" 
      data-testid="project-card"
      onClick={onClick}
    >
      <h3>{project.title}</h3>
      <div>
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      {detailed && <p>{project.description}</p>}
    </div>
  )
}));

// Create a custom wrapper component that includes the CursorProvider
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <CursorProvider>{children}</CursorProvider>
);

describe('WorkPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.scrollTo
    global.scrollTo = jest.fn();
  });
  
  it('renders all projects from the data', () => {
    // Act
    render(<WorkPage />, { wrapper: Wrapper });
    
    // Assert - check that project sections are rendered
    const projectElements = screen.getAllByTestId('project-card');
    expect(projectElements.length).toBeGreaterThanOrEqual(mockProjects.length);
    
    // We'll check the first project explicitly
    expect(screen.getByText(mockProjects[0].title)).toBeInTheDocument();
  });
  
  it('opens project detail when a project is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(<WorkPage />, { wrapper: Wrapper });
    
    // Find the project container by test ID
    const projectContainers = screen.getAllByTestId('project-card');
    expect(projectContainers.length).toBeGreaterThan(0);
    
    // Click the first project
    await user.click(projectContainers[0]);
    
    // Assert - check that the project detail is rendered
    expect(screen.getByTestId('project-detail')).toBeInTheDocument();
  });
  
  it('closes project detail when close button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(<WorkPage />, { wrapper: Wrapper });
    
    // Open a project
    const projectContainers = screen.getAllByTestId('project-card');
    await user.click(projectContainers[0]);
    
    // Find and click the close button
    const closeButton = screen.getByText('Close');
    await user.click(closeButton);
    
    // Assert - check that the project detail is no longer rendered
    expect(screen.queryByTestId('project-detail')).not.toBeInTheDocument();
  });
  
  it('sets cursor text when hovering over a project', async () => {
    // Arrange
    const user = userEvent.setup();
    
    // Act
    render(<WorkPage />, { wrapper: Wrapper });
    
    // Find a project element by test ID
    const projectCards = screen.getAllByTestId('project-card');
    expect(projectCards.length).toBeGreaterThan(0);
    
    // Simulate hover
    await user.hover(projectCards[0]);
    
    // We're just testing that the hover doesn't throw an error
    // The actual cursor text setting is tested in the useCursor hook tests
  });
  
  it('displays project metadata', () => {
    // Render the component
    render(<WorkPage />, { wrapper: Wrapper });
    
    // Get the first project from our mock data
    const firstProject = mockProjects[0];
    
    // Use getAllByText and check if one of them exists
    const categoryElements = screen.getAllByText(firstProject.category);
    expect(categoryElements.length).toBeGreaterThan(0);
    expect(screen.getByText(firstProject.year)).toBeInTheDocument();
  });
  
  it('renders Back to Home button', async () => {
    // Act
    render(<WorkPage />, { wrapper: Wrapper });
    
    // Assert
    const homeButton = screen.getByText('BACK TO HOME');
    expect(homeButton).toBeInTheDocument();
  });
}); 
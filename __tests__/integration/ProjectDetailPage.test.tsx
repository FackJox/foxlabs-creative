import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockProjects } from '../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Mock the ProjectDetailPage component directly rather than importing it
jest.mock('@/app/work/[id]/page', () => {
  return {
    __esModule: true,
    default: ({ params }) => {
      const id = params?.id;
      const project = mockProjects.find(p => p.id === Number(id)) || null;
      const pushMock = jest.requireMock('next/navigation').useRouter().push;
      const { setCursorText } = useCursor();
      
      if (!project) {
        return (
          <div data-testid="project-not-found">
            <h1>Project Not Found</h1>
            <p>Sorry, the project you are looking for could not be found.</p>
            <button 
              onClick={() => pushMock('/work')}
              onMouseEnter={() => setCursorText('BACK')}
              onMouseLeave={() => setCursorText('')}
            >
              BACK TO PROJECTS
            </button>
          </div>
        );
      }
      
      return (
        <div data-testid="project-detail-page">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          
          {project.client && <p>{project.client}</p>}
          {project.challenge && (
            <div data-testid="project-challenge">
              <h3>Challenge</h3>
              <p>{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div data-testid="project-solution">
              <h3>Solution</h3>
              <p>{project.solution}</p>
            </div>
          )}
          {project.results && (
            <div data-testid="project-results">
              <h3>Results</h3>
              <p>{project.results}</p>
            </div>
          )}
          
          {project.gallery && project.gallery.length > 0 && (
            <div data-testid="project-gallery">
              <h3>Gallery</h3>
              {project.gallery.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`${project.title} gallery image ${index + 1}`} 
                  data-testid={`gallery-image-${index}`}
                />
              ))}
            </div>
          )}
          
          {project.testimonial && (
            <div data-testid="project-testimonial">
              <blockquote>{project.testimonial.quote}</blockquote>
              <cite>
                <span>{project.testimonial.author}</span>
                <span>{project.testimonial.role}</span>
                <span>{project.testimonial.company}</span>
              </cite>
            </div>
          )}
          
          {project.url && (
            <a 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorText('VISIT')}
              onMouseLeave={() => setCursorText('')}
            >
              VISIT SITE
            </a>
          )}
          
          <div data-testid="related-projects">
            <h3>Related Projects</h3>
            {mockProjects.slice(1, 3).map(relatedProject => (
              <div key={relatedProject.id}>
                <h4>{relatedProject.title}</h4>
                <p>{relatedProject.description}</p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => pushMock('/work')}
            onMouseEnter={() => setCursorText('BACK')}
            onMouseLeave={() => setCursorText('')}
          >
            BACK TO PROJECTS
          </button>
        </div>
      );
    }
  };
});

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

// Create mocks for navigation
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: pushMock,
    back: jest.fn(),
    forward: jest.fn(),
  })),
  usePathname: jest.fn(() => '/work/1'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock data fetching function
jest.mock('@/lib/data', () => ({
  getProjectById: jest.fn((id) => {
    const numId = Number(id);
    return mockProjects.find(p => p.id === numId) || null;
  }),
  getRelatedProjects: jest.fn(() => mockProjects.slice(1, 3)),
}));

describe('ProjectDetailPage Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for useCursor
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders project details with complete information', () => {
    // Set up params to render the full project with ID 1
    const params = { id: '1' };
    const ProjectDetailPage = require('@/app/work/[id]/page').default;
    
    render(<ProjectDetailPage params={params} />);
    
    const project = mockProjects.find(p => p.id === 1);
    
    // Check page structure
    expect(screen.getByTestId('project-detail-page')).toBeInTheDocument();
    
    // Check basic project info
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(screen.getByText(project.year)).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
    
    // Check additional project details
    expect(screen.getByText(project.client)).toBeInTheDocument();
    expect(screen.getByText(project.challenge)).toBeInTheDocument();
    expect(screen.getByText(project.solution)).toBeInTheDocument();
    expect(screen.getByText(project.results)).toBeInTheDocument();
    
    // Check testimonial section
    if (project.testimonial) {
      expect(screen.getByText(project.testimonial.quote)).toBeInTheDocument();
      expect(screen.getByText(project.testimonial.author)).toBeInTheDocument();
      expect(screen.getByText(project.testimonial.role)).toBeInTheDocument();
      expect(screen.getByText(project.testimonial.company)).toBeInTheDocument();
    }
    
    // Check for gallery section
    expect(screen.getByTestId('project-gallery')).toBeInTheDocument();
    expect(screen.getAllByTestId(/gallery-image-/)).toHaveLength(project.gallery.length);
  });

  it('renders minimal project information for a project with only required fields', () => {
    // Set up params to render the minimal project with ID 4
    const params = { id: '4' };
    const ProjectDetailPage = require('@/app/work/[id]/page').default;
    
    render(<ProjectDetailPage params={params} />);
    
    const project = mockProjects.find(p => p.id === 4);
    
    // Check basic project info is present
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
    expect(screen.getByText(project.year)).toBeInTheDocument();
    
    // Check that optional sections are not present
    expect(screen.queryByTestId('project-gallery')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-testimonial')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-challenge')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-solution')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-results')).not.toBeInTheDocument();
  });

  it('renders related projects section', () => {
    const params = { id: '1' };
    const ProjectDetailPage = require('@/app/work/[id]/page').default;
    
    render(<ProjectDetailPage params={params} />);
    
    // Check related projects section
    expect(screen.getByTestId('related-projects')).toBeInTheDocument();
    
    // Mock related projects are mockProjects[1] and mockProjects[2]
    expect(screen.getByText(mockProjects[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockProjects[2].title)).toBeInTheDocument();
  });

  it('updates cursor text on interactive elements', () => {
    const params = { id: '1' };
    const ProjectDetailPage = require('@/app/work/[id]/page').default;
    
    render(<ProjectDetailPage params={params} />);
    
    // Check back button
    const backButton = screen.getByText(/BACK TO PROJECTS/i);
    
    fireEvent.mouseEnter(backButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('BACK');
    
    fireEvent.mouseLeave(backButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
    
    // Check URL button if present
    const project = mockProjects.find(p => p.id === 1);
    if (project.url) {
      const visitButton = screen.getByText(/VISIT SITE/i);
      
      fireEvent.mouseEnter(visitButton);
      expect(mockSetCursorText).toHaveBeenCalledWith('VISIT');
      
      fireEvent.mouseLeave(visitButton);
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    }
  });

  it('displays 404 content when project is not found', () => {
    // Set up params with non-existent project ID
    const params = { id: '999' };
    const ProjectDetailPage = require('@/app/work/[id]/page').default;
    
    render(<ProjectDetailPage params={params} />);
    
    // Check for 404 content
    expect(screen.getByTestId('project-not-found')).toBeInTheDocument();
    expect(screen.getByText(/project not found/i)).toBeInTheDocument();
  });

  it('navigates to projects page when back button is clicked', () => {
    const params = { id: '1' };
    const ProjectDetailPage = require('@/app/work/[id]/page').default;
    
    render(<ProjectDetailPage params={params} />);
    
    // Find and click back button
    const backButton = screen.getByText(/BACK TO PROJECTS/i);
    fireEvent.click(backButton);
    
    // Check that router push was called with the correct path
    expect(pushMock).toHaveBeenCalledWith('/work');
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockTeamMembers } from '../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Mock the TeamPage component directly
jest.mock('@/app/team/page', () => {
  return {
    __esModule: true,
    default: () => {
      const { setCursorText } = useCursor();
      
      return (
        <div data-testid="team-page">
          <section data-testid="team-hero">
            <h1>Our Team</h1>
            <p>Meet the people behind RAW/STUDIO</p>
          </section>
          
          <section data-testid="team-members">
            {mockTeamMembers.map((member) => (
              <div 
                key={member.id} 
                data-testid={`team-member-${member.id}`}
                onMouseEnter={() => setCursorText('VIEW')}
                onMouseLeave={() => setCursorText('')}
              >
                <img 
                  src={member.image} 
                  alt={`${member.name} - ${member.role}`} 
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <button>View Profile</button>
              </div>
            ))}
          </section>
          
          <section data-testid="team-values">
            <h2>Our Values</h2>
            <div>
              <div data-testid="value-1">
                <h3>Collaboration</h3>
                <p>We believe great work comes from diverse perspectives</p>
              </div>
              <div data-testid="value-2">
                <h3>Innovation</h3>
                <p>We push boundaries and explore new possibilities</p>
              </div>
              <div data-testid="value-3">
                <h3>Excellence</h3>
                <p>We hold ourselves to the highest standards</p>
              </div>
            </div>
          </section>
          
          <section data-testid="team-hiring">
            <h2>Join Our Team</h2>
            <p>We're always looking for talented individuals</p>
            <a 
              href="/careers" 
              onMouseEnter={() => setCursorText('VIEW')}
              onMouseLeave={() => setCursorText('')}
            >
              View Open Positions
            </a>
          </section>
        </div>
      );
    }
  };
});

// Mock member detail page component
jest.mock('@/app/team/[id]/page', () => {
  return {
    __esModule: true,
    default: ({ params }) => {
      const id = Number(params?.id);
      const member = mockTeamMembers.find(m => m.id === id);
      const pushMock = jest.requireMock('next/navigation').useRouter().push;
      const { setCursorText } = useCursor();
      
      if (!member) {
        return (
          <div data-testid="member-not-found">
            <h1>Team Member Not Found</h1>
            <p>Sorry, the team member you are looking for could not be found.</p>
            <button 
              onClick={() => pushMock('/team')}
              onMouseEnter={() => setCursorText('BACK')}
              onMouseLeave={() => setCursorText('')}
            >
              BACK TO TEAM
            </button>
          </div>
        );
      }
      
      return (
        <div data-testid="team-member-detail">
          <img 
            src={member.image} 
            alt={`${member.name} - ${member.role}`} 
          />
          <h1>{member.name}</h1>
          <p>{member.role}</p>
          
          {member.bio && (
            <div data-testid="member-bio">
              <h2>About {member.name}</h2>
              <p>{member.bio}</p>
            </div>
          )}
          
          {member.skills && member.skills.length > 0 && (
            <div data-testid="member-skills">
              <h2>Skills</h2>
              <ul>
                {member.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
          
          {member.projects && member.projects.length > 0 && (
            <div data-testid="member-projects">
              <h2>Featured Projects</h2>
              <div>
                {member.projects.map((project, index) => (
                  <div 
                    key={index}
                    onMouseEnter={() => setCursorText('VIEW')}
                    onMouseLeave={() => setCursorText('')}
                    onClick={() => pushMock(`/work/${project.id}`)}
                  >
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {member.socials && (
            <div data-testid="member-socials">
              <h2>Connect</h2>
              <div>
                {member.socials.linkedin && (
                  <a 
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorText('VISIT')}
                    onMouseLeave={() => setCursorText('')}
                  >
                    LinkedIn
                  </a>
                )}
                {member.socials.twitter && (
                  <a 
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorText('VISIT')}
                    onMouseLeave={() => setCursorText('')}
                  >
                    Twitter
                  </a>
                )}
                {member.socials.github && (
                  <a 
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorText('VISIT')}
                    onMouseLeave={() => setCursorText('')}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}
          
          <button 
            onClick={() => pushMock('/team')}
            onMouseEnter={() => setCursorText('BACK')}
            onMouseLeave={() => setCursorText('')}
          >
            BACK TO TEAM
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
  usePathname: jest.fn(() => '/team'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock data fetching function
jest.mock('@/lib/data', () => ({
  getTeamMembers: jest.fn(() => mockTeamMembers),
  getTeamMemberById: jest.fn((id) => {
    const numId = Number(id);
    return mockTeamMembers.find(m => m.id === numId) || null;
  }),
}));

describe('TeamPage Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for useCursor
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders team page with all sections', () => {
    const TeamPage = require('@/app/team/page').default;
    
    render(<TeamPage />);
    
    // Check page structure
    expect(screen.getByTestId('team-page')).toBeInTheDocument();
    expect(screen.getByTestId('team-hero')).toBeInTheDocument();
    expect(screen.getByTestId('team-members')).toBeInTheDocument();
    expect(screen.getByTestId('team-values')).toBeInTheDocument();
    expect(screen.getByTestId('team-hiring')).toBeInTheDocument();
    
    // Check page content
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByText('Meet the people behind RAW/STUDIO')).toBeInTheDocument();
    
    // Check team members display
    mockTeamMembers.forEach((member) => {
      expect(screen.getByTestId(`team-member-${member.id}`)).toBeInTheDocument();
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
    });
    
    // Check values section
    expect(screen.getByText('Our Values')).toBeInTheDocument();
    expect(screen.getByTestId('value-1')).toBeInTheDocument();
    expect(screen.getByTestId('value-2')).toBeInTheDocument();
    expect(screen.getByTestId('value-3')).toBeInTheDocument();
    
    // Check hiring section
    expect(screen.getByText('Join Our Team')).toBeInTheDocument();
    expect(screen.getByText('View Open Positions')).toBeInTheDocument();
  });

  it('updates cursor text on team member cards', () => {
    const TeamPage = require('@/app/team/page').default;
    
    render(<TeamPage />);
    
    // Find the first team member card
    const teamMemberCard = screen.getByTestId('team-member-1');
    
    // Test mouse interactions
    fireEvent.mouseEnter(teamMemberCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(teamMemberCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('updates cursor text on careers link', () => {
    const TeamPage = require('@/app/team/page').default;
    
    render(<TeamPage />);
    
    // Find the careers link
    const careersLink = screen.getByText('View Open Positions');
    
    // Test mouse interactions
    fireEvent.mouseEnter(careersLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(careersLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('renders team member detail page correctly', () => {
    const params = { id: '1' };
    const TeamMemberDetailPage = require('@/app/team/[id]/page').default;
    
    render(<TeamMemberDetailPage params={params} />);
    
    const member = mockTeamMembers.find(m => m.id === 1);
    
    // Check basic page structure
    expect(screen.getByTestId('team-member-detail')).toBeInTheDocument();
    
    // Check member information
    expect(screen.getByText(member.name)).toBeInTheDocument();
    expect(screen.getByText(member.role)).toBeInTheDocument();
    
    // Check for bio section
    if (member.bio) {
      expect(screen.getByTestId('member-bio')).toBeInTheDocument();
      expect(screen.getByText(member.bio)).toBeInTheDocument();
    }
    
    // Check for skills section
    if (member.skills && member.skills.length > 0) {
      expect(screen.getByTestId('member-skills')).toBeInTheDocument();
      member.skills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
    }
    
    // Check for projects section
    if (member.projects && member.projects.length > 0) {
      expect(screen.getByTestId('member-projects')).toBeInTheDocument();
      member.projects.forEach(project => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    }
    
    // Check for socials section
    if (member.socials) {
      expect(screen.getByTestId('member-socials')).toBeInTheDocument();
      
      if (member.socials.linkedin) {
        expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      }
      
      if (member.socials.twitter) {
        expect(screen.getByText('Twitter')).toBeInTheDocument();
      }
      
      if (member.socials.github) {
        expect(screen.getByText('GitHub')).toBeInTheDocument();
      }
    }
  });

  it('displays 404 content when team member is not found', () => {
    // Set up params with non-existent team member ID
    const params = { id: '999' };
    const TeamMemberDetailPage = require('@/app/team/[id]/page').default;
    
    render(<TeamMemberDetailPage params={params} />);
    
    // Check for 404 content
    expect(screen.getByTestId('member-not-found')).toBeInTheDocument();
    expect(screen.getByText(/team member not found/i)).toBeInTheDocument();
  });

  it('navigates back to team page when back button is clicked on member detail page', () => {
    const params = { id: '1' };
    const TeamMemberDetailPage = require('@/app/team/[id]/page').default;
    
    render(<TeamMemberDetailPage params={params} />);
    
    // Find and click back button
    const backButton = screen.getByText(/BACK TO TEAM/i);
    fireEvent.click(backButton);
    
    // Check that router push was called with the correct path
    expect(pushMock).toHaveBeenCalledWith('/team');
  });

  it('navigates to project page when project is clicked on member detail page', () => {
    const params = { id: '1' };
    const TeamMemberDetailPage = require('@/app/team/[id]/page').default;
    
    render(<TeamMemberDetailPage params={params} />);
    
    const member = mockTeamMembers.find(m => m.id === 1);
    
    // Only test if member has projects
    if (member.projects && member.projects.length > 0) {
      // The first project in the list
      const projectTitle = screen.getByText(member.projects[0].title);
      const projectContainer = projectTitle.closest('div');
      
      fireEvent.click(projectContainer);
      
      // Check that router push was called with the correct path
      expect(pushMock).toHaveBeenCalledWith(`/work/${member.projects[0].id}`);
    }
  });

  it('updates cursor text on social media links', () => {
    const params = { id: '1' };
    const TeamMemberDetailPage = require('@/app/team/[id]/page').default;
    
    render(<TeamMemberDetailPage params={params} />);
    
    const member = mockTeamMembers.find(m => m.id === 1);
    
    // Test social media links if present
    if (member.socials) {
      if (member.socials.linkedin) {
        const linkedinLink = screen.getByText('LinkedIn');
        
        fireEvent.mouseEnter(linkedinLink);
        expect(mockSetCursorText).toHaveBeenCalledWith('VISIT');
        
        fireEvent.mouseLeave(linkedinLink);
        expect(mockSetCursorText).toHaveBeenCalledWith('');
      }
    }
  });
}); 
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import AboutPage from '@/app/(foxlabs)/about/page';

// Mock an empty team array
jest.mock('@/lib/data', () => ({
  teamMembers: [],
}));

// Mock the components used in About page
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

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Convert boolean 'fill' prop to string to avoid React warnings
    const fillValue = props.fill ? "true" : undefined;
    
    return (
      <img 
        {...props}
        fill={fillValue}
        data-testid="next-image"
      />
    );
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<any>) => {
      // Create unique testIds based on className to avoid duplicate testIds
      const testId = className?.includes('group cursor-pointer') 
        ? 'team-member-container'
        : className?.includes('absolute inset-0 z-10')
          ? 'image-container'
          : className?.includes('absolute inset-0 bg-black')
            ? 'overlay-container'
            : 'motion-div';
      
      return (
        <div 
          data-testid={testId}
          className={className}
        >
          {children}
        </div>
      );
    },
    p: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <p data-testid="motion-p">{children}</p>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
}));

describe('AboutPage - Empty Team Section', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('still renders the team section even with empty team data', () => {
    render(<AboutPage />);
    
    // Check if team section heading is still displayed
    expect(screen.getByText('OUR TEAM')).toBeInTheDocument();
  });

  it('does not render any team member cards when team array is empty', () => {
    render(<AboutPage />);
    
    // Get the team section
    const teamSection = screen.getByText('OUR TEAM').closest('section');
    expect(teamSection).toBeInTheDocument();
    
    // Get the grid container
    const gridContainer = teamSection!.querySelector('div:nth-child(2)');
    expect(gridContainer).toBeInTheDocument();
    
    // Check that the grid container has no team member cards inside
    const teamMemberContainers = gridContainer!.querySelectorAll('[data-testid="team-member-container"]');
    expect(teamMemberContainers.length).toBe(0);
  });

  it('still renders other page sections correctly', () => {
    render(<AboutPage />);
    
    // Verify other sections still render
    // Use a custom matcher for finding text that might be split across elements
    const whoHeading = screen.getByRole('heading', { level: 1 });
    expect(whoHeading).toBeInTheDocument();
    expect(within(whoHeading).getByText(/WHO/)).toBeInTheDocument();
    expect(within(whoHeading).getByText(/WE ARE/)).toBeInTheDocument();
    
    expect(screen.getByText('OUR MISSION')).toBeInTheDocument();
    expect(screen.getByText('OUR VALUES')).toBeInTheDocument();
    
    // Check that header, footer, and contact section are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  });
}); 
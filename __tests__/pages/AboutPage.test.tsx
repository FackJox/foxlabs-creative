/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import AboutPage from '@/app/about/page';

// Simple mock for the teamMembers data without trying to mock all components
jest.mock('@/lib/data', () => ({
  teamMembers: [
    {
      name: "TEST MEMBER 1",
      role: "CREATIVE DIRECTOR",
      image: "/team1.jpg"
    },
    {
      name: "TEST MEMBER 2",
      role: "LEAD DEVELOPER",
      image: "/team2.jpg"
    },
    {
      name: "TEST MEMBER 3",
      role: "DESIGNER",
      image: "/team3.jpg"
    }
  ],
}));

// Minimal mock for next/image to avoid warnings
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

describe('AboutPage - Basic Rendering', () => {
  it('renders main page sections', () => {
    render(<AboutPage />);
    
    // Check for basic sections and text
    const whoHeading = screen.getByRole('heading', { level: 1 });
    expect(whoHeading).toBeInTheDocument();
    expect(within(whoHeading).getByText(/WHO/)).toBeInTheDocument();
    
    expect(screen.getByText('OUR MISSION')).toBeInTheDocument();
    expect(screen.getByText('OUR TEAM')).toBeInTheDocument();
    expect(screen.getByText('OUR VALUES')).toBeInTheDocument();
  });

  it('renders team member names', () => {
    render(<AboutPage />);
    
    // Check that team member names are present
    expect(screen.getByText('TEST MEMBER 1')).toBeInTheDocument();
    expect(screen.getByText('TEST MEMBER 2')).toBeInTheDocument();
    expect(screen.getByText('TEST MEMBER 3')).toBeInTheDocument();
  });

  it('renders team member roles', () => {
    render(<AboutPage />);
    
    // Check that team member roles are present
    expect(screen.getByText('CREATIVE DIRECTOR')).toBeInTheDocument();
    expect(screen.getByText('LEAD DEVELOPER')).toBeInTheDocument();
    expect(screen.getByText('DESIGNER')).toBeInTheDocument();
  });
}); 
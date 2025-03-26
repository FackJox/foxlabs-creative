/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockTeamMembers } from '../fixtures/mockData';
import { CursorProvider } from '../../hooks/use-cursor';
import { CursorProvider as TestCursorProvider } from '../test-utils/cursor-provider-mock';

// Mock the team members data
jest.mock('@/lib/data', () => ({
  teamMembers: mockTeamMembers
}));

// Mock the custom cursor component
jest.mock('@/components/effects/custom-cursor', () => ({
  __esModule: true,
  default: () => <div data-testid="custom-cursor">Custom Cursor</div>
}));

// Mock the Header and Footer components
jest.mock('@/components/layout', () => ({
  Header: ({ setCursorText }: { setCursorText: (text: string) => void }) => (
    <header data-testid="header">Header</header>
  ),
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

// Mock the ContactSection component
jest.mock('@/components/sections', () => ({
  ContactSection: ({ setCursorText }: { setCursorText: (text: string) => void }) => (
    <div data-testid="contact-section">Contact Section</div>
  )
}));

// Mock the TeamMember component
jest.mock('@/components/core', () => ({
  TeamMember: ({ 
    member, 
    index 
  }: { 
    member: any; 
    index: number; 
  }) => (
    <div data-testid="team-member">
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </div>
  )
}));

// Create a custom wrapper component that includes the CursorProvider
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <TestCursorProvider>{children}</TestCursorProvider>
);

describe('AboutPage - Basic Rendering', () => {
  it('renders main page sections', () => {
    // Render the page
    render(<AboutPage />, { wrapper: Wrapper });
    
    // Check that main sections are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('ABOUT US')).toBeInTheDocument();
    expect(screen.getByText('OUR TEAM')).toBeInTheDocument();
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  
  it('renders team member names', () => {
    // Render the page
    render(<AboutPage />, { wrapper: Wrapper });
    
    // Check that team members are rendered
    mockTeamMembers.forEach(member => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
    });
  });
  
  it('renders team member roles', () => {
    // Render the page
    render(<AboutPage />, { wrapper: Wrapper });
    
    // Check that team member roles are rendered
    mockTeamMembers.forEach(member => {
      expect(screen.getByText(member.role)).toBeInTheDocument();
    });
  });
}); 
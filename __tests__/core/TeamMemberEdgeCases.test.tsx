import React from 'react';
import { render, screen } from '@testing-library/react';
import { TeamMember } from '@/components/core';
import { mockTeamMembers } from '../fixtures/mockData';

// Mock useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: () => ({
    setCursorText: jest.fn(),
  }),
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
  },
}));

describe('TeamMember Component - Edge Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles team members with very long names', () => {
    const longNameMember = {
      ...mockTeamMembers[0],
      name: 'THIS IS AN EXTREMELY LONG NAME THAT MIGHT CAUSE LAYOUT ISSUES IF NOT HANDLED PROPERLY',
    };
    
    render(<TeamMember member={longNameMember} index={0} />);
    
    // Verify the long name is displayed
    expect(screen.getByText(longNameMember.name)).toBeInTheDocument();
  });

  it('handles team members with very long role titles', () => {
    const longRoleMember = {
      ...mockTeamMembers[0],
      role: 'SENIOR PRINCIPAL EXECUTIVE CREATIVE DIRECTOR OF INTERACTIVE DESIGN EXPERIENCES AND OPERATIONS',
    };
    
    render(<TeamMember member={longRoleMember} index={0} />);
    
    // Verify the long role title is displayed
    expect(screen.getByText(longRoleMember.role)).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const noImageMember = {
      ...mockTeamMembers[0],
      image: undefined as unknown as string, // Force undefined to test edge case
    };
    
    render(<TeamMember member={noImageMember} index={0} />);
    
    // Check if a placeholder image is used
    const image = screen.getByAltText(noImageMember.name);
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain('/placeholder.svg');
  });

  it('handles broken image URLs', () => {
    const brokenImageMember = {
      ...mockTeamMembers[0],
      image: 'broken-image-url.jpg',
    };
    
    render(<TeamMember member={brokenImageMember} index={0} />);
    
    // Verify image exists with the broken URL
    const image = screen.getByAltText(brokenImageMember.name);
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe('broken-image-url.jpg');
    
    // Simulate image error event
    fireEvent.error(image);
    
    // Note: In a real implementation, we might want to verify that an onError handler
    // replaces the broken image with a placeholder, but that depends on the component implementation
  });

  it('handles negative index values', () => {
    const teamMember = mockTeamMembers[0];
    
    // Should not crash with negative index
    render(<TeamMember member={teamMember} index={-1} />);
    
    // Check that the component still renders correctly
    expect(screen.getByText(teamMember.name)).toBeInTheDocument();
    expect(screen.getByText(teamMember.role)).toBeInTheDocument();
  });

  it('handles very large index values (for animation delays)', () => {
    const teamMember = mockTeamMembers[0];
    
    // Should handle large index without issues
    render(<TeamMember member={teamMember} index={1000} />);
    
    // Check that the component still renders correctly
    expect(screen.getByText(teamMember.name)).toBeInTheDocument();
    expect(screen.getByText(teamMember.role)).toBeInTheDocument();
  });
});

// Add the missing fireEvent import
import { fireEvent } from '@testing-library/react'; 
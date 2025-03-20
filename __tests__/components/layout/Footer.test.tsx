import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import Footer from '@/components/layout/footer';
import { customRender, testAccessibility, setupUserEvent } from '@/__tests__/utils/test-utils';

// Import the mock cursor state to access it in tests
jest.mock('@/hooks/use-cursor', () => {
  const mockCursorState = {
    cursorPosition: { x: 0, y: 0 },
    cursorText: '',
    setCursorText: jest.fn((text: string) => {
      mockCursorState.cursorText = text;
    })
  };
  
  return {
    __esModule: true,
    useCursor: () => mockCursorState,
    CursorProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Footer Component', () => {
  // Clear cursor text before each test
  beforeEach(() => {
    const { useCursor } = require('@/hooks/use-cursor');
    useCursor().cursorText = '';
  });

  describe('Basic content rendering', () => {
    it('renders the brand name', () => {
      customRender(<Footer />);
      expect(screen.getByText('RAW/STUDIO')).toBeInTheDocument();
    });

    it('renders copyright information with current year', () => {
      customRender(<Footer />);
      const currentYear = new Date().getFullYear().toString();
      const copyrightText = screen.getByText(
        (content) => content.includes(`© ${currentYear} RAW/STUDIO`)
      );
      expect(copyrightText).toBeInTheDocument();
      expect(copyrightText).toHaveTextContent('ALL RIGHTS RESERVED');
    });

    it('renders social media links', () => {
      customRender(<Footer />);
      
      // Check for specific social media links using aria-label
      expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    });

    it('renders policy and terms links', () => {
      customRender(<Footer />);
      
      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Terms of Service' })).toBeInTheDocument();
    });
  });

  describe('Link behavior', () => {
    it('social media links have correct href attributes', () => {
      customRender(<Footer />);
      
      const instagramLink = screen.getByRole('link', { name: 'Instagram' });
      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/rawstudio');
      
      const twitterLink = screen.getByRole('link', { name: 'Twitter' });
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/rawstudio');
      
      const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/rawstudio');
      
      const githubLink = screen.getByRole('link', { name: 'GitHub' });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/rawstudio');
    });

    it('policy links have correct href attributes', () => {
      customRender(<Footer />);
      
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
      expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
      
      const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
      expect(termsLink).toHaveAttribute('href', '/terms-of-service');
    });

    it('updates cursor text on social media link hover', () => {
      customRender(<Footer />);
      const { useCursor } = require('@/hooks/use-cursor');
      const mockCursor = useCursor();
      
      // Test Instagram link
      const instagramLink = screen.getByRole('link', { name: 'Instagram' });
      fireEvent.mouseEnter(instagramLink);
      expect(mockCursor.cursorText).toBe('VISIT');
      
      fireEvent.mouseLeave(instagramLink);
      expect(mockCursor.cursorText).toBe('');
    });

    it('updates cursor text on policy link hover', () => {
      customRender(<Footer />);
      const { useCursor } = require('@/hooks/use-cursor');
      const mockCursor = useCursor();
      
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
      
      fireEvent.mouseEnter(privacyLink);
      expect(mockCursor.cursorText).toBe('VIEW');
      
      fireEvent.mouseLeave(privacyLink);
      expect(mockCursor.cursorText).toBe('');
    });
  });

  describe('Accessibility compliance', () => {
    it('all links are keyboard accessible', async () => {
      const user = setupUserEvent();
      customRender(<Footer />);
      
      // Get all links
      const allLinks = screen.getAllByRole('link');
      
      // Test first link focus
      await user.tab();
      expect(allLinks[0]).toHaveFocus();
      
      // Test that we can tab through all links
      for (let i = 1; i < allLinks.length; i++) {
        await user.tab();
        expect(allLinks[i]).toHaveFocus();
      }
    });

    it('has no accessibility violations', async () => {
      const { container } = customRender(<Footer />);
      const results = await testAccessibility(container);
      expect(results).toHaveNoViolations();
    });
  });
}); 
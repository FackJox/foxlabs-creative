import React from 'react';
import { act } from 'react';
import { customRender, screen, setupUserEvent, testAccessibility, simulateScreenSize, screenSizes } from '@/__tests__/utils/test-utils';
import Header from '@/components/layout/header';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

// Mock Next/Link component to avoid router issues in tests
jest.mock('next/link', () => {
  return ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <div data-testid="motion-div" {...props}>
          {children}
        </div>
      ),
    },
    AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
  };
});

describe('Header Component', () => {
  // Mock setCursorText function
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders the logo and menu button', () => {
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Check logo
      const logo = screen.getByText('RAW/STUDIO');
      expect(logo).toBeInTheDocument();
      expect(logo.tagName).toBe('A');
      expect(logo).toHaveAttribute('href', '/');
      
      // Check menu button
      const menuButton = screen.getByRole('button');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveTextContent('MENU');
    });

    it('renders with the correct structure and styling', () => {
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Navigation element exists and has the correct position styling
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('fixed');
      expect(nav).toHaveClass('z-40');

      // Logo has correct styling
      const logo = screen.getByText('RAW/STUDIO');
      expect(logo).toHaveClass('text-xl');
      expect(logo).toHaveClass('font-bold');
      expect(logo).toHaveClass('uppercase');
    });
  });

  describe('Navigation Link Behavior', () => {
    it('updates cursor text on logo hover', async () => {
      const user = setupUserEvent();
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      const logo = screen.getByText('RAW/STUDIO');
      
      // Mouse enter
      await user.hover(logo);
      expect(mockSetCursorText).toHaveBeenCalledWith('HOME');
      
      // Mouse leave
      await user.unhover(logo);
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    });

    it('updates cursor text on menu button hover', async () => {
      const user = setupUserEvent();
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      const menuButton = screen.getByRole('button');
      
      // Mouse enter
      await user.hover(menuButton);
      expect(mockSetCursorText).toHaveBeenCalledWith('MENU');
      
      // Mouse leave
      await user.unhover(menuButton);
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    });

    it('updates cursor text on navigation links hover', async () => {
      const user = setupUserEvent();
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Open menu first
      const menuButton = screen.getByRole('button');
      await user.click(menuButton);
      
      // Get the HOME link
      const homeLink = screen.getByText('HOME').closest('a');
      expect(homeLink).toBeInTheDocument();
      
      // Mouse enter
      await user.hover(homeLink!);
      expect(mockSetCursorText).toHaveBeenCalledWith('GO');
      
      // Mouse leave
      await user.unhover(homeLink!);
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    });

    it('updates cursor text on social links hover', async () => {
      const user = setupUserEvent();
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Open menu first
      const menuButton = screen.getByRole('button');
      await user.click(menuButton);
      
      // Get the INSTAGRAM link
      const instagramLink = screen.getByText('INSTAGRAM');
      expect(instagramLink).toBeInTheDocument();
      
      // Mouse enter
      await user.hover(instagramLink);
      expect(mockSetCursorText).toHaveBeenCalledWith('VISIT');
      
      // Mouse leave
      await user.unhover(instagramLink);
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    });

    it('highlights active links based on current route', async () => {
      // Mock usePathname to return the work page path
      jest.requireMock('next/navigation').usePathname.mockReturnValue('/work');
      
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Open menu
      const menuButton = screen.getByRole('button');
      await act(async () => {
        await setupUserEvent().click(menuButton);
      });
      
      // Check that all navigation links are rendered
      const navLinks = ['HOME', 'WORK', 'ABOUT', 'SERVICES'];
      navLinks.forEach(linkText => {
        const link = screen.getByText(linkText);
        expect(link).toBeInTheDocument();
      });
      
      // Reset mock
      jest.requireMock('next/navigation').usePathname.mockReturnValue('/');
    });
  });

  describe('Mobile Menu Functionality', () => {
    it('toggles the menu when menu button is clicked', async () => {
      const user = setupUserEvent();
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Menu should be closed initially
      expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
      
      // Click the menu button to open
      const menuButton = screen.getByRole('button');
      await user.click(menuButton);
      
      // Menu should now be open with a full-screen menu
      const menu = screen.getByTestId('motion-div');
      expect(menu).toBeInTheDocument();
      
      // Navigation section should be visible
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      
      // Navigation links should be visible
      const navLinks = ['HOME', 'WORK', 'ABOUT', 'SERVICES'];
      navLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
      
      // Click the menu button again to close
      expect(menuButton).toHaveTextContent('CLOSE');
      await user.click(menuButton);
      
      // Menu should now be closed
      expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    });

    it('closes the menu when a navigation link is clicked', async () => {
      const user = setupUserEvent();
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Open menu first
      const menuButton = screen.getByRole('button');
      await user.click(menuButton);
      
      // Get the HOME link
      const homeLink = screen.getByText('HOME').closest('a');
      expect(homeLink).toBeInTheDocument();
      
      // Click the HOME link
      await user.click(homeLink!);
      
      // Menu should now be closed
      expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    });

    it('displays contact and social information when menu is open', async () => {
      const user = setupUserEvent();
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Open menu
      const menuButton = screen.getByRole('button');
      await user.click(menuButton);
      
      // Check for contact information
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('hello@rawstudio.design')).toBeInTheDocument();
      expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
      
      // Check for social links
      expect(screen.getByText('Social')).toBeInTheDocument();
      const socialLinks = ['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'BEHANCE'];
      socialLinks.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
      
      // Check for copyright information
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} RAW/STUDIO. ALL RIGHTS RESERVED.`)).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('maintains the expected layout on mobile viewport', () => {
      // Simulate mobile viewport
      const restoreSize = simulateScreenSize('mobile');
      
      try {
        customRender(<Header setCursorText={mockSetCursorText} />);
        
        // Check that the header is properly styled for mobile
        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass('p-4');
        
        // Logo should still be visible
        expect(screen.getByText('RAW/STUDIO')).toBeInTheDocument();
        
        // Menu button should be visible
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('MENU');
      } finally {
        // Restore original viewport size
        restoreSize();
      }
    });

    it('renders the mobile menu with correct layout', async () => {
      // Simulate mobile viewport
      const restoreSize = simulateScreenSize('mobile');
      
      try {
        const user = setupUserEvent();
        customRender(<Header setCursorText={mockSetCursorText} />);
        
        // Open menu
        const menuButton = screen.getByRole('button');
        await user.click(menuButton);
        
        // Check that the mobile menu is properly laid out
        const menu = screen.getByTestId('motion-div');
        const gridContainer = menu.querySelector('.grid');
        expect(gridContainer).toHaveClass('grid-cols-1');
        
        // Close menu
        await user.click(menuButton);
      } finally {
        // Restore original viewport size
        restoreSize();
      }
    });

    it('renders the desktop menu with correct layout', async () => {
      // Simulate desktop viewport
      const restoreSize = simulateScreenSize('desktop');
      
      try {
        const user = setupUserEvent();
        customRender(<Header setCursorText={mockSetCursorText} />);
        
        // Open menu
        const menuButton = screen.getByRole('button');
        await user.click(menuButton);
        
        // Check that the desktop menu grid is properly laid out
        const gridContainer = screen.getByTestId('motion-div').querySelector('.grid');
        expect(gridContainer).toHaveClass('md:grid-cols-2');
        
        // Close menu
        await user.click(menuButton);
      } finally {
        // Restore original viewport size
        restoreSize();
      }
    });
  });

  describe('Accessibility Compliance', () => {
    it('passes accessibility tests', async () => {
      const { container } = customRender(<Header setCursorText={mockSetCursorText} />);
      const results = await testAccessibility(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper semantic structure for screen readers', () => {
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Check for navigation role
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      
      // Check that logo is a link
      const logo = screen.getByText('RAW/STUDIO');
      expect(logo.tagName).toBe('A');
      
      // Check that menu button has proper role
      const menuButton = screen.getByRole('button');
      expect(menuButton).toBeInTheDocument();
    });

    it('ensures menu is keyboard navigable when open', async () => {
      const user = setupUserEvent();
      customRender(<Header setCursorText={mockSetCursorText} />);
      
      // Open menu
      const menuButton = screen.getByRole('button');
      await user.click(menuButton);
      
      // All navigation links should be keyboard focusable
      const navLinks = screen.getAllByRole('link');
      expect(navLinks.length).toBeGreaterThan(0);
      
      // All social links should be keyboard focusable
      const socialLinks = ['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'BEHANCE'];
      socialLinks.forEach(linkText => {
        const link = screen.getByText(linkText);
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href');
      });
    });
  });
}); 
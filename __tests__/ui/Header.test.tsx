import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Header } from '@/components/layout';

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
  
  it('renders the logo and menu button', () => {
    render(<Header setCursorText={mockSetCursorText} />);
    
    // Check logo
    const logo = screen.getByText('FoxLabs//Creative');
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe('A');
    expect(logo).toHaveAttribute('href', '/');
    
    // Check menu button
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveTextContent('MENU');
  });
  
  it('toggles the menu when menu button is clicked', () => {
    render(<Header setCursorText={mockSetCursorText} />);
    
    // Menu should be closed initially
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
    
    // Click the menu button to open
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
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
    fireEvent.click(menuButton);
    
    // Menu should now be closed
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
  });
  
  it('updates cursor text on logo hover', async () => {
    const user = userEvent.setup();
    render(<Header setCursorText={mockSetCursorText} />);
    
    const logo = screen.getByText('FoxLabs//Creative');
    
    // Mouse enter
    await user.hover(logo);
    expect(mockSetCursorText).toHaveBeenCalledWith('HOME');
    
    // Mouse leave
    await user.unhover(logo);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
  
  it('updates cursor text on menu button hover', async () => {
    const user = userEvent.setup();
    render(<Header setCursorText={mockSetCursorText} />);
    
    const menuButton = screen.getByRole('button');
    
    // Mouse enter
    await user.hover(menuButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('MENU');
    
    // Mouse leave
    await user.unhover(menuButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
  
  it('updates cursor text on navigation links hover', async () => {
    const user = userEvent.setup();
    render(<Header setCursorText={mockSetCursorText} />);
    
    // Open menu first
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
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
    const user = userEvent.setup();
    render(<Header setCursorText={mockSetCursorText} />);
    
    // Open menu first
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
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
  
  it('passes accessibility tests', async () => {
    const { container } = render(<Header setCursorText={mockSetCursorText} />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('closes the menu when a navigation link is clicked', () => {
    render(<Header setCursorText={mockSetCursorText} />);
    
    // Open menu first
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Get the HOME link
    const homeLink = screen.getByText('HOME').closest('a');
    expect(homeLink).toBeInTheDocument();
    
    // Click the HOME link
    fireEvent.click(homeLink!);
    
    // Menu should now be closed
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
  });
}); 
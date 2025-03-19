import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Header from '@/components/layout/header';

describe('Header Component', () => {
  // Mock setCursorText function
  const setCursorText = jest.fn();
  
  beforeEach(() => {
    // Reset the mock before each test
    setCursorText.mockReset();
  });
  
  it('renders correctly with logo and menu button', () => {
    render(<Header setCursorText={setCursorText} />);
    
    // Check for logo link
    expect(screen.getByText('RAW/STUDIO')).toBeInTheDocument();
    expect(screen.getByText('RAW/STUDIO').closest('a')).toHaveAttribute('href', '/');
    
    // Check for menu button
    expect(screen.getByText('MENU')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('toggles menu visibility when menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header setCursorText={setCursorText} />);
    
    // Menu should be closed initially
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
    
    // Open the menu
    await user.click(screen.getByRole('button'));
    
    // Menu should be open
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('WORK')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('SERVICES')).toBeInTheDocument();
    
    // Button text should change to CLOSE
    expect(screen.getByText('CLOSE')).toBeInTheDocument();
    
    // Close the menu
    await user.click(screen.getByRole('button'));
    
    // Menu should be closed again
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
    expect(screen.queryByText('HOME')).not.toBeInTheDocument();
  });
  
  it('sets cursor text on hover and clears on leave', () => {
    render(<Header setCursorText={setCursorText} />);
    
    // Logo hover sets cursor text to "HOME"
    fireEvent.mouseEnter(screen.getByText('RAW/STUDIO'));
    expect(setCursorText).toHaveBeenCalledWith('HOME');
    
    fireEvent.mouseLeave(screen.getByText('RAW/STUDIO'));
    expect(setCursorText).toHaveBeenCalledWith('');
    
    // Menu button hover sets cursor text to "MENU"
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(setCursorText).toHaveBeenCalledWith('MENU');
    
    fireEvent.mouseLeave(screen.getByRole('button'));
    expect(setCursorText).toHaveBeenCalledWith('');
  });
  
  it('closes menu when navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header setCursorText={setCursorText} />);
    
    // Open the menu
    await user.click(screen.getByRole('button'));
    
    // Menu should be open
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    
    // Click a navigation link
    await user.click(screen.getByText('WORK'));
    
    // Menu should be closed
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });
  
  it('is keyboard accessible', async () => {
    const user = userEvent.setup();
    render(<Header setCursorText={setCursorText} />);
    
    // Start with no element focused
    expect(document.body).toHaveFocus();
    
    // Tab to focus the logo
    await user.tab();
    expect(screen.getByText('RAW/STUDIO')).toHaveFocus();
    
    // Tab to focus the menu button
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    
    // Press Enter to open the menu
    await user.keyboard('{Enter}');
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    
    // Tab to focus the first navigation link
    await user.tab();
    expect(screen.getByText('HOME').closest('a')).toHaveFocus();
    
    // Press Enter to navigate and close the menu
    await user.keyboard('{Enter}');
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });
  
  it('has appropriate focus styles for keyboard navigation', () => {
    render(<Header setCursorText={setCursorText} />);
    
    // Focus the logo
    const logoLink = screen.getByText('RAW/STUDIO').closest('a');
    logoLink.focus();
    expect(logoLink).toHaveFocus();
    
    // Focus the menu button
    const menuButton = screen.getByRole('button');
    menuButton.focus();
    expect(menuButton).toHaveFocus();
  });
  
  it('has no accessibility violations', async () => {
    const { container } = render(<Header setCursorText={setCursorText} />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
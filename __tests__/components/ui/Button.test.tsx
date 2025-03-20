import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/inputs';
import { axe, toHaveNoViolations } from 'jest-axe';
import { customRender, testAccessibility } from '../../utils/test-utils';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Create a mock Spinner component directly
jest.mock('@/components/ui/feedback', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>
}));

// Mock cursor hook
const mockSetCursorText = jest.fn();
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: () => ({
    cursorText: '',
    setCursorText: mockSetCursorText
  })
}));

describe('Button Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering different variants', () => {
    it('renders correctly with default props', () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-primary');
    });

    it('renders with the correct variant classes', () => {
      const { rerender } = render(<Button variant="destructive">Destructive</Button>);
      
      let button = screen.getByRole('button', { name: 'Destructive' });
      expect(button).toHaveClass('bg-destructive');
      
      rerender(<Button variant="outline">Outline</Button>);
      button = screen.getByRole('button', { name: 'Outline' });
      expect(button).toHaveClass('border-input');
      
      rerender(<Button variant="secondary">Secondary</Button>);
      button = screen.getByRole('button', { name: 'Secondary' });
      expect(button).toHaveClass('bg-secondary');
      
      rerender(<Button variant="ghost">Ghost</Button>);
      button = screen.getByRole('button', { name: 'Ghost' });
      expect(button).not.toHaveClass('bg-primary');
      
      rerender(<Button variant="link">Link</Button>);
      button = screen.getByRole('button', { name: 'Link' });
      expect(button).toHaveClass('text-primary');
    });

    it('renders with the correct size classes', () => {
      const { rerender } = render(<Button size="default">Default</Button>);
      
      let button = screen.getByRole('button', { name: 'Default' });
      expect(button).toHaveClass('h-10');
      
      rerender(<Button size="sm">Small</Button>);
      button = screen.getByRole('button', { name: 'Small' });
      expect(button).toHaveClass('h-9');
      
      rerender(<Button size="lg">Large</Button>);
      button = screen.getByRole('button', { name: 'Large' });
      expect(button).toHaveClass('h-11');
      
      rerender(<Button size="icon">Icon</Button>);
      button = screen.getByRole('button', { name: 'Icon' });
      expect(button).toHaveClass('w-10');
    });

    it('renders with icon elements correctly', () => {
      render(
        <Button>
          <svg data-testid="test-icon" />
          Icon Button
        </Button>
      );
      
      const button = screen.getByRole('button', { name: 'Icon Button' });
      const icon = screen.getByTestId('test-icon');
      
      expect(button).toContainElement(icon);
      // Don't test for specific icon classes since they're applied via CSS selector
    });

    // fullWidth is not implemented in the base Button component
  });

  describe('Button state behavior', () => {
    it('is properly disabled when disabled prop is true', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      const button = screen.getByRole('button', { name: 'Disabled' });
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50');
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    // isLoading and showSpinnerOnly are not implemented in the base Button component
  });

  describe('Click handling', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
      
      const button = screen.getByRole('button', { name: 'Disabled Button' });
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    // isLoading is not implemented in the base Button component
  });

  describe('Cursor text updates', () => {
    it('can update cursor text on hover with onMouseEnter/onMouseLeave', async () => {
      const user = userEvent.setup();
      
      render(
        <Button 
          onMouseEnter={() => mockSetCursorText('VIEW')}
          onMouseLeave={() => mockSetCursorText('')}
        >
          Hover me
        </Button>
      );
      
      const button = screen.getByRole('button', { name: 'Hover me' });
      
      // Initial state
      expect(mockSetCursorText).not.toHaveBeenCalled();
      
      // Hover
      await user.hover(button);
      expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
      
      // Leave
      await user.unhover(button);
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    });

    it('has disabled:pointer-events-none class when disabled', () => {
      render(
        <Button disabled>
          Disabled Button
        </Button>
      );
      
      const button = screen.getByRole('button', { name: 'Disabled Button' });
      expect(button).toHaveClass('disabled:pointer-events-none');
    });
  });

  describe('Accessibility compliance', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Button>Accessible Button</Button>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('is keyboard accessible', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Keyboard Accessible</Button>);
      
      const button = screen.getByRole('button', { name: 'Keyboard Accessible' });
      
      // Focus and press Enter
      button.focus();
      expect(document.activeElement).toBe(button);
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Space key should also trigger click
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('preserves custom aria attributes', () => {
      render(
        <Button 
          aria-label="Custom Label" 
          aria-expanded="true"
          aria-controls="menu-id"
        >
          ARIA Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom Label');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(button).toHaveAttribute('aria-controls', 'menu-id');
    });
  });

  describe('Composition features', () => {
    it('renders as a child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="https://example.com">Link Button</a>
        </Button>
      );
      
      const linkButton = screen.getByRole('link', { name: 'Link Button' });
      expect(linkButton).toBeInTheDocument();
      expect(linkButton).toHaveAttribute('href', 'https://example.com');
      expect(linkButton).toHaveClass('bg-primary');
    });

    it('applies custom className correctly', () => {
      render(<Button className="custom-class">Custom Class</Button>);
      
      const button = screen.getByRole('button', { name: 'Custom Class' });
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('bg-primary'); // Still has variant class
    });
  });
}); 
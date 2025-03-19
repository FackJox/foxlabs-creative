import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/inputs/button';

describe('Button Component', () => {
  // Test default rendering
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  // Test different variants
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

  // Test different sizes
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

  // Test click handler
  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test disabled state
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

  // Test asChild prop
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

  // Test custom className
  it('applies custom className correctly', () => {
    render(<Button className="custom-class">Custom</Button>);
    
    const button = screen.getByRole('button', { name: 'Custom' });
    expect(button).toHaveClass('custom-class');
  });
}); 
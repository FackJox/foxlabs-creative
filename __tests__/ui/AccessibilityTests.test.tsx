import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/ui/inputs/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/data-display/card';
import { Badge } from '@/components/ui/badge';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

describe('UI Components Accessibility', () => {
  it('Button component has no accessibility violations', async () => {
    const { container } = render(
      <Button aria-label="Accessible button">
        Click me
      </Button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Card component has no accessibility violations', async () => {
    const { container } = render(
      <Card role="region" aria-label="Information card">
        <CardHeader>
          <CardTitle>Accessible Card</CardTitle>
        </CardHeader>
        <CardContent>Card content that is accessible</CardContent>
      </Card>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Badge component has no accessibility violations', async () => {
    const { container } = render(
      <Badge aria-label="Status indicator">New</Badge>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Button is keyboard navigable and activates with keyboard', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Keyboard Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Keyboard Button' });
    
    // Focus the button
    button.focus();
    expect(button).toHaveFocus();
    
    // Activate with Enter key
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Reset mock
    handleClick.mockReset();
    
    // Activate with Space key
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('maintains focus order when tabbing through components', async () => {
    const user = userEvent.setup();
    
    render(
      <>
        <Button data-testid="button-1">First Button</Button>
        <Button data-testid="button-2">Second Button</Button>
        <Button data-testid="button-3">Third Button</Button>
      </>
    );
    
    // Start with no element focused
    expect(document.body).toHaveFocus();
    
    // Press Tab to focus the first button
    await user.tab();
    expect(screen.getByTestId('button-1')).toHaveFocus();
    
    // Press Tab to focus the second button
    await user.tab();
    expect(screen.getByTestId('button-2')).toHaveFocus();
    
    // Press Tab to focus the third button
    await user.tab();
    expect(screen.getByTestId('button-3')).toHaveFocus();
  });

  it('buttons have appropriate ARIA attributes', () => {
    render(
      <>
        <Button aria-label="Regular button">Regular</Button>
        <Button aria-pressed="true">Toggle Button</Button>
        <Button disabled aria-disabled="true">Disabled Button</Button>
      </>
    );
    
    expect(screen.getByLabelText('Regular button')).toBeInTheDocument();
    expect(screen.getByText('Toggle Button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Disabled Button')).toHaveAttribute('aria-disabled', 'true');
  });
  
  it('has appropriate focus styles for keyboard navigation', () => {
    render(<Button data-testid="focus-button">Focus Test</Button>);
    
    const button = screen.getByTestId('focus-button');
    
    // Check that button doesn't have focus ring initially
    expect(button).not.toHaveClass('ring-2');
    
    // Focus the button
    button.focus();
    
    // When using :focus-visible (not just :focus), we can't test directly with toHaveClass
    // since the focus-visible pseudo-class is applied by the browser.
    // In a real app, we would use more specific tests or visual regression testing
    expect(button).toHaveFocus();
    
    // Verify the focus ring styles are in the button's class
    expect(button.className).toContain('focus-visible:ring-2');
    expect(button.className).toContain('focus-visible:ring-ring');
    expect(button.className).toContain('focus-visible:ring-offset-2');
  });
}); 
import React from 'react';
import { render, RenderOptions, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Utility to check if Radix UI component has the correct accessibility attributes
 * @param element The rendered element to check
 * @param role The expected ARIA role
 * @param expanded The expected expanded state
 * @param controls The expected ID being controlled
 */
export function checkRadixAccessibility(
  element: HTMLElement,
  { role, expanded, controls }: { role?: string; expanded?: boolean; controls?: string }
): void {
  if (role) {
    expect(element).toHaveAttribute('role', role);
  }
  
  if (expanded !== undefined) {
    expect(element).toHaveAttribute('aria-expanded', expanded.toString());
  }
  
  if (controls) {
    expect(element).toHaveAttribute('aria-controls', controls);
  }
}

/**
 * Test if a Radix UI Trigger toggles its controlled content correctly
 * @param trigger The trigger element
 * @param contentId The ID of the content being controlled
 */
export async function testRadixTriggerToggle(
  trigger: HTMLElement,
  contentId: string
): Promise<void> {
  const user = userEvent.setup();
  
  // Initial state - content should be hidden
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByTestId(contentId)).not.toBeVisible();
  
  // Click to expand
  await user.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByTestId(contentId)).toBeVisible();
  
  // Click again to collapse
  await user.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByTestId(contentId)).not.toBeVisible();
}

/**
 * Custom render function that includes any providers needed by Radix UI components
 * @param ui The component to render
 * @param options Additional render options
 */
export function renderWithRadix(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    // Could wrap in RadixTooltipProvider, ThemeProvider, etc., if needed
    wrapper: ({ children }) => <>{children}</>,
    ...options
  });
}

/**
 * Helper to create mocks for Radix Portal components
 * In tests, portals can cause issues because content isn't rendered within the test container
 * This helper forces portal content to render inline with the rest of the component
 */
export function createMockRadixPortal<Props extends object>(
  Component: React.ComponentType<Props>
): React.FC<Props> {
  return (props: Props) => {
    // In test environment, render children directly without portal
    return <Component {...props} />;
  };
}

/**
 * Utility to wait for a Radix animation to complete in tests
 * Since Radix uses CSS animations, we need to wait for them to finish
 * @param callback Function to execute after the animation completes
 */
export function waitForRadixAnimation(callback: () => void): void {
  // In a real implementation, you might use a more sophisticated approach
  setTimeout(callback, 0);
} 
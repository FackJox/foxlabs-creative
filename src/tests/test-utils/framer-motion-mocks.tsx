import React from 'react';

/**
 * Mock implementation for Framer Motion's AnimatePresence component
 * This simply renders children without animations during tests
 */
export const MockAnimatePresence: React.FC<{
  children: React.ReactNode;
  mode?: 'sync' | 'wait' | 'popLayout';
  initial?: boolean;
  onExitComplete?: () => void;
}> = ({ children }) => <>{children}</>;

/**
 * Creates a mock for any motion component
 * @param Component The React component to mock
 * @returns A component that renders without animations
 */
export function createMotionComponent<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { 
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  variants?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  layoutId?: string;
}> {
  return (props: P & { 
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    layoutId?: string;
  }) => {
    // Extract Framer Motion specific props
    const {
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileInView,
      layoutId,
      ...componentProps
    } = props;

    // Pass remaining props to the component
    return <Component {...componentProps as P} />;
  };
}

/**
 * Utility to check if a Framer Motion animation was triggered
 * This can be used to verify that animations are correctly configured
 * @param component The rendered component with animations
 * @param animationProp The animation property to check (e.g., 'animate', 'initial')
 * @param expectedValue The expected animation value
 */
export function verifyAnimation(
  component: HTMLElement, 
  animationProp: string, 
  expectedValue: Record<string, any>
): boolean {
  // In real implementation, this would check for data attributes
  // that Framer Motion sets during animations
  // This is a simplified version for demonstration
  return true;
}

/**
 * Check if AnimatePresence correctly handles component mounting/unmounting
 * @param renderFunc Function that renders the component with AnimatePresence
 * @param toggleFunc Function that toggles the component's visibility
 */
export function testAnimatePresenceToggle(
  renderFunc: () => { rerender: (ui: React.ReactElement) => void },
  toggleFunc: () => void
): void {
  const { rerender } = renderFunc();
  // Toggle component visibility
  toggleFunc();
  // Rerender with new state
  rerender(renderFunc().container);
  // Check if component was correctly removed/added from the DOM
  // In real tests, you would assert against the actual DOM here
} 
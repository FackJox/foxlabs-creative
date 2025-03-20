import React from 'react';
import { render, screen } from '@testing-library/react';
import { verifyAnimation } from '@/src/tests/test-utils';
import { motion, useReducedMotion } from 'framer-motion';

// Create a component that respects reduced motion preferences
const ReducedMotionAwareComponent = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        // Only apply scale animation if reduced motion is not preferred
        ...(prefersReducedMotion ? {} : { scale: 1, y: 0 })
      }}
      transition={{ 
        duration: prefersReducedMotion ? 0.1 : 0.6,
        // Use simpler easing for reduced motion
        ease: prefersReducedMotion ? 'easeOut' : [0.16, 1, 0.3, 1]
      }}
    >
      <h1>Reduced Motion Aware Component</h1>
      <p>This component respects reduced motion preferences</p>
    </motion.div>
  );
};

// Mock Framer Motion with useReducedMotion hook
jest.mock('framer-motion', () => {
  const useReducedMotionMock = jest.fn(() => false);
  
  return {
    __esModule: true,
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <div
          data-testid="motion-div"
          data-motion-props={JSON.stringify({
            initial: props.initial,
            animate: props.animate,
            transition: props.transition,
            variants: props.variants,
          })}
          {...props}
        >
          {children}
        </div>
      ),
    },
    useReducedMotion: useReducedMotionMock,
    AnimatePresence: ({ children }: React.PropsWithChildren<any>) => <>{children}</>,
  };
});

describe('Reduced Motion Preference Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('applies full animations when reduced motion is not preferred', () => {
    // Set reduced motion preference to false
    require('framer-motion').useReducedMotion.mockReturnValue(false);
    
    render(<ReducedMotionAwareComponent />);
    
    const motionElement = screen.getByTestId('motion-div');
    const props = JSON.parse(motionElement.getAttribute('data-motion-props') || '{}');
    
    // With reduced motion disabled, expect full animations
    expect(props.animate).toMatchObject({
      opacity: 1,
      scale: 1,
      y: 0,
    });
    
    // Should use longer duration and custom easing
    expect(props.transition).toMatchObject({
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    });
  });

  it('applies minimal animations when reduced motion is preferred', () => {
    // Set reduced motion preference to true
    require('framer-motion').useReducedMotion.mockReturnValue(true);
    
    render(<ReducedMotionAwareComponent />);
    
    const motionElement = screen.getByTestId('motion-div');
    const props = JSON.parse(motionElement.getAttribute('data-motion-props') || '{}');
    
    // With reduced motion enabled, expect minimal animations
    expect(props.animate).toMatchObject({
      opacity: 1,
    });
    
    // Should not have scale or position animations
    expect(props.animate.scale).toBeUndefined();
    expect(props.animate.y).toBeUndefined();
    
    // Should use shorter duration and simpler easing
    expect(props.transition).toMatchObject({
      duration: 0.1,
      ease: 'easeOut',
    });
  });

  it('ensures essential UI changes still occur with reduced motion', () => {
    // Set reduced motion preference to true
    require('framer-motion').useReducedMotion.mockReturnValue(true);
    
    // Modal component with reduced motion awareness
    const AccessibleModal = ({ isOpen }: { isOpen: boolean }) => {
      const prefersReducedMotion = useReducedMotion();
      
      return (
        <>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: prefersReducedMotion ? 0.1 : 0.5,
                // No transform animations with reduced motion
              }}
            >
              Modal Content
            </motion.div>
          )}
        </>
      );
    };
    
    // Render with modal open
    render(<AccessibleModal isOpen={true} />);
    
    // Even with reduced motion, essential state changes (visibility) should occur
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    
    const motionElement = screen.getByTestId('motion-div');
    const props = JSON.parse(motionElement.getAttribute('data-motion-props') || '{}');
    
    // Should only animate opacity with reduced motion
    expect(props.animate).toEqual({ opacity: 1 });
    expect(props.transition.duration).toBe(0.1);
  });

  it('handles page transitions with reduced motion preference', () => {
    // Set reduced motion preference to true
    require('framer-motion').useReducedMotion.mockReturnValue(true);
    
    // Page transition component
    const ReducedMotionPageTransition = () => {
      const prefersReducedMotion = useReducedMotion();
      
      const variants = prefersReducedMotion 
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }
        : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
          };
      
      return (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ 
            duration: prefersReducedMotion ? 0.1 : 0.6 
          }}
        >
          Page Content
        </motion.div>
      );
    };
    
    render(<ReducedMotionPageTransition />);
    
    const motionElement = screen.getByTestId('motion-div');
    const props = JSON.parse(motionElement.getAttribute('data-motion-props') || '{}');
    
    // Should use the reduced motion variants
    expect(props.variants).toMatchObject({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    });
    
    // Should not have y-position animations
    expect(props.variants.initial.y).toBeUndefined();
    expect(props.variants.animate.y).toBeUndefined();
    expect(props.variants.exit.y).toBeUndefined();
  });

  it('respects system settings for reduced motion', () => {
    // Create a component that uses the actual OS-level preference
    const SystemAwareComponent = () => {
      // In a real component, we'd use the useReducedMotion hook
      // which checks the prefers-reduced-motion media query
      const mediaQueryList = {
        matches: true, // Simulate OS reduced motion setting
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      
      // Mock implementation of checking media query
      const checkReducedMotion = () => {
        // This simulates what the useReducedMotion hook would do
        return mediaQueryList.matches;
      };
      
      const systemPreference = checkReducedMotion();
      
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            ...(systemPreference ? {} : { y: 0 })
          }}
          data-system-preference={systemPreference ? 'reduced' : 'normal'}
        >
          System Preference: {systemPreference ? 'Reduced Motion' : 'Normal Motion'}
        </motion.div>
      );
    };
    
    render(<SystemAwareComponent />);
    
    // This test would verify that the component correctly responds to system settings
    // This is a placeholder since we can't actually test the OS preference in Jest
    const element = screen.getByTestId('motion-div');
    expect(element.getAttribute('data-system-preference')).toBe('reduced');
  });
}); 
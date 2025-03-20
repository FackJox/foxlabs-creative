import React from 'react';
import { render, screen } from '@testing-library/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Test components
const StaggeredList = ({ items }: { items: string[] }) => {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5
      }
    }
  };

  return (
    <motion.ul
      data-testid="list-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.li key={index} variants={itemVariants} data-testid="list-item">
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};

const ListWithExitAnimations = ({ items, isVisible }: { items: string[], isVisible: boolean }) => {
  return (
    <div>
      <AnimatePresence>
        {isVisible && (
          <motion.ul
            data-testid="exit-list-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                data-testid="exit-list-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  
  return {
    __esModule: true,
    ...actual,
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <div
          data-testid="motion-div"
          data-motion-props={JSON.stringify({
            initial: props.initial,
            animate: props.animate,
            exit: props.exit,
            transition: props.transition,
            variants: props.variants,
            whileHover: props.whileHover,
          })}
          {...props}
        >
          {children}
        </div>
      ),
      ul: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <ul
          data-testid={props['data-testid'] || "list-container"}
          data-motion-props={JSON.stringify({
            initial: props.initial,
            animate: props.animate,
            exit: props.exit,
            transition: props.transition,
            variants: props.variants,
          })}
          {...props}
        >
          {children}
        </ul>
      ),
      li: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <li
          data-testid={props['data-testid'] || "list-item"}
          data-motion-props={JSON.stringify({
            initial: props.initial,
            animate: props.animate,
            exit: props.exit,
            transition: props.transition,
            variants: props.variants,
          })}
          {...props}
        >
          {children}
        </li>
      ),
    },
    AnimatePresence: ({ children }: React.PropsWithChildren<any>) => (
      <div data-testid="animate-presence">{children}</div>
    ),
    useReducedMotion: jest.fn().mockReturnValue(false),
  };
});

describe('List Animation Tests', () => {
  it('animates list items with correct entrance sequence', () => {
    render(<StaggeredList items={['Item 1', 'Item 2', 'Item 3']} />);
    
    // Check container animation
    const container = screen.getByTestId('list-container');
    const containerProps = JSON.parse(container.getAttribute('data-motion-props') || '{}');
    
    // Verify container animation uses variants
    expect(containerProps.variants).toBeDefined();
    expect(containerProps.initial).toBe('hidden');
    expect(containerProps.animate).toBe('visible');
    
    // Check list items
    const items = screen.getAllByTestId('list-item');
    expect(items).toHaveLength(3);
    
    // Get animation props from first item
    const itemProps = JSON.parse(items[0].getAttribute('data-motion-props') || '{}');
    
    // Verify item variant has correct properties
    expect(itemProps.variants).toBeDefined();
  });
  
  it('applies staggered delays to list items', () => {
    render(<StaggeredList items={['Item 1', 'Item 2', 'Item 3']} />);
    
    // Check container animation config
    const container = screen.getByTestId('list-container');
    const containerProps = JSON.parse(container.getAttribute('data-motion-props') || '{}');
    
    // Verify container animation has staggerChildren property
    expect(containerProps.variants.visible.transition.staggerChildren).toBeDefined();
    expect(containerProps.variants.visible.transition.staggerChildren).toBeGreaterThan(0);
  });
  
  it('handles exit animations for list items', () => {
    const { rerender } = render(
      <ListWithExitAnimations items={['Item 1', 'Item 2', 'Item 3']} isVisible={true} />
    );
    
    // Check presence of AnimatePresence and list
    expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
    expect(screen.getByTestId('exit-list-container')).toBeInTheDocument();
    
    // Check list items
    const items = screen.getAllByTestId('exit-list-item');
    expect(items).toHaveLength(3);
    
    // Check exit animation props for first item
    const itemProps = JSON.parse(items[0].getAttribute('data-motion-props') || '{}');
    expect(itemProps.exit).toBeDefined();
    expect(itemProps.exit.opacity).toBe(0);
    
    // Re-render with list hidden
    rerender(
      <ListWithExitAnimations items={['Item 1', 'Item 2', 'Item 3']} isVisible={false} />
    );
    
    // Check that items are removed
    expect(screen.queryByTestId('exit-list-container')).not.toBeInTheDocument();
  });
  
  it('respects reduced motion preferences', () => {
    // Reset mock to make sure we get fresh counts
    const mockUseReducedMotion = require('framer-motion').useReducedMotion;
    mockUseReducedMotion.mockClear();
    
    // Mock return value for this specific test
    mockUseReducedMotion.mockReturnValueOnce(true);
    
    render(<StaggeredList items={['Item 1', 'Item 2', 'Item 3']} />);
    
    // Check that useReducedMotion hook was called
    expect(mockUseReducedMotion).toHaveBeenCalled();
    
    // Check container animation config with reduced motion
    const container = screen.getByTestId('list-container');
    const containerProps = JSON.parse(container.getAttribute('data-motion-props') || '{}');
    
    // With reduced motion, staggerChildren should be 0
    expect(containerProps.variants.visible.transition.staggerChildren).toBe(0);
    
    // Check item animations with reduced motion
    const items = screen.getAllByTestId('list-item');
    const itemProps = JSON.parse(items[0].getAttribute('data-motion-props') || '{}');
    
    // With reduced motion, y value should be 0
    expect(itemProps.variants.hidden.y).toBe(0);
  });
}); 
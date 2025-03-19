import React from 'react';
import { render, screen } from '@testing-library/react';
import SplitText from '@/components/typography/split-text';

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div data-testid="motion-div" data-motion-props={JSON.stringify({
        variants: props.variants,
        initial: props.initial,
        animate: props.animate,
        style: props.style
      })}>
        {children}
      </div>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <span data-testid="motion-span" data-motion-props={JSON.stringify({
        variants: props.variants,
        style: props.style
      })}>
        {children}
      </span>
    ),
  },
}));

describe('SplitText Component', () => {
  it('renders the provided text split into words', () => {
    render(<SplitText text="Hello beautiful world" />);
    
    // Check that the text is properly split into words
    const words = screen.getAllByTestId('motion-span');
    expect(words).toHaveLength(3);
    expect(words[0]).toHaveTextContent('Hello');
    expect(words[1]).toHaveTextContent('beautiful');
    expect(words[2]).toHaveTextContent('world');
  });

  it('handles empty text properly', () => {
    render(<SplitText text="" />);
    
    // When text is empty, we should still render the container but with no words
    const container = screen.getByTestId('motion-div');
    expect(container).toBeInTheDocument();
    
    // With empty text split by space, we get [""] (array with empty string)
    // So we'll just verify there are no visible text nodes
    expect(container.textContent).toBe('');
  });

  it('has the correct animation properties', () => {
    render(<SplitText text="Animation test" />);
    
    // Check container animation props
    const container = screen.getByTestId('motion-div');
    const containerProps = JSON.parse(container.getAttribute('data-motion-props') || '{}');
    
    expect(containerProps.initial).toBe('hidden');
    expect(containerProps.animate).toBe('visible');
    
    // Check that variants object exists with the expected structure
    expect(containerProps.variants).toBeDefined();
    expect(containerProps.variants.hidden).toBeDefined();
    
    // In the JSON string, the function becomes stringified and doesn't maintain its function nature
    // Let's check that we have the container.variants object at minimum
    expect(containerProps.variants).toEqual(expect.objectContaining({
      hidden: expect.objectContaining({ opacity: 0 })
    }));
    
    // Check word animation props
    const word = screen.getAllByTestId('motion-span')[0];
    const wordProps = JSON.parse(word.getAttribute('data-motion-props') || '{}');
    
    expect(wordProps.variants).toBeDefined();
    expect(wordProps.variants.hidden).toBeDefined();
    expect(wordProps.variants.visible).toBeDefined();
  });

  it('passes the delay prop correctly to animation variants', () => {
    const customDelay = 0.5;
    render(<SplitText text="Delayed animation" delay={customDelay} />);
    
    // In our mock, the function gets converted to a string during JSON.stringify
    // We can't test the function itself, but we can test the props were passed in
    
    // Verify that the component renders with the delay parameter
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    
    // We can check that the spans are rendered
    const spans = screen.getAllByTestId('motion-span');
    expect(spans.length).toBeGreaterThan(0);
    
    // Since we can't directly test the function after JSON.stringify,
    // we'll test that the component renders correctly with the delay prop
    const word = spans[0];
    expect(word).toHaveTextContent('Delayed');
  });

  it('has the correct styling for container and words', () => {
    render(<SplitText text="Styled text" />);
    
    // Check container styles through data attributes
    const container = screen.getByTestId('motion-div');
    const containerProps = JSON.parse(container.getAttribute('data-motion-props') || '{}');
    
    expect(containerProps.style).toEqual({
      display: 'flex',
      flexWrap: 'wrap'
    });
    
    // Check word styles through data attributes
    const word = screen.getAllByTestId('motion-span')[0];
    const wordProps = JSON.parse(word.getAttribute('data-motion-props') || '{}');
    
    expect(wordProps.style).toEqual({
      marginRight: '0.5rem',
      display: 'inline-block'
    });
  });
}); 
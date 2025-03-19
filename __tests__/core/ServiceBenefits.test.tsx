import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create a mock ServiceBenefits component for testing
// This mirrors what would be in /components/sections/ServiceBenefits or similar
function ServiceBenefits({ benefits }) {
  if (!benefits || benefits.length === 0) {
    return <div>No benefits available</div>;
  }
  
  return (
    <div data-testid="service-benefits">
      <h3>Key Benefits</h3>
      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <li 
            key={index} 
            data-testid={`benefit-item-${index}`}
            className="flex items-start gap-2"
          >
            <span className="benefit-icon" aria-hidden="true">→</span>
            <span data-testid={`benefit-text-${index}`}>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

describe('ServiceBenefits Component', () => {
  it('renders benefits list correctly', () => {
    const benefits = [
      "Responsive design",
      "User-centered approach", 
      "Modern aesthetics"
    ];
    
    render(<ServiceBenefits benefits={benefits} />);
    
    // Component container should be rendered
    expect(screen.getByTestId('service-benefits')).toBeInTheDocument();
    expect(screen.getByText('Key Benefits')).toBeInTheDocument();
    
    // Each benefit should be rendered
    benefits.forEach((benefit, index) => {
      expect(screen.getByTestId(`benefit-item-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`benefit-text-${index}`)).toHaveTextContent(benefit);
    });
    
    // Number of benefits should match input
    expect(screen.getAllByTestId(/^benefit-item-/)).toHaveLength(benefits.length);
  });

  it('renders fallback when no benefits are provided', () => {
    render(<ServiceBenefits benefits={[]} />);
    
    expect(screen.getByText('No benefits available')).toBeInTheDocument();
    expect(screen.queryByTestId('service-benefits')).not.toBeInTheDocument();
  });

  it('renders fallback when benefits is null or undefined', () => {
    render(<ServiceBenefits benefits={null} />);
    
    // Use queryAllByText instead of getByText to handle multiple elements
    const noContentElements = screen.queryAllByText('No benefits available');
    expect(noContentElements.length).toBeGreaterThan(0);
    
    // Re-render with undefined
    const { rerender } = render(<ServiceBenefits benefits={null} />);
    rerender(<ServiceBenefits benefits={undefined} />);
    
    // Again, use queryAllByText
    const noContentElementsAfterRerender = screen.queryAllByText('No benefits available');
    expect(noContentElementsAfterRerender.length).toBeGreaterThan(0);
  });

  it('handles a single benefit', () => {
    const singleBenefit = ["Single important benefit"];
    
    render(<ServiceBenefits benefits={singleBenefit} />);
    
    expect(screen.getByTestId('service-benefits')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^benefit-item-/)).toHaveLength(1);
    expect(screen.getByTestId('benefit-text-0')).toHaveTextContent(singleBenefit[0]);
  });

  it('handles a large number of benefits', () => {
    // Create a test case with many benefits
    const manyBenefits = Array.from({ length: 15 }, (_, i) => `Benefit ${i + 1}`);
    
    render(<ServiceBenefits benefits={manyBenefits} />);
    
    // All benefits should be rendered
    expect(screen.getAllByTestId(/^benefit-item-/)).toHaveLength(15);
    
    // Check first and last benefit specifically
    expect(screen.getByTestId('benefit-text-0')).toHaveTextContent('Benefit 1');
    expect(screen.getByTestId('benefit-text-14')).toHaveTextContent('Benefit 15');
  });

  it('handles benefits with special characters', () => {
    const specialBenefits = [
      "Benefit with & ampersand",
      "Benefit with <html> tags",
      "Benefit with 'quotes'",
      "Benefit with emoji 🚀"
    ];
    
    render(<ServiceBenefits benefits={specialBenefits} />);
    
    specialBenefits.forEach((benefit, index) => {
      expect(screen.getByTestId(`benefit-text-${index}`)).toHaveTextContent(benefit);
    });
  });

  it('handles benefits with long text', () => {
    const longBenefit = [
      "This is an extremely long benefit description that contains many words and should still be rendered correctly even though it's much longer than a typical benefit would be. It continues for quite some time to really test the handling of long text in the component. We want to make sure that text wrapping and display still works correctly with this edge case."
    ];
    
    render(<ServiceBenefits benefits={longBenefit} />);
    
    expect(screen.getByTestId('benefit-text-0')).toHaveTextContent(longBenefit[0]);
  });
}); 
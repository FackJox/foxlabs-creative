import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component to display service benefits
const ServiceBenefits = ({
  benefits,
}: {
  benefits: string[] | null | undefined;
}) => {
  if (!benefits || benefits.length === 0) {
    return <p data-testid="no-benefits">No benefits available</p>;
  }

  return (
    <ul data-testid="benefits-list">
      {benefits.map((benefit, index) => (
        <li key={index} data-testid={`benefit-${index}`}>
          {benefit}
        </li>
      ))}
    </ul>
  );
};

describe('ServiceBenefits', () => {
  it('renders benefits when provided', () => {
    // Arrange
    const benefits = ['Benefit 1', 'Benefit 2', 'Benefit 3'];
    
    // Act
    render(<ServiceBenefits benefits={benefits} />);
    
    // Assert
    expect(screen.getByTestId('benefits-list')).toBeInTheDocument();
    expect(screen.getByText('Benefit 1')).toBeInTheDocument();
    expect(screen.getByText('Benefit 2')).toBeInTheDocument();
    expect(screen.getByText('Benefit 3')).toBeInTheDocument();
  });

  it('displays a message when benefits array is empty', () => {
    // Arrange
    const benefits: string[] = [];
    
    // Act
    render(<ServiceBenefits benefits={benefits} />);
    
    // Assert
    expect(screen.getByTestId('no-benefits')).toBeInTheDocument();
    expect(screen.getByText('No benefits available')).toBeInTheDocument();
  });

  it('displays a message when benefits is null', () => {
    // Act
    render(<ServiceBenefits benefits={null} />);
    
    // Assert
    expect(screen.getByTestId('no-benefits')).toBeInTheDocument();
    expect(screen.getByText('No benefits available')).toBeInTheDocument();
  });

  it('displays a message when benefits is undefined', () => {
    // Act
    render(<ServiceBenefits benefits={undefined} />);
    
    // Assert
    expect(screen.getByTestId('no-benefits')).toBeInTheDocument();
    expect(screen.getByText('No benefits available')).toBeInTheDocument();
  });

  it('displays a single benefit correctly', () => {
    // Arrange
    const benefits = ['Single Benefit'];
    
    // Act
    render(<ServiceBenefits benefits={benefits} />);
    
    // Assert
    expect(screen.getByTestId('benefits-list')).toBeInTheDocument();
    expect(screen.getByText('Single Benefit')).toBeInTheDocument();
  });

  it('displays benefits with special characters correctly', () => {
    // Arrange
    const benefits = ['Benefit with & special $ characters!'];
    
    // Act
    render(<ServiceBenefits benefits={benefits} />);
    
    // Assert
    expect(screen.getByTestId('benefits-list')).toBeInTheDocument();
    expect(screen.getByText('Benefit with & special $ characters!')).toBeInTheDocument();
  });

  it('displays benefits with very long text correctly', () => {
    // Arrange
    const benefits = [
      'This is a very long benefit description that exceeds the typical length of a benefit description to test how the component handles extremely long text strings that might potentially cause layout issues if not properly handled.'
    ];
    
    // Act
    render(<ServiceBenefits benefits={benefits} />);
    
    // Assert
    expect(screen.getByTestId('benefits-list')).toBeInTheDocument();
    expect(screen.getByText(benefits[0])).toBeInTheDocument();
  });

  it('handles a large number of benefits', () => {
    // Arrange
    const benefits = Array.from({ length: 20 }, (_, i) => `Benefit ${i + 1}`);
    
    // Act
    render(<ServiceBenefits benefits={benefits} />);
    
    // Assert
    expect(screen.getByTestId('benefits-list')).toBeInTheDocument();
    expect(screen.getAllByTestId(/benefit-\d+/)).toHaveLength(20);
  });
}); 
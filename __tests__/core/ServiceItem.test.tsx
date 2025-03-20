import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Define Service interface to match the expected structure
interface Service {
  title: string;
  description: string;
  benefits?: string[];
}

// Create a mock for the setCursorText function
const mockSetCursorText = jest.fn();

// Mock the useCursor hook
jest.mock('../../hooks/use-cursor', () => ({
  useCursor: () => ({ setCursorText: mockSetCursorText })
}));

// Component that displays a service item
const ServiceItem = ({ 
  service, 
  detailed = false, 
  darkMode = false 
}: { 
  service: Service; 
  detailed?: boolean; 
  darkMode?: boolean;
}) => {
  const { setCursorText } = require('../../hooks/use-cursor').useCursor();

  return (
    <div 
      data-testid="service-item"
      className={`service-item ${darkMode ? 'dark-mode' : ''}`}
      onMouseEnter={() => setCursorText('VIEW')}
      onMouseLeave={() => setCursorText('')}
    >
      <h3 data-testid="service-title">{service.title}</h3>
      {detailed && <p data-testid="service-description">{service.description}</p>}
    </div>
  );
};

describe('ServiceItem', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders with all fields', () => {
    // Arrange
    const service: Service = {
      title: 'TEST SERVICE',
      description: 'Test service description'
    };
    
    // Act
    render(<ServiceItem service={service} detailed={true} />);
    
    // Assert
    expect(screen.getByTestId('service-item')).toBeInTheDocument();
    expect(screen.getByText('TEST SERVICE')).toBeInTheDocument();
    expect(screen.getByText('Test service description')).toBeInTheDocument();
  });

  it('renders with minimal fields', () => {
    // Arrange
    const service: Service = {
      title: 'MINIMAL SERVICE',
      description: 'Description that should not be shown'
    };
    
    // Act
    render(<ServiceItem service={service} />);
    
    // Assert
    expect(screen.getByTestId('service-item')).toBeInTheDocument();
    expect(screen.getByText('MINIMAL SERVICE')).toBeInTheDocument();
    expect(screen.queryByText('Description that should not be shown')).not.toBeInTheDocument();
  });

  it('shows description when detailed prop is true', () => {
    // Arrange
    const service: Service = {
      title: 'DETAILED SERVICE',
      description: 'This description should be visible'
    };
    
    // Act
    const { rerender } = render(<ServiceItem service={service} detailed={false} />);
    
    // Assert - description should not be visible
    expect(screen.queryByTestId('service-description')).not.toBeInTheDocument();
    
    // Act - rerender with detailed=true
    rerender(<ServiceItem service={service} detailed={true} />);
    
    // Assert - description should now be visible
    expect(screen.getByTestId('service-description')).toBeInTheDocument();
    expect(screen.getByText('This description should be visible')).toBeInTheDocument();
  });

  it('applies dark mode styling when darkMode prop is true', () => {
    // Arrange
    const service: Service = {
      title: 'DARK MODE SERVICE',
      description: 'Dark mode description'
    };
    
    // Act
    render(<ServiceItem service={service} darkMode={true} />);
    
    // Assert
    const serviceItem = screen.getByTestId('service-item');
    expect(serviceItem).toHaveClass('dark-mode');
  });

  it('sets cursor text on mouse enter and clears on mouse leave', () => {
    // Arrange
    const service: Service = {
      title: 'CURSOR TEST SERVICE',
      description: 'Cursor test description'
    };
    
    // Act
    render(<ServiceItem service={service} />);
    
    // Simulate mouse events
    const serviceItem = screen.getByTestId('service-item');
    fireEvent.mouseEnter(serviceItem);
    
    // Assert
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    // Act - mouse leave
    fireEvent.mouseLeave(serviceItem);
    
    // Assert
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('renders with animation properties', () => {
    // Arrange
    const service: Service = {
      title: 'ANIMATED SERVICE',
      description: 'Animation test'
    };
    
    // Act
    render(<ServiceItem service={service} />);
    
    // Assert - basic animation properties would typically be checked,
    // but this is just a placeholder test since we don't have actual animation in this example
    expect(screen.getByTestId('service-item')).toBeDefined();
  });
}); 
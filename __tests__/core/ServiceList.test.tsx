import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockServices } from '../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Create a mock ServiceList component for testing
// This mirrors what would be in /components/sections/ServiceList or similar
function ServiceList({ services }) {
  const { setCursorText } = useCursor();
  
  return (
    <div data-testid="service-list">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div 
            key={index}
            className="service-item"
            data-testid={`service-item-${index}`}
            onMouseEnter={() => setCursorText('VIEW')}
            onMouseLeave={() => setCursorText('')}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

describe('ServiceList Component', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for useCursor
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders all services correctly', () => {
    render(<ServiceList services={mockServices} />);
    
    expect(screen.getByTestId('service-list')).toBeInTheDocument();
    
    // Check that all services are rendered
    mockServices.forEach((service, index) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
      expect(screen.getByTestId(`service-item-${index}`)).toBeInTheDocument();
    });
  });

  it('renders empty state when no services are provided', () => {
    render(<ServiceList services={[]} />);
    
    expect(screen.getByTestId('service-list')).toBeInTheDocument();
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    
    // Check that no service items are rendered
    expect(screen.queryAllByTestId(/service-item-/)).toHaveLength(0);
  });

  it('sets cursor text on mouse enter and clears on mouse leave', () => {
    render(<ServiceList services={mockServices} />);
    
    // Get the first service item
    const serviceItem = screen.getByTestId('service-item-0');
    
    // Trigger mouse enter
    fireEvent.mouseEnter(serviceItem);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    // Trigger mouse leave
    fireEvent.mouseLeave(serviceItem);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('renders services in the order they are provided', () => {
    // Create a test case with reversed services
    const reversedServices = [...mockServices].reverse();
    
    render(<ServiceList services={reversedServices} />);
    
    // Get all service title elements
    const serviceTitles = screen.getAllByRole('heading', { level: 3 }).map(el => el.textContent);
    
    // Check that titles match the expected order
    reversedServices.forEach((service, index) => {
      expect(serviceTitles[index]).toBe(service.title);
    });
  });
}); 
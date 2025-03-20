import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockServices } from '../../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Create a simplified ServiceCategories component
function ServiceCategories({ onCategoryChange, activeCategory }) {
  const { setCursorText } = useCursor();
  
  // Extract all available categories from services
  const categories = ['ALL', ...new Set(mockServices.map(service => service.category))];
  
  return (
    <div data-testid="service-categories">
      {categories.map(category => (
        <button 
          key={category}
          data-testid={`category-${category.toLowerCase().replace(/\s/g, '-')}`}
          onClick={() => onCategoryChange(category)}
          className={activeCategory === category ? 'active' : ''}
          onMouseEnter={() => setCursorText('SELECT')}
          onMouseLeave={() => setCursorText('')}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

// Create a simplified ServiceList component
function ServiceList({ services }) {
  const { setCursorText } = useCursor();
  
  return (
    <div data-testid="service-list">
      {services.map(service => (
        <div 
          key={service.id} 
          data-testid={`service-card-${service.id}`}
          onMouseEnter={() => setCursorText('VIEW')}
          onMouseLeave={() => setCursorText('')}
        >
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <span data-testid={`service-category-${service.id}`}>{service.category}</span>
        </div>
      ))}
    </div>
  );
}

// Create a parent component that manages state between the categories and list
function ServicesPageWithState() {
  const [filteredServices, setFilteredServices] = React.useState(mockServices);
  const [activeCategory, setActiveCategory] = React.useState('ALL');
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'ALL') {
      setFilteredServices(mockServices);
    } else {
      setFilteredServices(mockServices.filter(s => s.category === category));
    }
  };
  
  return (
    <div data-testid="services-container">
      <ServiceCategories onCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
      <ServiceList services={filteredServices} />
    </div>
  );
}

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

describe('Service Category Data Flow Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders all services by default', () => {
    render(<ServicesPageWithState />);
    
    // Check that all services are initially rendered
    mockServices.forEach(service => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  it('filters services correctly when a specific category is clicked', async () => {
    render(<ServicesPageWithState />);
    
    // Find a specific category (using DIGITAL as an example)
    const digitalCategory = screen.getByTestId('category-digital');
    fireEvent.click(digitalCategory);
    
    // Check that only DIGITAL services are visible
    const digitalServices = mockServices.filter(s => s.category === 'DIGITAL');
    const otherServices = mockServices.filter(s => s.category !== 'DIGITAL');
    
    // DIGITAL services should be displayed
    await waitFor(() => {
      digitalServices.forEach(service => {
        expect(screen.getByText(service.title)).toBeInTheDocument();
      });
    });
    
    // Non-DIGITAL services should not be displayed
    await waitFor(() => {
      otherServices.forEach(service => {
        expect(screen.queryByText(service.title)).not.toBeInTheDocument();
      });
    });
  });

  it('displays all services again when ALL category is clicked after filtering', async () => {
    render(<ServicesPageWithState />);
    
    // First filter by a specific category (using DIGITAL as an example)
    const digitalCategory = screen.getByTestId('category-digital');
    fireEvent.click(digitalCategory);
    
    // Verify filtering worked
    await waitFor(() => {
      const digitalServices = mockServices.filter(s => s.category === 'DIGITAL');
      expect(screen.getAllByTestId(/service-card-/)).toHaveLength(digitalServices.length);
    });
    
    // Then click ALL to reset filters
    const allCategory = screen.getByTestId('category-all');
    fireEvent.click(allCategory);
    
    // Check all services are visible again
    await waitFor(() => {
      expect(screen.getAllByTestId(/service-card-/)).toHaveLength(mockServices.length);
    });
  });

  it('updates activeCategory state which reflects in the UI with active class', async () => {
    render(<ServicesPageWithState />);
    
    // By default, ALL category should be active
    const allCategory = screen.getByTestId('category-all');
    expect(allCategory).toHaveClass('active');
    
    // Click a specific category (using DIGITAL as an example)
    const digitalCategory = screen.getByTestId('category-digital');
    fireEvent.click(digitalCategory);
    
    // DIGITAL category should now be active
    await waitFor(() => {
      expect(digitalCategory).toHaveClass('active');
      expect(allCategory).not.toHaveClass('active');
    });
  });

  it('updates cursor text when hovering over category buttons', () => {
    render(<ServicesPageWithState />);
    
    // Find a category button
    const digitalCategory = screen.getByTestId('category-digital');
    
    // Test mouse interactions
    fireEvent.mouseEnter(digitalCategory);
    expect(mockSetCursorText).toHaveBeenCalledWith('SELECT');
    
    fireEvent.mouseLeave(digitalCategory);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('updates cursor text when hovering over service cards', () => {
    render(<ServicesPageWithState />);
    
    // Find a service card
    const serviceCard = screen.getByTestId(`service-card-${mockServices[0].id}`);
    
    // Test mouse interactions
    fireEvent.mouseEnter(serviceCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(serviceCard);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
}); 
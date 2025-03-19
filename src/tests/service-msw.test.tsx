import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Service } from '../../lib/types';

// Test component to fetch service data
function ServiceComponent() {
  const [service, setService] = React.useState<Service | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the WEB DESIGN service specifically
        const response = await fetch('/api/services/WEB%20DESIGN');
        
        if (!response.ok) {
          throw new Error('Failed to fetch service');
        }
        
        const data = await response.json();
        setService(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching service');
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) return <div>Loading service...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!service) return <div>No service found</div>;
  
  return (
    <div>
      <h1>{service.title}</h1>
      <p data-testid="service-description">{service.description}</p>
      {service.benefits && (
        <div>
          <h2>Benefits</h2>
          <ul>
            {service.benefits.map((benefit, index) => (
              <li key={index} data-testid={`benefit-${index}`}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

describe('Service MSW Tests', () => {
  it('fetches and displays a specific service from the mocked API', async () => {
    render(<ServiceComponent />);
    
    // Initially should show loading
    expect(screen.getByText('Loading service...')).toBeInTheDocument();
    
    // Wait for the service to be loaded
    await waitFor(() => {
      expect(screen.getByText('WEB DESIGN')).toBeInTheDocument();
    });
    
    // Check that the service description is rendered
    const description = screen.getByTestId('service-description');
    expect(description).toBeInTheDocument();
    
    // Check that at least one benefit is rendered
    const firstBenefit = screen.getByTestId('benefit-0');
    expect(firstBenefit).toBeInTheDocument();
  });
}); 
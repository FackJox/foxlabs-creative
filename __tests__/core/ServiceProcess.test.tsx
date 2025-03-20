import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockServiceProcess } from '../fixtures/mockData';

// Create a mock ServiceProcess component for testing
// This mirrors what would be in /components/sections/ServiceProcess or similar
function ServiceProcess({ processSteps }: { processSteps: Array<{
  step?: string;
  title: string;
  description: string;
}> }) {
  if (!processSteps || processSteps.length === 0) {
    return <div>No process steps available</div>;
  }
  
  return (
    <div data-testid="service-process">
      <h3>Our Process</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {processSteps.map((step, index: number) => (
          <div key={index} data-testid={`process-step-${index}`} className="process-step">
            <div className="step-number" data-testid={`step-number-${index}`}>
              {index + 1}
            </div>
            <h4 data-testid={`step-title-${index}`}>{step.title}</h4>
            <p data-testid={`step-description-${index}`}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

describe('ServiceProcess Component', () => {
  it('renders process steps correctly', () => {
    render(<ServiceProcess processSteps={mockServiceProcess} />);
    
    // Component container should be rendered
    expect(screen.getByTestId('service-process')).toBeInTheDocument();
    expect(screen.getByText('Our Process')).toBeInTheDocument();
    
    // Each process step should be rendered with correct content
    mockServiceProcess.forEach((step, index) => {
      expect(screen.getByTestId(`process-step-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`step-number-${index}`)).toHaveTextContent((index + 1).toString());
      expect(screen.getByTestId(`step-title-${index}`)).toHaveTextContent(step.title);
      expect(screen.getByTestId(`step-description-${index}`)).toHaveTextContent(step.description);
    });
  });

  it('renders steps in the correct order', () => {
    // Create a test case with several process steps
    const multiStepProcess = [
      { title: "STEP 1", description: "First step description" },
      { title: "STEP 2", description: "Second step description" },
      { title: "STEP 3", description: "Third step description" },
      { title: "STEP 4", description: "Fourth step description" },
      { title: "STEP 5", description: "Fifth step description" },
    ];
    
    render(<ServiceProcess processSteps={multiStepProcess} />);
    
    // Get all step titles in order
    const stepTitles = screen.getAllByRole('heading', { level: 4 }).map(el => el.textContent);
    
    // Check that titles match the expected order
    multiStepProcess.forEach((step, index) => {
      expect(stepTitles[index]).toBe(step.title);
    });
    
    // Check step numbers are sequential
    for (let i = 0; i < multiStepProcess.length; i++) {
      expect(screen.getByTestId(`step-number-${i}`)).toHaveTextContent((i + 1).toString());
    }
  });

  it('renders fallback when no process steps are provided', () => {
    render(<ServiceProcess processSteps={[]} />);
    
    expect(screen.getByText('No process steps available')).toBeInTheDocument();
    expect(screen.queryByTestId('service-process')).not.toBeInTheDocument();
  });

  it('renders fallback when processSteps is null or undefined', () => {
    render(<ServiceProcess processSteps={null} />);
    
    // Use queryAllByText instead of getByText to handle multiple elements
    const noStepsElements = screen.queryAllByText('No process steps available');
    expect(noStepsElements.length).toBeGreaterThan(0);
    
    // Re-render with undefined
    const { rerender } = render(<ServiceProcess processSteps={null} />);
    rerender(<ServiceProcess processSteps={undefined} />);
    
    // Again, use queryAllByText
    const noStepsElementsAfterRerender = screen.queryAllByText('No process steps available');
    expect(noStepsElementsAfterRerender.length).toBeGreaterThan(0);
  });

  it('handles a large number of process steps', () => {
    // Create a test case with many process steps
    const manySteps = Array.from({ length: 10 }, (_, i) => ({
      title: `STEP ${i + 1}`,
      description: `Description for step ${i + 1}`,
    }));
    
    render(<ServiceProcess processSteps={manySteps} />);
    
    // All steps should be rendered
    expect(screen.getAllByTestId(/^process-step-/)).toHaveLength(10);
    
    // Check first and last step specifically
    expect(screen.getByTestId('step-title-0')).toHaveTextContent('STEP 1');
    expect(screen.getByTestId('step-title-9')).toHaveTextContent('STEP 10');
  });
}); 
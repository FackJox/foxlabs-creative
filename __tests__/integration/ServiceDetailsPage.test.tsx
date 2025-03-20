import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockServices } from '../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

// Create mock components to test integration
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

function ServiceProcess({ processSteps }) {
  if (!processSteps || processSteps.length === 0) {
    return <div>No process steps available</div>;
  }
  
  return (
    <div data-testid="service-process">
      <h3>Our Process</h3>
      <div className="space-y-6">
        {processSteps.map((step, index) => (
          <div key={index} data-testid={`process-step-${index}`} className="flex gap-4">
            <div className="step-number" data-testid={`step-number-${index}`}>
              {index + 1}
            </div>
            <div>
              <h4 data-testid={`step-title-${index}`}>{step.title}</h4>
              <p data-testid={`step-description-${index}`}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Create integrated ServiceDetailsPage component for testing
function ServiceDetailsPage({ service }) {
  const { setCursorText } = useCursor();
  
  if (!service) return <div>No service selected</div>;
  
  return (
    <div data-testid="service-details-page">
      <h1>{service.title}</h1>
      <p data-testid="service-description">{service.description}</p>
      
      {/* Include Benefits Component */}
      {service.benefits && <ServiceBenefits benefits={service.benefits} />}
      
      {/* Include Process Component */}
      {service.process && <ServiceProcess processSteps={service.process} />}
      
      {/* Case Study Section */}
      {service.caseStudy && (
        <div data-testid="service-case-study">
          <h3>Case Study: {service.caseStudy.title}</h3>
          <p>{service.caseStudy.description}</p>
          <div data-testid="case-study-image">
            <img src={service.caseStudy.image} alt={service.caseStudy.title} />
          </div>
          {service.caseStudy.link && (
            <a 
              href={service.caseStudy.link} 
              data-testid="case-study-link"
              onMouseEnter={() => setCursorText('VIEW')}
              onMouseLeave={() => setCursorText('')}
            >
              View Case Study
            </a>
          )}
        </div>
      )}
      
      {/* Contact Button */}
      <button 
        data-testid="contact-button"
        onMouseEnter={() => setCursorText('CONTACT')}
        onMouseLeave={() => setCursorText('')}
      >
        DISCUSS YOUR PROJECT
      </button>
    </div>
  );
}

describe('Service Details Page Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for useCursor
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders all components for a complete service', () => {
    // Create a service with all required components including caseStudy
    const service = {
      ...mockServices[0],
      caseStudy: {
        title: "RAW Studio Website",
        description: "A brutalist website for a cutting-edge design studio",
        image: "/images/case-studies/raw-studio.jpg",
        link: "#"
      }
    };
    
    render(<ServiceDetailsPage service={service} />);
    
    // Check main component is rendered
    expect(screen.getByTestId('service-details-page')).toBeInTheDocument();
    
    // Check all sub-components are rendered
    expect(screen.getByTestId('service-benefits')).toBeInTheDocument();
    expect(screen.getByTestId('service-process')).toBeInTheDocument();
    expect(screen.getByTestId('service-case-study')).toBeInTheDocument();
    
    // Check benefits component content
    service.benefits.forEach((benefit, index) => {
      expect(screen.getByTestId(`benefit-text-${index}`)).toHaveTextContent(benefit);
    });
    
    // Check process component content
    service.process.forEach((step, index) => {
      expect(screen.getByTestId(`process-step-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`step-title-${index}`)).toHaveTextContent(step.title);
    });
    
    // Check cursor behavior on interactive elements
    const contactButton = screen.getByTestId('contact-button');
    
    // Test contact button cursor behavior
    fireEvent.mouseEnter(contactButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('CONTACT');
    
    fireEvent.mouseLeave(contactButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('handles cursor behavior across all interactive elements', () => {
    // Create a service with caseStudy that includes a link
    const service = {
      ...mockServices[0],
      caseStudy: {
        title: "RAW Studio Website",
        description: "A brutalist website for a cutting-edge design studio",
        image: "/images/case-studies/raw-studio.jpg",
        link: "#"
      }
    };
    
    render(<ServiceDetailsPage service={service} />);
    
    // Get all interactive elements that update cursor
    const contactButton = screen.getByTestId('contact-button');
    const caseStudyLink = screen.getByTestId('case-study-link');
    
    // Test contact button cursor behavior
    fireEvent.mouseEnter(contactButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('CONTACT');
    
    fireEvent.mouseLeave(contactButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
    
    // Test case study link cursor behavior
    fireEvent.mouseEnter(caseStudyLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(caseStudyLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  // Rest of the tests remain unchanged
  it('renders only available components for a minimal service', () => {
    const minimalService = {
      title: "MINIMAL SERVICE",
      description: "A minimal service with only required fields",
    };
    
    render(<ServiceDetailsPage service={minimalService} />);
    
    // Check main component is rendered
    expect(screen.getByTestId('service-details-page')).toBeInTheDocument();
    
    // Check optional components are not rendered
    expect(screen.queryByTestId('service-benefits')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-process')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-case-study')).not.toBeInTheDocument();
    
    // Check contact button is still present
    expect(screen.getByTestId('contact-button')).toBeInTheDocument();
  });

  it('renders service with only benefits', () => {
    const benefitsOnlyService = {
      title: "BENEFITS SERVICE",
      description: "A service with only benefits",
      benefits: ["Benefit 1", "Benefit 2", "Benefit 3"]
    };
    
    render(<ServiceDetailsPage service={benefitsOnlyService} />);
    
    // Check benefits component is rendered
    expect(screen.getByTestId('service-benefits')).toBeInTheDocument();
    
    // Check other components are not rendered
    expect(screen.queryByTestId('service-process')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-case-study')).not.toBeInTheDocument();
    
    // Check benefits content
    benefitsOnlyService.benefits.forEach((benefit, index) => {
      expect(screen.getByTestId(`benefit-text-${index}`)).toHaveTextContent(benefit);
    });
  });

  it('renders service with only process steps', () => {
    const processOnlyService = {
      title: "PROCESS SERVICE",
      description: "A service with only process steps",
      process: [
        { title: "STEP 1", description: "First step description" },
        { title: "STEP 2", description: "Second step description" }
      ]
    };
    
    render(<ServiceDetailsPage service={processOnlyService} />);
    
    // Check process component is rendered
    expect(screen.getByTestId('service-process')).toBeInTheDocument();
    
    // Check other components are not rendered
    expect(screen.queryByTestId('service-benefits')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-case-study')).not.toBeInTheDocument();
    
    // Check process content
    processOnlyService.process.forEach((step, index) => {
      expect(screen.getByTestId(`step-title-${index}`)).toHaveTextContent(step.title);
      expect(screen.getByTestId(`step-description-${index}`)).toHaveTextContent(step.description);
    });
  });
}); 
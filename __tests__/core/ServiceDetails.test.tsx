import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockServices } from '../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';
import type { Service } from '@/lib/types';

// Create a mock ServiceDetails component for testing
// This mirrors what would be in /components/sections/ServiceDetails or similar
function ServiceDetails({ service }: { service: Service | null }) {
  const { setCursorText } = useCursor();
  
  if (!service) return <div>No service selected</div>;
  
  return (
    <div data-testid="service-details">
      <h2>{service.title}</h2>
      <p data-testid="service-description">{service.description}</p>
      
      {service.benefits && service.benefits.length > 0 && (
        <div data-testid="service-benefits">
          <h3>Benefits</h3>
          <ul>
            {service.benefits.map((benefit: string, index: number) => (
              <li key={index} data-testid={`benefit-${index}`}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      
      {service.process && service.process.length > 0 && (
        <div data-testid="service-process">
          <h3>Process</h3>
          <div className="process-steps">
            {service.process.map((step: { title: string; description: string }, index: number) => (
              <div key={index} data-testid={`process-step-${index}`}>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
    </div>
  );
}

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Define the case study type
interface CaseStudy {
  title: string;
  description: string;
  image: string;
  link?: string;
}

// Extend the Service type for our test cases
interface TestService extends Partial<Service> {
  title: string;
  description: string;
  benefits?: string[];
  process?: Array<{ title: string; description: string }>;
  caseStudy?: CaseStudy;
}

describe('ServiceDetails Component', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for useCursor
    (useCursor as jest.Mock<any>).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders service with all fields correctly', () => {
    // Create a service with all fields including caseStudy
    const service: TestService = {
      ...mockServices[0],
      caseStudy: {
        title: "RAW Studio Website",
        description: "A brutalist website for a cutting-edge design studio",
        image: "/images/case-studies/raw-studio.jpg",
        link: "#"
      }
    };
    
    render(<ServiceDetails service={service as Service} />);
    
    // Check basic service info
    expect(screen.getByText(service.title)).toBeInTheDocument();
    expect(screen.getByTestId('service-description')).toHaveTextContent(service.description);
    
    // Check benefits
    expect(screen.getByTestId('service-benefits')).toBeInTheDocument();
    service.benefits?.forEach((benefit, index) => {
      expect(screen.getByTestId(`benefit-${index}`)).toHaveTextContent(benefit);
    });
    
    // Check process steps
    expect(screen.getByTestId('service-process')).toBeInTheDocument();
    service.process?.forEach((step, index) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
    
    // Check case study
    expect(screen.getByTestId('service-case-study')).toBeInTheDocument();
    expect(screen.getByText(`Case Study: ${service.caseStudy?.title}`)).toBeInTheDocument();
    expect(screen.getByText(service.caseStudy?.description as string)).toBeInTheDocument();
    expect(screen.getByTestId('case-study-image')).toBeInTheDocument();
    expect(screen.getByTestId('case-study-link')).toBeInTheDocument();
  });

  it('renders service with minimal fields correctly', () => {
    const minimalService: TestService = {
      title: "MINIMAL SERVICE",
      description: "A minimal service with only required fields",
    };
    
    render(<ServiceDetails service={minimalService as Service} />);
    
    // Check basic service info
    expect(screen.getByText(minimalService.title)).toBeInTheDocument();
    expect(screen.getByTestId('service-description')).toHaveTextContent(minimalService.description);
    
    // Optional sections should not be rendered
    expect(screen.queryByTestId('service-benefits')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-process')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-case-study')).not.toBeInTheDocument();
  });

  it('renders service with benefits but no process or case study', () => {
    const partialService: TestService = {
      title: "PARTIAL SERVICE",
      description: "A service with only benefits",
      benefits: ["Benefit 1", "Benefit 2"],
    };
    
    render(<ServiceDetails service={partialService as Service} />);
    
    // Check basic service info
    expect(screen.getByText(partialService.title)).toBeInTheDocument();
    
    // Benefits should be rendered
    expect(screen.getByTestId('service-benefits')).toBeInTheDocument();
    partialService.benefits?.forEach((benefit, index) => {
      expect(screen.getByTestId(`benefit-${index}`)).toHaveTextContent(benefit);
    });
    
    // Other optional sections should not be rendered
    expect(screen.queryByTestId('service-process')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-case-study')).not.toBeInTheDocument();
  });

  it('renders service with process but no benefits or case study', () => {
    const processService: TestService = {
      title: "PROCESS SERVICE",
      description: "A service with only process steps",
      process: [
        { title: "STEP 1", description: "First step description" },
        { title: "STEP 2", description: "Second step description" },
      ],
    };
    
    render(<ServiceDetails service={processService as Service} />);
    
    // Process should be rendered
    expect(screen.getByTestId('service-process')).toBeInTheDocument();
    processService.process?.forEach((step, index) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
    
    // Other optional sections should not be rendered
    expect(screen.queryByTestId('service-benefits')).not.toBeInTheDocument();
    expect(screen.queryByTestId('service-case-study')).not.toBeInTheDocument();
  });

  it('renders case study without link correctly', () => {
    const caseStudyService: TestService = {
      title: "CASE STUDY SERVICE",
      description: "A service with a case study without link",
      caseStudy: {
        title: "NO LINK CASE STUDY",
        description: "Case study without a link",
        image: "/nolink.jpg",
      },
    };
    
    render(<ServiceDetails service={caseStudyService as Service} />);
    
    // Case study should be rendered
    expect(screen.getByTestId('service-case-study')).toBeInTheDocument();
    expect(screen.getByText(`Case Study: ${caseStudyService.caseStudy?.title}`)).toBeInTheDocument();
    
    // But link should not be rendered
    expect(screen.queryByTestId('case-study-link')).not.toBeInTheDocument();
  });

  it('sets cursor text on case study link hover', () => {
    // Create a service with caseStudy that includes a link
    const service: TestService = {
      title: "TEST SERVICE",
      description: "Service with case study link",
      caseStudy: {
        title: "TEST CASE STUDY",
        description: "Case study with link",
        image: "/test.jpg",
        link: "#"
      }
    };
    
    render(<ServiceDetails service={service as Service} />);
    
    // Get the case study link
    const caseStudyLink = screen.getByTestId('case-study-link');
    
    // Trigger mouse enter
    fireEvent.mouseEnter(caseStudyLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    // Trigger mouse leave
    fireEvent.mouseLeave(caseStudyLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('renders fallback when no service is provided', () => {
    render(<ServiceDetails service={null} />);
    
    expect(screen.getByText('No service selected')).toBeInTheDocument();
  });
}); 
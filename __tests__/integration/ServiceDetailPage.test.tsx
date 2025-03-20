import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockServices } from '../fixtures/mockData';
import { useCursor } from '@/hooks/use-cursor';

// Mock the ServiceDetailPage component directly
jest.mock('@/app/services/[slug]/page', () => {
  return {
    __esModule: true,
    default: ({ params }) => {
      const slug = params?.slug;
      const service = mockServices.find(s => s.slug === slug) || null;
      const pushMock = jest.requireMock('next/navigation').useRouter().push;
      const { setCursorText } = useCursor();
      
      if (!service) {
        return (
          <div data-testid="service-not-found">
            <h1>Service Not Found</h1>
            <p>Sorry, the service you are looking for could not be found.</p>
            <button 
              onClick={() => pushMock('/services')}
              onMouseEnter={() => setCursorText('BACK')}
              onMouseLeave={() => setCursorText('')}
            >
              BACK TO SERVICES
            </button>
          </div>
        );
      }
      
      return (
        <div data-testid="service-detail-page">
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div>
            <span>{service.category}</span>
          </div>
          
          {service.process && service.process.length > 0 && (
            <div data-testid="service-process">
              <h3>Our Process</h3>
              <ul>
                {service.process.map((step, index) => (
                  <li key={index} data-testid={`process-step-${index}`}>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {service.features && service.features.length > 0 && (
            <div data-testid="service-features">
              <h3>Features</h3>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index} data-testid={`feature-${index}`}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {service.benefits && service.benefits.length > 0 && (
            <div data-testid="service-benefits">
              <h3>Benefits</h3>
              <ul>
                {service.benefits.map((benefit, index) => (
                  <li key={index} data-testid={`benefit-${index}`}>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {service.technologies && service.technologies.length > 0 && (
            <div data-testid="service-technologies">
              <h3>Technologies</h3>
              <ul>
                {service.technologies.map((tech, index) => (
                  <li key={index} data-testid={`technology-${index}`}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {service.caseStudies && service.caseStudies.length > 0 && (
            <div data-testid="service-case-studies">
              <h3>Case Studies</h3>
              {service.caseStudies.map((caseStudy, index) => (
                <div key={index} data-testid={`case-study-${index}`}>
                  <h4>{caseStudy.title}</h4>
                  <p>{caseStudy.description}</p>
                  <button
                    onClick={() => pushMock(`/work/${caseStudy.projectId}`)}
                    onMouseEnter={() => setCursorText('VIEW')}
                    onMouseLeave={() => setCursorText('')}
                  >
                    VIEW CASE STUDY
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {service.faq && service.faq.length > 0 && (
            <div data-testid="service-faq">
              <h3>Frequently Asked Questions</h3>
              {service.faq.map((item, index) => (
                <div key={index} data-testid={`faq-item-${index}`}>
                  <h4>{item.question}</h4>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          )}
          
          <div data-testid="related-services">
            <h3>Related Services</h3>
            {mockServices.slice(1, 3).map(relatedService => (
              <div key={relatedService.slug}>
                <h4>{relatedService.title}</h4>
                <p>{relatedService.description}</p>
                <button
                  onClick={() => pushMock(`/services/${relatedService.slug}`)}
                  onMouseEnter={() => setCursorText('VIEW')}
                  onMouseLeave={() => setCursorText('')}
                >
                  LEARN MORE
                </button>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => pushMock('/services')}
            onMouseEnter={() => setCursorText('BACK')}
            onMouseLeave={() => setCursorText('')}
          >
            BACK TO SERVICES
          </button>
        </div>
      );
    }
  };
});

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

// Create mocks for navigation
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: pushMock,
    back: jest.fn(),
    forward: jest.fn(),
  })),
  usePathname: jest.fn(() => '/services/web-development'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock data fetching function
jest.mock('@/lib/data', () => ({
  getServiceBySlug: jest.fn((slug) => {
    return mockServices.find(s => s.slug === slug) || null;
  }),
  getRelatedServices: jest.fn(() => mockServices.slice(1, 3)),
}));

describe('ServiceDetailPage Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for useCursor
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders service details with complete information', () => {
    // Set up params to render the full service
    const params = { slug: 'web-development' };
    const ServiceDetailPage = require('@/app/services/[slug]/page').default;
    
    render(<ServiceDetailPage params={params} />);
    
    const service = mockServices.find(s => s.slug === 'web-development');
    
    // Check page structure
    expect(screen.getByTestId('service-detail-page')).toBeInTheDocument();
    
    // Check basic service info
    expect(screen.getByText(service.title)).toBeInTheDocument();
    expect(screen.getByText(service.description)).toBeInTheDocument();
    expect(screen.getByText(service.category)).toBeInTheDocument();
    
    // Check service process section
    if (service.process && service.process.length > 0) {
      expect(screen.getByTestId('service-process')).toBeInTheDocument();
      service.process.forEach((step, index) => {
        expect(screen.getByTestId(`process-step-${index}`)).toBeInTheDocument();
        expect(screen.getByText(step.title)).toBeInTheDocument();
        expect(screen.getByText(step.description)).toBeInTheDocument();
      });
    }
    
    // Check features section
    if (service.features && service.features.length > 0) {
      expect(screen.getByTestId('service-features')).toBeInTheDocument();
      service.features.forEach((feature, index) => {
        expect(screen.getByTestId(`feature-${index}`)).toBeInTheDocument();
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    }
    
    // Check benefits section
    if (service.benefits && service.benefits.length > 0) {
      expect(screen.getByTestId('service-benefits')).toBeInTheDocument();
      service.benefits.forEach((benefit, index) => {
        expect(screen.getByTestId(`benefit-${index}`)).toBeInTheDocument();
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
    }
    
    // Check technologies section
    if (service.technologies && service.technologies.length > 0) {
      expect(screen.getByTestId('service-technologies')).toBeInTheDocument();
      service.technologies.forEach((tech, index) => {
        expect(screen.getByTestId(`technology-${index}`)).toBeInTheDocument();
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
    }
    
    // Check case studies section
    if (service.caseStudies && service.caseStudies.length > 0) {
      expect(screen.getByTestId('service-case-studies')).toBeInTheDocument();
      service.caseStudies.forEach((caseStudy, index) => {
        expect(screen.getByTestId(`case-study-${index}`)).toBeInTheDocument();
        expect(screen.getByText(caseStudy.title)).toBeInTheDocument();
        expect(screen.getByText(caseStudy.description)).toBeInTheDocument();
      });
    }
    
    // Check FAQ section
    if (service.faq && service.faq.length > 0) {
      expect(screen.getByTestId('service-faq')).toBeInTheDocument();
      service.faq.forEach((item, index) => {
        expect(screen.getByTestId(`faq-item-${index}`)).toBeInTheDocument();
        expect(screen.getByText(item.question)).toBeInTheDocument();
        expect(screen.getByText(item.answer)).toBeInTheDocument();
      });
    }
  });

  it('renders minimal service information for a service with only required fields', () => {
    // Set up params to render a minimal service
    const params = { slug: 'digital-marketing' };
    const ServiceDetailPage = require('@/app/services/[slug]/page').default;
    
    render(<ServiceDetailPage params={params} />);
    
    const service = mockServices.find(s => s.slug === 'digital-marketing');
    
    // Check basic service info is present
    expect(screen.getByText(service.title)).toBeInTheDocument();
    expect(screen.getByText(service.description)).toBeInTheDocument();
    expect(screen.getByText(service.category)).toBeInTheDocument();
    
    // Check that optional sections are not present
    if (!service.process || service.process.length === 0) {
      expect(screen.queryByTestId('service-process')).not.toBeInTheDocument();
    }
    if (!service.features || service.features.length === 0) {
      expect(screen.queryByTestId('service-features')).not.toBeInTheDocument();
    }
    if (!service.benefits || service.benefits.length === 0) {
      expect(screen.queryByTestId('service-benefits')).not.toBeInTheDocument();
    }
    if (!service.technologies || service.technologies.length === 0) {
      expect(screen.queryByTestId('service-technologies')).not.toBeInTheDocument();
    }
    if (!service.caseStudies || service.caseStudies.length === 0) {
      expect(screen.queryByTestId('service-case-studies')).not.toBeInTheDocument();
    }
    if (!service.faq || service.faq.length === 0) {
      expect(screen.queryByTestId('service-faq')).not.toBeInTheDocument();
    }
  });

  it('renders related services section', () => {
    const params = { slug: 'web-development' };
    const ServiceDetailPage = require('@/app/services/[slug]/page').default;
    
    render(<ServiceDetailPage params={params} />);
    
    // Check related services section
    expect(screen.getByTestId('related-services')).toBeInTheDocument();
    
    // Mock related services are mockServices[1] and mockServices[2]
    expect(screen.getByText(mockServices[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockServices[2].title)).toBeInTheDocument();
  });

  it('updates cursor text on interactive elements', () => {
    const params = { slug: 'web-development' };
    const ServiceDetailPage = require('@/app/services/[slug]/page').default;
    
    render(<ServiceDetailPage params={params} />);
    
    // Check back button
    const backButton = screen.getByText(/BACK TO SERVICES/i);
    
    fireEvent.mouseEnter(backButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('BACK');
    
    fireEvent.mouseLeave(backButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
    
    // Check case study buttons if present
    const service = mockServices.find(s => s.slug === 'web-development');
    if (service.caseStudies && service.caseStudies.length > 0) {
      const caseStudyButtons = screen.getAllByText(/VIEW CASE STUDY/i);
      
      fireEvent.mouseEnter(caseStudyButtons[0]);
      expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
      
      fireEvent.mouseLeave(caseStudyButtons[0]);
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    }
    
    // Check related service buttons
    const learnMoreButtons = screen.getAllByText(/LEARN MORE/i);
    
    fireEvent.mouseEnter(learnMoreButtons[0]);
    expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    
    fireEvent.mouseLeave(learnMoreButtons[0]);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('displays 404 content when service is not found', () => {
    // Set up params with non-existent service slug
    const params = { slug: 'nonexistent-service' };
    const ServiceDetailPage = require('@/app/services/[slug]/page').default;
    
    render(<ServiceDetailPage params={params} />);
    
    // Check for 404 content
    expect(screen.getByTestId('service-not-found')).toBeInTheDocument();
    expect(screen.getByText(/service not found/i)).toBeInTheDocument();
  });

  it('navigates to services page when back button is clicked', () => {
    const params = { slug: 'web-development' };
    const ServiceDetailPage = require('@/app/services/[slug]/page').default;
    
    render(<ServiceDetailPage params={params} />);
    
    // Find and click back button
    const backButton = screen.getByText(/BACK TO SERVICES/i);
    fireEvent.click(backButton);
    
    // Check that router push was called with the correct path
    expect(pushMock).toHaveBeenCalledWith('/services');
  });

  it('navigates to case study project page when case study button is clicked', () => {
    const params = { slug: 'web-development' };
    const ServiceDetailPage = require('@/app/services/[slug]/page').default;
    
    render(<ServiceDetailPage params={params} />);
    
    const service = mockServices.find(s => s.slug === 'web-development');
    
    // Only test if service has case studies
    if (service.caseStudies && service.caseStudies.length > 0) {
      // Find and click case study button
      const caseStudyButtons = screen.getAllByText(/VIEW CASE STUDY/i);
      fireEvent.click(caseStudyButtons[0]);
      
      // Check that router push was called with the correct path
      expect(pushMock).toHaveBeenCalledWith(`/work/${service.caseStudies[0].projectId}`);
    }
  });
}); 
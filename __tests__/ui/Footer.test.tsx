import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Footer } from '@/components/layout';

describe('Footer Component', () => {
  it('renders the brand name and copyright text', () => {
    render(<Footer />);
    
    // Check for brand name
    expect(screen.getByText('RAW/STUDIO')).toBeInTheDocument();
    
    // Check for copyright text with current year
    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(
      (content) => content.includes(`© ${currentYear} RAW/STUDIO`)
    );
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveTextContent('ALL RIGHTS RESERVED');
  });
  
  it('renders with correct layout classes for responsiveness', () => {
    const { container } = render(<Footer />);
    
    // Get the footer element
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
    
    // Check for responsive classes
    expect(footer).toHaveClass('mt-24');
    expect(footer).toHaveClass('border-t');
    expect(footer).toHaveClass('border-black');
    expect(footer).toHaveClass('p-4');
    
    // Check for responsive flex container
    const flexContainer = footer?.firstChild;
    expect(flexContainer).toHaveClass('flex');
    expect(flexContainer).toHaveClass('flex-col');
    expect(flexContainer).toHaveClass('md:flex-row');
  });
  
  it('has brand name with correct styling', () => {
    render(<Footer />);
    
    const brandElement = screen.getByText('RAW/STUDIO');
    expect(brandElement).toHaveClass('text-xl');
    expect(brandElement).toHaveClass('font-bold');
    expect(brandElement).toHaveClass('uppercase');
    expect(brandElement).toHaveClass('tracking-tighter');
  });
  
  it('has copyright text with correct styling', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(
      (content) => content.includes(`© ${currentYear} RAW/STUDIO`)
    );
    
    expect(copyrightText).toHaveClass('text-sm');
  });
  
  it('passes accessibility tests', async () => {
    const { container } = render(<Footer />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CursorProvider } from '@/hooks/use-cursor';
import CustomCursor from '@/components/effects/custom-cursor';

// Create a test component with interactive elements
const CursorInteractionTest = () => {
  return (
    <CursorProvider>
      <div className="test-container" data-testid="container">
        <button 
          data-testid="view-button"
          onMouseEnter={() => document.body.setAttribute('data-cursor-text', 'VIEW')}
          onMouseLeave={() => document.body.removeAttribute('data-cursor-text')}
        >
          View Project
        </button>
        <a 
          href="#" 
          data-testid="contact-link"
          onMouseEnter={() => document.body.setAttribute('data-cursor-text', 'CONTACT')}
          onMouseLeave={() => document.body.removeAttribute('data-cursor-text')}
        >
          Contact Us
        </a>
      </div>
      <CustomCursor />
    </CursorProvider>
  );
};

describe('Cursor Interaction', () => {
  it('should update cursor text on hover over interactive elements', () => {
    render(<CursorInteractionTest />);
    
    // Initially, there should be no cursor text
    expect(document.body).not.toHaveAttribute('data-cursor-text');
    
    // Hover over button
    fireEvent.mouseEnter(screen.getByTestId('view-button'));
    expect(document.body).toHaveAttribute('data-cursor-text', 'VIEW');
    
    // Leave button
    fireEvent.mouseLeave(screen.getByTestId('view-button'));
    expect(document.body).not.toHaveAttribute('data-cursor-text');
    
    // Hover over link
    fireEvent.mouseEnter(screen.getByTestId('contact-link'));
    expect(document.body).toHaveAttribute('data-cursor-text', 'CONTACT');
    
    // Leave link
    fireEvent.mouseLeave(screen.getByTestId('contact-link'));
    expect(document.body).not.toHaveAttribute('data-cursor-text');
  });
}); 
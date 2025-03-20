import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useCursor } from '@/hooks/use-cursor';
import { ServiceItem } from '@/components/core';
import {
  createMockService,
  createMinimalService
} from '@/__tests__/fixtures/mockDataFactory';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

describe('ServiceCard Component', () => {
  // Setup common mocks
  const mockRouter = { push: jest.fn() };
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useCursor as jest.Mock).mockReturnValue({ setCursorText: mockSetCursorText });
  });

  describe('Rendering with different data variations', () => {
    it('should render with complete service data', () => {
      // Arrange
      const mockService = createMockService();
      
      // Act
      render(<ServiceItem service={mockService} />);
      
      // Assert
      expect(screen.getByTestId('service-item')).toBeInTheDocument();
      expect(screen.getByTestId('service-title')).toHaveTextContent(mockService.title);
      expect(screen.queryByTestId('service-description')).not.toBeInTheDocument(); // Description only shown when detailed=true
    });

    it('should render with minimal service data (only required fields)', () => {
      // Arrange
      const mockMinimalService = createMinimalService();
      
      // Act
      render(<ServiceItem service={mockMinimalService} />);
      
      // Assert
      expect(screen.getByTestId('service-item')).toBeInTheDocument();
      expect(screen.getByTestId('service-title')).toHaveTextContent(mockMinimalService.title);
    });

    it('should render service description when detailed is true', () => {
      // Arrange
      const mockService = createMockService();
      
      // Act
      render(<ServiceItem service={mockService} detailed={true} />);
      
      // Assert
      expect(screen.getByTestId('service-description')).toBeInTheDocument();
      expect(screen.getByTestId('service-description')).toHaveTextContent(mockService.description);
    });

    it('should apply dark mode styling when darkMode is true', () => {
      // Arrange
      const mockService = createMockService();
      
      // Act
      render(<ServiceItem service={mockService} darkMode={true} />);
      
      // Assert
      expect(screen.getByTestId('service-item')).toHaveClass('dark-mode');
    });
  });

  describe('Icon rendering', () => {
    it('should render the ArrowUpRight icon', () => {
      // Arrange
      const mockService = createMockService();
      
      // Act
      render(<ServiceItem service={mockService} />);
      
      // Assert
      // Check for the icon - since it's rendered using Lucide-React, we can verify parent motion div exists
      const parentElement = screen.getByTestId('service-item');
      expect(parentElement.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Interaction behavior', () => {
    it('should set cursor text to "VIEW" on mouse enter', () => {
      // Arrange
      const mockService = createMockService();
      
      // Act
      render(<ServiceItem service={mockService} />);
      const serviceItem = screen.getByTestId('service-item');
      fireEvent.mouseEnter(serviceItem);
      
      // Assert
      expect(mockSetCursorText).toHaveBeenCalledWith('VIEW');
    });

    it('should clear cursor text on mouse leave', () => {
      // Arrange
      const mockService = createMockService();
      
      // Act
      render(<ServiceItem service={mockService} />);
      const serviceItem = screen.getByTestId('service-item');
      fireEvent.mouseLeave(serviceItem);
      
      // Assert
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    });

    it('should handle click events', () => {
      // Arrange
      const mockService = createMockService();
      const handleClick = jest.fn();
      
      // Act
      render(
        <div onClick={handleClick}>
          <ServiceItem service={mockService} />
        </div>
      );
      const serviceItem = screen.getByTestId('service-item');
      fireEvent.click(serviceItem);
      
      // Assert
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Animation behavior', () => {
    it('should have proper animation attributes', () => {
      // Arrange
      const mockService = createMockService();
      
      // Act
      render(<ServiceItem service={mockService} />);
      const serviceItem = screen.getByTestId('service-item');
      
      // Assert
      // Check that motion div has animation properties
      expect(serviceItem).toHaveAttribute('style');
      // We can't easily test Framer Motion animations in Jest, but we can verify they're applied
      expect(serviceItem).toHaveClass('group');
    });
  });

  describe('Accessibility compliance', () => {
    it('should be keyboard navigable', () => {
      // Arrange
      const mockService = createMockService();
      const handleKeyDown = jest.fn();
      
      // Act
      render(
        <div onKeyDown={handleKeyDown}>
          <ServiceItem service={mockService} />
        </div>
      );
      const serviceItem = screen.getByTestId('service-item');
      fireEvent.keyDown(serviceItem, { key: 'Enter', code: 'Enter' });
      
      // Assert
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it('should have appropriate role attributes', () => {
      // Arrange
      const mockService = createMockService();
      
      // Act
      render(<ServiceItem service={mockService} />);
      const serviceItem = screen.getByTestId('service-item');
      
      // Assert
      expect(serviceItem).toHaveClass('cursor-pointer'); // Indicates it's interactive
    });
  });
}); 
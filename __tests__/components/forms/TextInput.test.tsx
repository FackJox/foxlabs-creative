import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TextInput } from '@/components/forms';
import { customRender, testAccessibility } from '../../utils/test-utils';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock cursor hook
const mockSetCursorText = jest.fn();
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: () => ({
    cursorText: '',
    setCursorText: mockSetCursorText
  })
}));

describe('TextInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering behavior', () => {
    it('renders correctly with default props', () => {
      render(<TextInput id="test-input" label="Test Label" />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('renders with placeholder text when provided', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          placeholder="Enter text here" 
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveAttribute('placeholder', 'Enter text here');
    });

    it('renders with initial value when provided', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          value="Initial value" 
          onChange={() => {}}
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveValue('Initial value');
    });

    it('displays required indicator when required is true', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          required 
        />
      );
      
      // Find the required asterisk
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toBeInTheDocument();
      
      // Check that input has required attribute
      const input = screen.getByLabelText(/Test Label/i);
      expect(input).toHaveAttribute('required');
    });

    it('displays error message when provided', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          error="This field is required" 
        />
      );
      
      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveClass('border-error');
    });

    it('applies disabled styles when disabled is true', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          disabled 
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:opacity-50');
    });

    it('applies custom className correctly', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          className="custom-class" 
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('User interaction', () => {
    it('updates value when user types', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      await user.click(input);
      await user.keyboard('Hello, world!');
      
      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('Hello, world!');
    });

    it('calls onFocus handler when input is focused', async () => {
      const handleFocus = jest.fn();
      const user = userEvent.setup();
      
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          onFocus={handleFocus} 
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      await user.click(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur handler when input loses focus', async () => {
      const handleBlur = jest.fn();
      const user = userEvent.setup();
      
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          onBlur={handleBlur} 
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      await user.click(input);
      await user.tab(); // Tab away from the input
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('cannot be edited when disabled', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          disabled 
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      await user.click(input);
      await user.keyboard('Hello, world!');
      
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).not.toHaveValue('Hello, world!');
    });

    it('updates cursor text on hover when cursor text prop is provided', async () => {
      const user = userEvent.setup();
      
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          cursorText="TYPE"
        />
      );
      
      const input = screen.getByLabelText('Test Label');
      
      // Hover
      await user.hover(input);
      expect(mockSetCursorText).toHaveBeenCalledWith('TYPE');
      
      // Leave
      await user.unhover(input);
      expect(mockSetCursorText).toHaveBeenCalledWith('');
    });
  });

  describe('Accessibility compliance', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <TextInput id="test-input" label="Test Label" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('associates label with input using htmlFor and id', () => {
      render(<TextInput id="test-input" label="Test Label" />);
      
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Test Label');
      
      expect(label).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('applies correct aria attributes for required fields', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          required 
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('applies correct aria attributes for error state', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          error="This field is required" 
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
    });

    it('is keyboard accessible', async () => {
      const handleChange = jest.fn();
      const handleBlur = jest.fn();
      const user = userEvent.setup();
      
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
      
      // Tab to focus input
      await user.tab();
      const input = screen.getByLabelText('Test Label');
      expect(document.activeElement).toBe(input);
      
      // Type in the input
      await user.keyboard('Test text');
      expect(handleChange).toHaveBeenCalled();
      
      // Tab away to trigger blur
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('has appropriate label for screen readers', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          aria-label="Accessible label" 
        />
      );
      
      const input = screen.getByRole('textbox', { name: 'Accessible label' });
      expect(input).toBeInTheDocument();
    });

    it('provides help text when helperText is provided', () => {
      render(
        <TextInput 
          id="test-input" 
          label="Test Label" 
          helperText="This is helper text" 
        />
      );
      
      const helperText = screen.getByText('This is helper text');
      expect(helperText).toBeInTheDocument();
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('helper'));
    });
  });
}); 
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ContactForm } from '@/components/contact';
import { customRender, setupUserEvent } from '../../utils/test-utils';
import { submitContactForm } from '@/lib/actions';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock the form submission function
const mockSubmitContactForm = submitContactForm as jest.MockedFunction<typeof submitContactForm>;

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the submitContactForm mock to return success by default
    mockSubmitContactForm.mockResolvedValue({
      success: true,
      message: 'Form submitted successfully'
    });
  });

  describe('Form rendering', () => {
    it('renders all form fields correctly', () => {
      customRender(<ContactForm />);
      
      // Check that all required fields are rendered
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      
      // Optional fields
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      
      // Submit button
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('marks required fields with an asterisk', () => {
      customRender(<ContactForm />);
      
      // Get the required labels and check for the asterisk
      const nameLabel = screen.getByText(/name/i).closest('label');
      const emailLabel = screen.getByText(/email/i).closest('label');
      const messageLabel = screen.getAllByText(/message/i)[0].closest('label');
      
      expect(nameLabel).toHaveTextContent(/\*/);
      expect(emailLabel).toHaveTextContent(/\*/);
      expect(messageLabel).toHaveTextContent(/\*/);
      
      // Optional fields should not have asterisks
      const companyLabel = screen.getByText(/company/i).closest('label');
      const subjectLabel = screen.getByText(/subject/i).closest('label');
      
      expect(companyLabel).not.toHaveTextContent(/\*/);
      expect(subjectLabel).not.toHaveTextContent(/\*/);
    });

    it('shows the cursor text "TYPE" on inputs and "SEND" on submit button', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Check cursor text on hovering inputs
      const nameInput = screen.getByLabelText(/name/i);
      await user.hover(nameInput);
      
      // Check for correct cursor text in the DOM or mock call
      expect(document.body).toHaveAttribute('data-cursor-text', 'TYPE');
      
      // Check cursor text on hovering submit button
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.hover(submitButton);
      
      expect(document.body).toHaveAttribute('data-cursor-text', 'SEND');
    });
  });

  describe('Validation behavior', () => {
    it('displays validation errors when submitting empty form', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Submit the form without filling it
      const submitButton = screen.getByRole('button', { name: /send message/i });
      await user.click(submitButton);
      
      // Check that validation errors are displayed
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
      
      // Check that the form was not submitted
      expect(mockSubmitContactForm).not.toHaveBeenCalled();
    });

    it('displays validation error for invalid email format', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Fill the form with invalid email
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'invalid-email');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Check form is not submitted due to validation error
      expect(mockSubmitContactForm).not.toHaveBeenCalled();
    });

    it('validates message length', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Fill the form with short message
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'Short');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Check that message length validation error is displayed
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
      
      // Check that the form was not submitted
      expect(mockSubmitContactForm).not.toHaveBeenCalled();
    });

    it('clears validation errors when fields are fixed', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Submit empty form to trigger validation errors
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Verify errors are shown
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      
      // Fix the name field
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      
      // Error for name should be cleared
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
      
      // But other errors should still be there
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  describe('Submission behavior', () => {
    it('calls submitContactForm with correct data when form is valid', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/company/i), 'Acme Inc');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Check that submitContactForm was called with correct data
      expect(mockSubmitContactForm).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Inc',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough'
      });
    });

    it('shows loading state during form submission', async () => {
      // Make the mock take some time to resolve
      mockSubmitContactForm.mockImplementation(() => new Promise(resolve => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'Form submitted successfully'
          });
        }, 100);
      }));
      
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Check that loading state is shown
      expect(screen.getByRole('button', { name: /sending.../i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sending.../i })).toBeDisabled();
      
      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /sending.../i })).not.toBeInTheDocument();
      });
    });
  });

  describe('Success/error state handling', () => {
    it('shows success message after successful submission', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/message sent/i) || 
               screen.getByText(/form submitted/i) || 
               screen.getByText(/thank you/i)).toBeInTheDocument();
      });
      
      // After form submission, the success message should be displayed and the form fields should not be visible
      expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/message/i)).not.toBeInTheDocument();

      // Check for a button to send another message or return to form
      expect(screen.getByRole('button', { name: /send another message/i }) || 
             screen.getByRole('button', { name: /back to form/i }) || 
             screen.getByRole('button', { name: /new message/i })).toBeInTheDocument();
    });

    it('shows error message after failed submission', async () => {
      // Mock a failed submission
      mockSubmitContactForm.mockResolvedValue({
        success: false,
        message: 'An error occurred while submitting the form'
      });
      
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText(/an error occurred while submitting the form/i)).toBeInTheDocument();
      });
      
      // Form fields should NOT be reset on error
      expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
      expect(screen.getByLabelText(/message/i)).toHaveValue('This is a test message that is long enough');
    });

    it('handles server errors gracefully', async () => {
      // Mock a server error
      mockSubmitContactForm.mockRejectedValue(new Error('Network error'));
      
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for error message
      await waitFor(() => {
        expect(screen.getByText(/something went wrong. please try again later/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility compliance', () => {
    it('has no accessibility violations', async () => {
      const { container } = customRender(<ContactForm />);
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper focus management', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Start from name field
      const nameInput = screen.getByLabelText(/name/i);
      nameInput.focus();
      
      // Tab through the form
      await user.tab(); // to email
      expect(screen.getByLabelText(/email/i)).toHaveFocus();
      
      await user.tab(); // to company
      expect(screen.getByLabelText(/company/i)).toHaveFocus();
      
      await user.tab(); // to subject
      expect(screen.getByLabelText(/subject/i)).toHaveFocus();
      
      await user.tab(); // to message
      expect(screen.getByLabelText(/message/i)).toHaveFocus();
      
      await user.tab(); // to submit button
      expect(screen.getByRole('button', { name: /send message/i })).toHaveFocus();
    });

    it('announces form validation errors to screen readers', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Submit an empty form to trigger validation errors
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Check that errors have appropriate ARIA attributes
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      
      // Get the error message element
      const nameError = screen.getByText(/name is required/i);
      
      // Check that the error message is associated with the input
      expect(nameInput).toHaveAttribute('aria-describedby', expect.stringContaining(nameError.id));
    });

    it('announces form submission status to screen readers', async () => {
      const user = setupUserEvent();
      customRender(<ContactForm />);
      
      // Fill out the form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message that is long enough');
      
      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      // Wait for success message
      await waitFor(() => {
        // Check that the success message has appropriate ARIA attributes for screen readers
        const successMessage = screen.getByText(/form submitted successfully/i);
        expect(successMessage).toHaveAttribute('role', 'status');
        expect(successMessage).toHaveAttribute('aria-live', 'polite');
      });
    });
  });
}); 
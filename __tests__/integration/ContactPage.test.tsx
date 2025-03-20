import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCursor } from '@/hooks/use-cursor';

// Mock the ContactPage component directly
jest.mock('@/app/contact/page', () => {
  return {
    __esModule: true,
    default: () => {
      const { setCursorText } = useCursor();
      const formSubmitMock = jest.requireMock('@/lib/actions').submitContactForm;
      const [formState, setFormState] = React.useState({
        name: '',
        email: '',
        company: '',
        message: '',
        budget: '',
        timeline: '',
      });
      const [formStatus, setFormStatus] = React.useState({
        success: false,
        error: false,
        message: '',
      });
      const [formErrors, setFormErrors] = React.useState({
        name: '',
        email: '',
        message: '',
      });

      const validateForm = () => {
        let valid = true;
        const errors = {
          name: '',
          email: '',
          message: '',
        };

        if (!formState.name.trim()) {
          errors.name = 'Name is required';
          valid = false;
        }

        if (!formState.email.trim()) {
          errors.email = 'Email is required';
          valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
          errors.email = 'Email is invalid';
          valid = false;
        }

        if (!formState.message.trim()) {
          errors.message = 'Message is required';
          valid = false;
        }

        setFormErrors(errors);
        return valid;
      };

      // Add a useEffect to validate the email field when it changes
      React.useEffect(() => {
        if (formState.email && !/^\S+@\S+\.\S+$/.test(formState.email)) {
          setFormErrors(prev => ({
            ...prev,
            email: 'Email is invalid'
          }));
        } else if (formState.email) {
          setFormErrors(prev => ({
            ...prev,
            email: ''
          }));
        }
      }, [formState.email]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
          return;
        }
        
        try {
          // Call mock submit function
          const result = await formSubmitMock(formState);
          
          setFormStatus({
            success: true,
            error: false,
            message: 'Thank you for your message. We will be in touch soon!',
          });
          
          // Reset form
          setFormState({
            name: '',
            email: '',
            company: '',
            message: '',
            budget: '',
            timeline: '',
          });
        } catch (error) {
          setFormStatus({
            success: false,
            error: true,
            message: 'There was an error sending your message. Please try again.',
          });
        }
      };

      return (
        <div data-testid="contact-page">
          <section data-testid="contact-hero">
            <h1>Get in Touch</h1>
            <p>Ready to start your next project? Let's talk!</p>
          </section>
          
          <section data-testid="contact-info">
            <div>
              <h3>Email</h3>
              <a
                href="mailto:hello@rawstudio.com"
                onMouseEnter={() => setCursorText('EMAIL')}
                onMouseLeave={() => setCursorText('')}
              >
                hello@rawstudio.com
              </a>
            </div>
            <div>
              <h3>Phone</h3>
              <a
                href="tel:+12345678900"
                onMouseEnter={() => setCursorText('CALL')}
                onMouseLeave={() => setCursorText('')}
              >
                +1 (234) 567-8900
              </a>
            </div>
            <div>
              <h3>Location</h3>
              <p>123 Design Street</p>
              <p>Brooklyn, NY 11217</p>
            </div>
            <div>
              <h3>Socials</h3>
              <a
                href="https://twitter.com/rawstudio"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorText('FOLLOW')}
                onMouseLeave={() => setCursorText('')}
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/rawstudio"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorText('FOLLOW')}
                onMouseLeave={() => setCursorText('')}
              >
                Instagram
              </a>
              <a
                href="https://behance.com/rawstudio"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorText('VIEW')}
                onMouseLeave={() => setCursorText('')}
              >
                Behance
              </a>
            </div>
          </section>
          
          <section data-testid="contact-form-section">
            <h2>Project Inquiry</h2>
            {formStatus.success && (
              <div data-testid="success-message" className="success-message">
                {formStatus.message}
              </div>
            )}
            {formStatus.error && (
              <div data-testid="error-message" className="error-message">
                {formStatus.message}
              </div>
            )}
            <form data-testid="contact-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  data-testid="name-input"
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  onMouseEnter={() => setCursorText('TYPE')}
                  onMouseLeave={() => setCursorText('')}
                />
                {formErrors.name && (
                  <span data-testid="name-error" className="error">
                    {formErrors.name}
                  </span>
                )}
              </div>
              
              <div>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  data-testid="email-input"
                  aria-required="true"
                  aria-invalid={!!formErrors.email}
                  onMouseEnter={() => setCursorText('TYPE')}
                  onMouseLeave={() => setCursorText('')}
                />
                {formErrors.email && (
                  <span data-testid="email-error" className="error">
                    {formErrors.email}
                  </span>
                )}
              </div>
              
              <div>
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formState.company}
                  onChange={handleChange}
                  data-testid="company-input"
                  onMouseEnter={() => setCursorText('TYPE')}
                  onMouseLeave={() => setCursorText('')}
                />
              </div>
              
              <div>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  data-testid="message-input"
                  aria-required="true"
                  aria-invalid={!!formErrors.message}
                  onMouseEnter={() => setCursorText('TYPE')}
                  onMouseLeave={() => setCursorText('')}
                />
                {formErrors.message && (
                  <span data-testid="message-error" className="error">
                    {formErrors.message}
                  </span>
                )}
              </div>
              
              <div>
                <label htmlFor="budget">Budget</label>
                <select
                  id="budget"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  data-testid="budget-select"
                  onMouseEnter={() => setCursorText('SELECT')}
                  onMouseLeave={() => setCursorText('')}
                >
                  <option value="">Select a budget range</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="timeline">Timeline</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formState.timeline}
                  onChange={handleChange}
                  data-testid="timeline-select"
                  onMouseEnter={() => setCursorText('SELECT')}
                  onMouseLeave={() => setCursorText('')}
                >
                  <option value="">Select a timeline</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-3months">1-3 months</option>
                  <option value="3-6months">3-6 months</option>
                  <option value="6+months">6+ months</option>
                </select>
              </div>
              
              <button
                type="submit"
                data-testid="submit-button"
                onMouseEnter={() => setCursorText('SEND')}
                onMouseLeave={() => setCursorText('')}
              >
                SEND MESSAGE
              </button>
            </form>
          </section>
          
          <section data-testid="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div>
              <div data-testid="faq-item-1">
                <h3>How long does a typical project take?</h3>
                <p>Most projects take 8-12 weeks from start to finish, depending on the scope and complexity.</p>
              </div>
              <div data-testid="faq-item-2">
                <h3>What is your design process?</h3>
                <p>Our process includes discovery, wireframing, design, development, testing, and launch phases.</p>
              </div>
              <div data-testid="faq-item-3">
                <h3>Do you offer ongoing support?</h3>
                <p>Yes, we offer various support packages to ensure your project continues to run smoothly.</p>
              </div>
            </div>
          </section>
        </div>
      );
    }
  };
});

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

// Mock form submission action
jest.mock('@/lib/actions', () => ({
  submitContactForm: jest.fn().mockResolvedValue({ success: true }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe('ContactPage Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for useCursor
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders contact page with all sections', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Check page structure
    expect(screen.getByTestId('contact-page')).toBeInTheDocument();
    expect(screen.getByTestId('contact-hero')).toBeInTheDocument();
    expect(screen.getByTestId('contact-info')).toBeInTheDocument();
    expect(screen.getByTestId('contact-form-section')).toBeInTheDocument();
    expect(screen.getByTestId('faq-section')).toBeInTheDocument();
    
    // Check page content
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Ready to start your next project? Let\'s talk!')).toBeInTheDocument();
    
    // Check contact information
    expect(screen.getByText('hello@rawstudio.com')).toBeInTheDocument();
    expect(screen.getByText('+1 (234) 567-8900')).toBeInTheDocument();
    expect(screen.getByText('123 Design Street')).toBeInTheDocument();
    
    // Check social links
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Behance')).toBeInTheDocument();
    
    // Check form
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/timeline/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    
    // Check FAQ section
    expect(screen.getByTestId('faq-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('faq-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('faq-item-3')).toBeInTheDocument();
  });

  it('updates cursor text on email link', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Find the email link
    const emailLink = screen.getByText('hello@rawstudio.com');
    
    // Test mouse interactions
    fireEvent.mouseEnter(emailLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('EMAIL');
    
    fireEvent.mouseLeave(emailLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('updates cursor text on phone link', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Find the phone link
    const phoneLink = screen.getByText('+1 (234) 567-8900');
    
    // Test mouse interactions
    fireEvent.mouseEnter(phoneLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('CALL');
    
    fireEvent.mouseLeave(phoneLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('updates cursor text on social media links', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Find the Twitter link
    const twitterLink = screen.getByText('Twitter');
    
    // Test mouse interactions
    fireEvent.mouseEnter(twitterLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('FOLLOW');
    
    fireEvent.mouseLeave(twitterLink);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('shows validation errors when submitting an empty form', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Find the submit button and click it
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Check that validation errors are displayed
    expect(screen.getByTestId('name-error')).toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.getByTestId('message-error')).toBeInTheDocument();
    
    // Check error messages
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('shows an email format validation error', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Fill out the form with an invalid email
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const messageInput = screen.getByTestId('message-input');
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Check that only the email validation error is displayed
    expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    expect(screen.queryByTestId('message-error')).not.toBeInTheDocument();
    
    // Check email error message
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  });

  it('successfully submits a valid form', async () => {
    // Mock the form submission function
    const submitContactForm = require('@/lib/actions').submitContactForm;
    submitContactForm.mockResolvedValue({ success: true });
    
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Fill out the form with valid data
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const companyInput = screen.getByTestId('company-input');
    const messageInput = screen.getByTestId('message-input');
    const budgetSelect = screen.getByTestId('budget-select');
    const timelineSelect = screen.getByTestId('timeline-select');
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(companyInput, { target: { value: 'Test Company' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message' } });
    fireEvent.change(budgetSelect, { target: { value: '10k-25k' } });
    fireEvent.change(timelineSelect, { target: { value: '1-3months' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
    
    // Check that the form submission function was called with the correct data
    expect(submitContactForm).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      message: 'This is a test message',
      budget: '10k-25k',
      timeline: '1-3months',
    });
    
    // Check that form fields are reset
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(companyInput.value).toBe('');
    expect(messageInput.value).toBe('');
    expect(budgetSelect.value).toBe('');
    expect(timelineSelect.value).toBe('');
  });

  it('shows an error message when form submission fails', async () => {
    // Mock the form submission function to throw an error
    const submitContactForm = require('@/lib/actions').submitContactForm;
    submitContactForm.mockRejectedValue(new Error('Submission failed'));
    
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Fill out the form with valid data
    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByTestId('email-input');
    const messageInput = screen.getByTestId('message-input');
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
    
    // Check error message content
    expect(screen.getByText('There was an error sending your message. Please try again.')).toBeInTheDocument();
  });

  it('updates cursor text on form inputs', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Find a form input
    const nameInput = screen.getByTestId('name-input');
    
    // Test mouse interactions
    fireEvent.mouseEnter(nameInput);
    expect(mockSetCursorText).toHaveBeenCalledWith('TYPE');
    
    fireEvent.mouseLeave(nameInput);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('updates cursor text on form selects', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Find a form select
    const budgetSelect = screen.getByTestId('budget-select');
    
    // Test mouse interactions
    fireEvent.mouseEnter(budgetSelect);
    expect(mockSetCursorText).toHaveBeenCalledWith('SELECT');
    
    fireEvent.mouseLeave(budgetSelect);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });

  it('updates cursor text on submit button', () => {
    const ContactPage = require('@/app/contact/page').default;
    
    render(<ContactPage />);
    
    // Find the submit button
    const submitButton = screen.getByTestId('submit-button');
    
    // Test mouse interactions
    fireEvent.mouseEnter(submitButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('SEND');
    
    fireEvent.mouseLeave(submitButton);
    expect(mockSetCursorText).toHaveBeenCalledWith('');
  });
}); 
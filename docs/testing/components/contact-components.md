# Contact Component Tests

This document provides detailed documentation for testing the contact components of the FoxLabs//Creative portfolio website.

## ContactForm Component

The ContactForm component is a crucial interactive element of the FoxLabs//Creative website, allowing visitors to send messages to the team. The test suite ensures that the form functions correctly, validates user input properly, provides appropriate feedback, and maintains accessibility standards.

### Test File Location

`__tests__/components/contact/ContactForm.test.tsx`

### Test Structure

The test suite is organized into five main sections:

1. **Form Rendering**
2. **Validation Behavior**
3. **Submission Behavior**
4. **Success/Error State Handling**
5. **Accessibility Compliance**

### Key Testing Areas

#### Form Rendering Tests

These tests verify that the ContactForm component renders correctly with all necessary elements:

- All required fields (name, email, message) render correctly
- Optional fields (company, subject) render correctly
- Required fields are properly marked with asterisks
- The submit button is correctly rendered
- Cursor text changes appropriately on hover (TYPE for input fields, SEND for submit button)

#### Validation Behavior Tests

These tests ensure that form validation works correctly:

- Validation errors appear when submitting an empty form
- Email format validation works correctly with invalid email addresses
- Message length validation enforces minimum length requirements
- Validation errors clear when fields are corrected
- The form prevents submission when validation errors exist

#### Submission Behavior Tests

These tests verify the form submission process:

- The form correctly calls the submission API with valid data
- All form fields, both required and optional, are included in the submission
- Loading state is displayed during form submission
- The submit button is disabled during submission to prevent multiple submissions

#### Success/Error State Handling Tests

These tests ensure proper feedback after form submission:

- Success message appears after successful submission
- Error message appears after failed submission
- Form fields are reset after successful submission
- Form fields are preserved after a failed submission to allow correction
- Server errors are handled gracefully with appropriate messages

#### Accessibility Compliance Tests

These tests verify that the form meets accessibility standards:

- The form has no accessibility violations according to axe testing
- Keyboard navigation works correctly through all form fields
- Form validation errors are properly announced to screen readers
- Error messages are associated with their respective inputs via aria-describedby
- Form submission status is announced to screen readers via aria-live regions

### Testing Techniques

The ContactForm test suite employs several key testing techniques:

1. **Mock API Calls**: Using Jest mocks to simulate successful and failed API responses
2. **User Interaction Simulation**: Using Testing Library's userEvent to simulate typing, clicking, and keyboard navigation
3. **Asynchronous Testing**: Using async/await and waitFor to test loading states and API responses
4. **Accessibility Testing**: Using jest-axe to verify WCAG compliance
5. **State Transition Testing**: Verifying form behavior through different states (initial, validation, loading, success, error)

### Mock Implementation

The test suite mocks the `submitContactForm` function from `@/lib/actions` to test different scenarios:

```typescript
// Mock the form submission function
const mockSubmitContactForm = submitContactForm as jest.MockedFunction<typeof submitContactForm>;

// Mock a successful submission
mockSubmitContactForm.mockResolvedValue({
  success: true,
  message: 'Form submitted successfully'
});

// Mock a failed submission
mockSubmitContactForm.mockResolvedValue({
  success: false,
  message: 'An error occurred while submitting the form'
});

// Mock a server error
mockSubmitContactForm.mockRejectedValue(new Error('Network error'));
```

### Test Coverage

The test suite provides 100% coverage of the ContactForm component's functionality:

- All form fields are tested for rendering and interaction
- All validation scenarios are tested
- Both successful and failed submissions are tested
- All accessibility requirements are verified

### Integration with FoxLabs//Creative Design System

The tests verify that the ContactForm component correctly integrates with FoxLabs//Creative's design system:

- Brutalist design aesthetics are maintained in the form elements
- Custom cursor text changes provide interactive feedback
- Form states align with the overall application design language
- Accessibility is maintained throughout all states 
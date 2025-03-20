# Form Validation Tests

This document outlines the tests for the form validation utility functions in the application.

## Overview

The form validation utilities in `lib/utils/validation.ts` provide a comprehensive set of validation functions that can be combined to validate form fields and entire forms. Each function is designed to handle a specific type of validation and returns a standardized validation result.

The validation system follows the RAW/STUDIO principle of brutalist design: straightforward, unadorned, and functional validation that prioritizes user experience without unnecessary complexity.

## Test File

The tests are located in `__tests__/utils/validation.test.ts` and cover the following validation scenarios:

### Individual Validator Tests

#### validateRequired
Tests validation of required fields with the following cases:
- Fails for empty strings
- Fails for null values
- Fails for undefined values
- Fails for strings with only whitespace
- Passes for non-empty strings
- Accepts and uses custom error messages

#### validateEmail
Tests validation of email formats with the following cases:
- Fails for empty strings, null, and undefined values
- Fails for invalid email formats (missing username, missing domain, etc.)
- Passes for valid email formats (standard format, subdomains, plus addressing)
- Accepts and uses custom error messages

#### validateLength
Tests validation of string lengths with the following cases:
- Fails for empty strings, null, and undefined values
- Fails when string is shorter than minimum length
- Fails when string is longer than maximum length
- Passes when string length is within limits
- Passes when string length equals minimum
- Passes when string length equals maximum
- Accepts and uses custom error messages for min and max violations

#### validateMatch
Tests validation of matching values with the following cases:
- Fails when values do not match
- Passes when values match
- Accepts and uses custom error messages

#### validateCustom
Tests custom validation functions with the following cases:
- Fails when custom validation function returns false
- Passes when custom validation function returns true
- Accepts and uses custom error messages

### Result Combination Tests

#### combineValidationResults
Tests combining multiple validation results:
- Combines errors from multiple validation results
- Returns valid result when all results are valid
- Returns invalid result when at least one result is invalid

#### validateField
Tests applying multiple validation rules to a single field:
- Applies multiple validation rules to a field
- Stops at first failure if value is undefined
- Passes all validations for valid value

#### validateForm
Tests validating multiple fields in a form:
- Validates multiple fields in a form
- Returns valid results for valid form

### Integration Tests

Integration tests demonstrate real-world validation scenarios:

#### Contact Form Validation
- Tests a complete contact form with:
  - Required name field
  - Email with format validation
  - Optional company field (not validated)
  - Message with minimum length requirement
- Verifies specific error messages
- Confirms optional fields don't generate validation errors

#### Registration Form Validation
- Tests a complete registration form with:
  - Username with length constraints
  - Email format validation
  - Password with multiple validation rules:
    - Minimum length (8 characters)
    - Requires uppercase letter
    - Requires number
  - Password confirmation must match
- Verifies chain of validation rules works correctly
- Confirms proper error messages for each validation failure

## Test Coverage

The validation tests achieve 100% coverage of the validation utility functions, ensuring:

- All code paths are tested
- Edge cases are properly handled
- Error messages are correctly generated and customizable
- Integration scenarios work as expected

## Running the Tests

To run the validation tests specifically:

```bash
npm test -- __tests__/utils/validation.test.ts
```

To run all tests:

```bash
npm test
```

## Validation Function Interfaces

Each validation function returns a `ValidationResult` with the following structure:

```typescript
type ValidationError = {
  type: string;  // Identifies the type of validation error (e.g., 'required', 'email')
  message: string;  // Human-readable error message
};

type ValidationResult = {
  valid: boolean;  // Overall validity
  errors: ValidationError[];  // List of validation errors
};
```

The validation system is designed to collect all validation errors, not just the first one, enabling comprehensive error reporting to the user.

## Using the Validation Functions

### Basic Field Validation

```typescript
import { validateRequired, validateEmail } from '@/lib/utils/validation';

// Validate a required field
const nameResult = validateRequired('John Doe');
// { valid: true, errors: [] }

// Validate an email field
const emailResult = validateEmail('invalid-email');
// { valid: false, errors: [{ type: 'email', message: 'Please enter a valid email address' }] }

// Custom error message
const customResult = validateRequired('', 'Name cannot be empty');
// { valid: false, errors: [{ type: 'required', message: 'Name cannot be empty' }] }
```

### Validating a Field with Multiple Rules

```typescript
import { validateField, validateRequired, validateEmail } from '@/lib/utils/validation';

const emailValue = 'user@example.com';
const validations = [
  (val) => validateRequired(val, 'Email is required'),
  (val) => validateEmail(val, 'Please enter a valid email')
];

const result = validateField(emailValue, validations);
// { valid: true, errors: [] }
```

### Complete Form Validation

```typescript
import { validateRequired, validateEmail, validateLength, validateForm } from '@/lib/utils/validation';

const form = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, this is a test message.'
};

const validationRules = {
  name: [(val) => validateRequired(val, 'Name is required')],
  email: [
    (val) => validateRequired(val, 'Email is required'),
    (val) => validateEmail(val, 'Please enter a valid email address')
  ],
  message: [
    (val) => validateRequired(val, 'Message is required'),
    (val) => validateLength(val, { 
      min: 10, 
      max: 500,
      minMessage: 'Message must be at least 10 characters',
      maxMessage: 'Message must not exceed 500 characters'
    })
  ]
};

const result = validateForm(form, validationRules);

// Check if the form is valid
const isFormValid = Object.values(result).every(fieldResult => fieldResult.valid);

// Get all error messages for display
const allErrors = Object.entries(result).reduce((errors, [field, fieldResult]) => {
  if (!fieldResult.valid) {
    errors[field] = fieldResult.errors.map(error => error.message);
  }
  return errors;
}, {} as Record<string, string[]>);
```

### Custom Validation Functions

```typescript
import { validateCustom } from '@/lib/utils/validation';

// Custom password strength validation
const hasUppercase = (value) => /[A-Z]/.test(value);
const hasNumber = (value) => /\d/.test(value);
const hasSpecialChar = (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value);

const passwordValue = 'Password123!';

const uppercaseResult = validateCustom(
  passwordValue, 
  hasUppercase, 
  'Password must contain at least one uppercase letter'
);

const numberResult = validateCustom(
  passwordValue, 
  hasNumber, 
  'Password must contain at least one number'
);

const specialCharResult = validateCustom(
  passwordValue, 
  hasSpecialChar, 
  'Password must contain at least one special character'
);

// All validations would pass for this password
```

## Integration with RAW/STUDIO Forms

The validation system is designed to work seamlessly with RAW/STUDIO's brutalist form components, providing immediate feedback while maintaining the stark, functional design aesthetic that characterizes the brand.

The forms combine the validation system with the custom cursor implementation, providing clear feedback when validation fails while maintaining the distinctive interactive experience. 
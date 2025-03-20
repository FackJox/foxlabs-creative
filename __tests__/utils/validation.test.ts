import {
  validateRequired,
  validateEmail,
  validateLength,
  validateMatch,
  validateCustom,
  validateField,
  validateForm,
  combineValidationResults,
  ValidationResult
} from '@/lib/utils/validation';

describe('Form Validation Utils', () => {
  // Required field validation tests
  describe('validateRequired', () => {
    it('should fail for empty strings', () => {
      const result = validateRequired('');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(1);
      expect(result.errors[0].type).toBe('required');
    });

    it('should fail for null values', () => {
      const result = validateRequired(null);
      expect(result.valid).toBe(false);
      expect(result.errors[0].message).toBe('This field is required');
    });

    it('should fail for undefined values', () => {
      const result = validateRequired(undefined);
      expect(result.valid).toBe(false);
    });

    it('should fail for strings with only whitespace', () => {
      const result = validateRequired('   ');
      expect(result.valid).toBe(false);
    });

    it('should pass for non-empty strings', () => {
      const result = validateRequired('Hello');
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should use custom error message', () => {
      const customMessage = 'This field cannot be empty';
      const result = validateRequired('', customMessage);
      expect(result.errors[0].message).toBe(customMessage);
    });
  });

  // Email validation tests
  describe('validateEmail', () => {
    it('should fail for empty strings', () => {
      const result = validateEmail('');
      expect(result.valid).toBe(false);
    });

    it('should fail for null values', () => {
      const result = validateEmail(null);
      expect(result.valid).toBe(false);
    });

    it('should fail for undefined values', () => {
      const result = validateEmail(undefined);
      expect(result.valid).toBe(false);
    });

    it('should fail for invalid email formats', () => {
      const invalidEmails = [
        'plainaddress',
        '@missingusername.com',
        'username@.com',
        'username@domain',
        'username@domain..com'
      ];

      invalidEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.valid).toBe(false);
        expect(result.errors[0].type).toBe('email');
      });
    });

    it('should pass for valid email formats', () => {
      const validEmails = [
        'email@example.com',
        'firstname.lastname@example.com',
        'email@subdomain.example.com',
        'firstname+lastname@example.com',
        '1234567890@example.com',
        'email@example-one.com'
      ];

      validEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);
      });
    });

    it('should use custom error message', () => {
      const customMessage = 'Enter a valid email address';
      const result = validateEmail('invalid-email', customMessage);
      expect(result.errors[0].message).toBe(customMessage);
    });
  });

  // Length validation tests
  describe('validateLength', () => {
    it('should fail for empty strings', () => {
      const result = validateLength('', { min: 1 });
      expect(result.valid).toBe(false);
    });

    it('should fail for null values', () => {
      const result = validateLength(null, { min: 1 });
      expect(result.valid).toBe(false);
    });

    it('should fail for undefined values', () => {
      const result = validateLength(undefined, { min: 1 });
      expect(result.valid).toBe(false);
    });

    it('should fail when string is shorter than minimum length', () => {
      const result = validateLength('abc', { min: 5 });
      expect(result.valid).toBe(false);
      expect(result.errors[0].type).toBe('minLength');
    });

    it('should fail when string is longer than maximum length', () => {
      const result = validateLength('abcdefghi', { max: 5 });
      expect(result.valid).toBe(false);
      expect(result.errors[0].type).toBe('maxLength');
    });

    it('should pass when string length is within limits', () => {
      const result = validateLength('abc', { min: 2, max: 5 });
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should pass when string length equals minimum', () => {
      const result = validateLength('abc', { min: 3 });
      expect(result.valid).toBe(true);
    });

    it('should pass when string length equals maximum', () => {
      const result = validateLength('abc', { max: 3 });
      expect(result.valid).toBe(true);
    });

    it('should use custom min length error message', () => {
      const customMessage = 'Text is too short';
      const result = validateLength('a', { min: 3, minMessage: customMessage });
      expect(result.errors[0].message).toBe(customMessage);
    });

    it('should use custom max length error message', () => {
      const customMessage = 'Text is too long';
      const result = validateLength('abcdef', { max: 3, maxMessage: customMessage });
      expect(result.errors[0].message).toBe(customMessage);
    });
  });

  // Match validation tests
  describe('validateMatch', () => {
    it('should fail when values do not match', () => {
      const result = validateMatch('password', 'password123');
      expect(result.valid).toBe(false);
      expect(result.errors[0].type).toBe('match');
    });

    it('should pass when values match', () => {
      const result = validateMatch('password123', 'password123');
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should use custom error message', () => {
      const customMessage = 'Passwords do not match';
      const result = validateMatch('p1', 'p2', customMessage);
      expect(result.errors[0].message).toBe(customMessage);
    });
  });

  // Custom validation tests
  describe('validateCustom', () => {
    it('should fail when custom validation function returns false', () => {
      const hasNumber = (value: string) => /\d/.test(value);
      const result = validateCustom('abcdef', hasNumber);
      expect(result.valid).toBe(false);
      expect(result.errors[0].type).toBe('custom');
    });

    it('should pass when custom validation function returns true', () => {
      const hasNumber = (value: string) => /\d/.test(value);
      const result = validateCustom('abc123', hasNumber);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should use custom error message', () => {
      const hasUppercase = (value: string) => /[A-Z]/.test(value);
      const customMessage = 'Must contain at least one uppercase letter';
      const result = validateCustom('abcdef', hasUppercase, customMessage);
      expect(result.errors[0].message).toBe(customMessage);
    });
  });

  // Combine validation results tests
  describe('combineValidationResults', () => {
    it('should combine errors from multiple validation results', () => {
      const result1: ValidationResult = {
        valid: false,
        errors: [{ type: 'required', message: 'Field is required' }]
      };
      const result2: ValidationResult = {
        valid: false,
        errors: [{ type: 'email', message: 'Invalid email' }]
      };

      const combined = combineValidationResults([result1, result2]);
      expect(combined.valid).toBe(false);
      expect(combined.errors.length).toBe(2);
      expect(combined.errors[0].type).toBe('required');
      expect(combined.errors[1].type).toBe('email');
    });

    it('should be valid when all results are valid', () => {
      const result1: ValidationResult = {
        valid: true,
        errors: []
      };
      const result2: ValidationResult = {
        valid: true,
        errors: []
      };

      const combined = combineValidationResults([result1, result2]);
      expect(combined.valid).toBe(true);
      expect(combined.errors.length).toBe(0);
    });

    it('should be invalid when at least one result is invalid', () => {
      const result1: ValidationResult = {
        valid: true,
        errors: []
      };
      const result2: ValidationResult = {
        valid: false,
        errors: [{ type: 'email', message: 'Invalid email' }]
      };

      const combined = combineValidationResults([result1, result2]);
      expect(combined.valid).toBe(false);
      expect(combined.errors.length).toBe(1);
    });
  });

  // Field validation tests
  describe('validateField', () => {
    it('should apply multiple validation rules to a field', () => {
      const value = '';
      const validations = [
        (val: string) => validateRequired(val),
        (val: string) => validateEmail(val)
      ];

      const result = validateField(value, validations);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(2);
      expect(result.errors[0].type).toBe('required');
      expect(result.errors[1].type).toBe('email');
    });

    it('should stop at first failure if value is undefined', () => {
      const validations = [
        (val: string) => validateRequired(val),
        (val: string) => validateEmail(val)
      ];

      const result = validateField(undefined, validations);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBe(2);
    });

    it('should pass all validations for valid value', () => {
      const value = 'test@example.com';
      const validations = [
        (val: string) => validateRequired(val),
        (val: string) => validateEmail(val)
      ];

      const result = validateField(value, validations);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  // Form validation tests
  describe('validateForm', () => {
    it('should validate multiple fields in a form', () => {
      const form = {
        name: '',
        email: 'invalid-email',
        password: 'pass',
        confirmPassword: 'password'
      };

      const validationRules = {
        name: [(val: string) => validateRequired(val)],
        email: [
          (val: string) => validateRequired(val),
          (val: string) => validateEmail(val)
        ],
        password: [
          (val: string) => validateRequired(val),
          (val: string) => validateLength(val, { min: 8 })
        ],
        confirmPassword: [
          (val: string) => validateRequired(val),
          (val: string) => validateMatch(val, form.password, 'Passwords do not match')
        ]
      };

      const result = validateForm(form, validationRules);
      
      expect(result.name.valid).toBe(false);
      expect(result.email.valid).toBe(false);
      expect(result.password.valid).toBe(false);
      expect(result.confirmPassword.valid).toBe(false);
      
      expect(result.name.errors[0].type).toBe('required');
      expect(result.email.errors[0].type).toBe('email');
      expect(result.password.errors[0].type).toBe('minLength');
      expect(result.confirmPassword.errors[0].type).toBe('match');
    });

    it('should return valid results for valid form', () => {
      const form = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message.'
      };

      const validationRules = {
        name: [(val: string) => validateRequired(val)],
        email: [
          (val: string) => validateRequired(val),
          (val: string) => validateEmail(val)
        ],
        message: [
          (val: string) => validateRequired(val),
          (val: string) => validateLength(val, { min: 10, max: 500 })
        ]
      };

      const result = validateForm(form, validationRules);
      
      expect(result.name.valid).toBe(true);
      expect(result.email.valid).toBe(true);
      expect(result.message.valid).toBe(true);
    });
  });

  // Integration tests for realistic use cases
  describe('Form Integration Tests', () => {
    it('should validate a contact form with multiple rules', () => {
      // Setup a contact form with invalid data
      const contactForm = {
        name: '',
        email: 'invalid',
        company: 'ABC',  // optional field
        message: 'Hi'    // too short
      };

      // Define validation rules
      const contactFormRules = {
        name: [(val: string) => validateRequired(val, 'Name is required')],
        email: [
          (val: string) => validateRequired(val, 'Email is required'),
          (val: string) => validateEmail(val, 'Please enter a valid email address')
        ],
        message: [
          (val: string) => validateRequired(val, 'Message is required'),
          (val: string) => validateLength(val, { 
            min: 10, 
            minMessage: 'Message must be at least 10 characters'
          })
        ]
      };

      // Validate the form
      const result = validateForm(contactForm, contactFormRules);
      
      // Check validation results
      expect(result.name.valid).toBe(false);
      expect(result.email.valid).toBe(false);
      expect(result.message.valid).toBe(false);
      
      // Check specific error messages
      expect(result.name.errors[0].message).toBe('Name is required');
      // For email, we first get the required validation, then the email format validation
      expect(result.email.errors[0].message).toBe('Please enter a valid email address');
      expect(result.message.errors[0].message).toBe('Message must be at least 10 characters');
      
      // Optional fields should not have validation errors
      expect(result.company).toBeUndefined();
    });

    it('should validate a registration form with password confirmation', () => {
      // Setup a registration form with invalid data
      const registrationForm = {
        username: 'user',
        email: 'user@example.com',
        password: 'pass123',      // too short
        confirmPassword: 'pass12' // doesn't match
      };

      // Custom password validation
      const hasUppercase = (val: string) => /[A-Z]/.test(val);
      const hasNumber = (val: string) => /\d/.test(val);

      // Define validation rules
      const registrationRules = {
        username: [
          (val: string) => validateRequired(val),
          (val: string) => validateLength(val, { min: 3, max: 20 })
        ],
        email: [
          (val: string) => validateRequired(val),
          (val: string) => validateEmail(val)
        ],
        password: [
          (val: string) => validateRequired(val),
          (val: string) => validateLength(val, { 
            min: 8, 
            minMessage: 'Password must be at least 8 characters' 
          }),
          (val: string) => validateCustom(val, hasUppercase, 'Password must contain at least one uppercase letter'),
          (val: string) => validateCustom(val, hasNumber, 'Password must contain at least one number')
        ],
        confirmPassword: [
          (val: string) => validateRequired(val),
          (val: string) => validateMatch(val, registrationForm.password, 'Passwords do not match')
        ]
      };

      // Validate the form
      const result = validateForm(registrationForm, registrationRules);
      
      // Check validation results
      expect(result.username.valid).toBe(true);
      expect(result.email.valid).toBe(true);
      expect(result.password.valid).toBe(false);
      expect(result.confirmPassword.valid).toBe(false);
      
      // Check specific error messages
      expect(result.password.errors[0].message).toBe('Password must be at least 8 characters');
      expect(result.password.errors[1].message).toBe('Password must contain at least one uppercase letter');
      expect(result.confirmPassword.errors[0].message).toBe('Passwords do not match');
    });
  });
}); 
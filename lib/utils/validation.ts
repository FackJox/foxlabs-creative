/**
 * Form validation utility functions
 */

export type ValidationError = {
  type: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
};

/**
 * Validates if a field has a value
 * @param value The value to validate
 * @param message Optional custom error message
 * @returns ValidationResult with error if the field is empty
 */
export const validateRequired = (
  value: string | undefined | null,
  message = 'This field is required'
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  if (!value || value.trim() === '') {
    errors.push({
      type: 'required',
      message
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validates if a string is a valid email format
 * @param email The email to validate
 * @param message Optional custom error message
 * @returns ValidationResult with error if email format is invalid
 */
export const validateEmail = (
  email: string | undefined | null,
  message = 'Please enter a valid email address'
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  if (!email) {
    return {
      valid: false,
      errors: [{
        type: 'email',
        message
      }]
    };
  }
  
  // Email validation regex - matches our test cases
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Check for invalid formats
  if (!emailRegex.test(email)) {
    errors.push({
      type: 'email',
      message
    });
  }
  
  // Check for specific invalid patterns that might pass the regex
  if (email.includes('..') || email.endsWith('.') || email.split('@')[0] === '' || email.indexOf('@') === email.length - 1) {
    errors.push({
      type: 'email',
      message
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validates the length of a string
 * @param value The string to validate
 * @param options Length validation options
 * @returns ValidationResult with errors if length requirements are not met
 */
export const validateLength = (
  value: string | undefined | null,
  options: {
    min?: number;
    max?: number;
    minMessage?: string;
    maxMessage?: string;
  }
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  if (!value) {
    return {
      valid: false,
      errors: [{
        type: 'length',
        message: options.minMessage || `Minimum length is ${options.min} characters`
      }]
    };
  }
  
  if (options.min !== undefined && value.length < options.min) {
    errors.push({
      type: 'minLength',
      message: options.minMessage || `Minimum length is ${options.min} characters`
    });
  }
  
  if (options.max !== undefined && value.length > options.max) {
    errors.push({
      type: 'maxLength',
      message: options.maxMessage || `Maximum length is ${options.max} characters`
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validates if a value matches another value
 * @param value The value to validate
 * @param matchValue The value to match against
 * @param message Optional custom error message
 * @returns ValidationResult with error if values don't match
 */
export const validateMatch = (
  value: string | undefined | null,
  matchValue: string | undefined | null,
  message = 'Values do not match'
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  if (value !== matchValue) {
    errors.push({
      type: 'match',
      message
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validates a value with a custom validation function
 * @param value The value to validate
 * @param validationFn Custom validation function
 * @param message Optional custom error message
 * @returns ValidationResult with error if custom validation fails
 */
export const validateCustom = (
  value: any,
  validationFn: (value: any) => boolean,
  message = 'Invalid value'
): ValidationResult => {
  const errors: ValidationError[] = [];
  
  if (!validationFn(value)) {
    errors.push({
      type: 'custom',
      message
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Combines multiple validation results
 * @param results Array of validation results to combine
 * @returns Combined validation result
 */
export const combineValidationResults = (
  results: ValidationResult[]
): ValidationResult => {
  const combinedErrors = results.flatMap(result => result.errors);
  
  return {
    valid: combinedErrors.length === 0,
    errors: combinedErrors
  };
};

/**
 * Validates a form field with multiple validation rules
 * @param value The field value to validate
 * @param validations Array of validation functions
 * @returns Combined validation result
 */
export const validateField = (
  value: any,
  validations: ((value: any) => ValidationResult)[]
): ValidationResult => {
  const results = validations.map(validation => validation(value));
  return combineValidationResults(results);
};

/**
 * Validates a form object against validation rules
 * @param form The form object to validate
 * @param validationRules Object with field names and validation functions
 * @returns Object with field names and validation results
 */
export const validateForm = <T extends Record<string, any>>(
  form: T,
  validationRules: Record<keyof T, ((value: any) => ValidationResult)[]>
): Record<keyof T, ValidationResult> => {
  const result = {} as Record<keyof T, ValidationResult>;
  
  for (const field in validationRules) {
    if (Object.prototype.hasOwnProperty.call(validationRules, field)) {
      const fieldValidations = validationRules[field];
      result[field] = validateField(form[field], fieldValidations);
    }
  }
  
  return result;
}; 
// Type definitions for jest-dom
// Project: https://github.com/testing-library/jest-dom
// Definitions by: Josh Meyer <https://github.com/jsmeyer>

// This adds the custom matchers for jest-dom
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toBeVisible(): R;
    toBeEmpty(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toBeInvalid(): R;
    toBeValid(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveClass(...classNames: string[]): R;
    toHaveFocus(): R;
    toHaveStyle(css: string): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveValue(value: string | string[] | number): R;
  }
}

// Export an empty object to make this a proper module
export {}; 
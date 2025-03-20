import '@testing-library/jest-dom';

/**
 * This file provides type declarations for Jest DOM matchers.
 * It adds TypeScript support for the custom matchers from @testing-library/jest-dom.
 */

declare global {
  namespace jest {
    // DOM Testing Library custom matchers
    interface Matchers<R> {
      // DOM Testing Library
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeEmpty(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(htmlText: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(...classNames: string[]): R;
      toHaveFocus(): R;
      toHaveFormValues(expectedValues: Record<string, any>): R;
      toHaveStyle(css: Record<string, any> | string): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value?: string | string[] | number): R;
      toBeChecked(): R;
      toHaveDescription(text?: string | RegExp): R;
      toHaveDisplayValue(value: string | string[] | RegExp): R;
      
      // Jest matchers
      toBe(expected: any): R;
      toBeDefined(): R;
      toBeFalsy(): R;
      toBeGreaterThan(expected: number | bigint): R;
      toBeGreaterThanOrEqual(expected: number | bigint): R;
      toBeLessThan(expected: number | bigint): R;
      toBeLessThanOrEqual(expected: number | bigint): R;
      toBeInstanceOf(expected: any): R;
      toBeNull(): R;
      toBeTruthy(): R;
      toBeUndefined(): R;
      toContain(expected: any): R;
      toEqual(expected: any): R;
      toHaveBeenCalled(): R;
      toHaveBeenCalledTimes(expected: number): R;
      toHaveBeenCalledWith(...expectedArgs: any[]): R;
      toHaveBeenLastCalledWith(...expectedArgs: any[]): R;
      toHaveLength(expected: number): R;
      toMatch(expected: string | RegExp): R;
      toMatchObject(expected: Record<string, any>): R;
      toThrow(expected?: string | Error | RegExp): R;
      toThrowError(expected?: string | Error | RegExp): R;
    }

    // Mock functionality
    interface MockInstance<T, Y extends any[]> {
      mockClear(): void;
      mockReset(): void;
      mockRestore(): void;
      mockImplementation(fn: (...args: Y) => T): this;
      mockImplementationOnce(fn: (...args: Y) => T): this;
      mockReturnValue(value: T): this;
      mockReturnValueOnce(value: T): this;
      mockResolvedValue(value: Awaited<T>): this;
      mockResolvedValueOnce(value: Awaited<T>): this;
      mockRejectedValue(value: unknown): this;
      mockRejectedValueOnce(value: unknown): this;
      getMockName(): string;
      mockName(name: string): this;
      mock: {
        calls: Y[];
        instances: T[];
        invocationCallOrder: number[];
        results: { type: string; value: T }[];
      };
    }

    // Add default type parameters to make it more flexible
    type Mock<T = any, Y extends any[] = any[]> = MockInstance<T, Y>;

    interface SpyInstance<T = any, Y extends any[] = any[]> extends MockInstance<T, Y> {}

    // Export mock functions
    function fn<T = any, Y extends any[] = any[]>(): Mock<T, Y>;
    function fn<T = any, Y extends any[] = any[]>(implementation?: (...args: Y) => T): Mock<T, Y>;
    function spyOn<T = any, M extends keyof T = keyof T>(object: T, method: M): SpyInstance<T[M], T[M] extends (...args: infer A) => any ? A : any[]>;
    function mock<T extends string>(moduleName: T): { [K in T]: any };
  }
}

// Export an empty object to make this a proper module
export {}; 
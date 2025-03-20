import React, { createContext, useContext, useState } from 'react';
import { render, RenderOptions, RenderResult, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations, AxeResults } from 'jest-axe';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

type UserEventSetupOptions = Parameters<typeof userEvent.setup>[0];

// Define test provider props
interface TestProviderProps {
  children: React.ReactNode;
  mockCursorText?: string;
  mockCursorPosition?: { x: number; y: number };
}

// Create a mock cursor context for testing
interface MockCursorContextType {
  cursorPosition: { x: number; y: number };
  cursorText: string;
  setCursorText: (text: string) => void;
}

// Create a shared state to ensure all components use the same cursor state
const mockCursorState = {
  cursorPosition: { x: 0, y: 0 },
  cursorText: '',
  setCursorText: (text: string) => {
    mockCursorState.cursorText = text;
    // Force a re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('cursorchange'));
  }
};

// Mock cursor context 
const MockCursorContext = createContext<MockCursorContextType>(mockCursorState);

// Hook to use the mock cursor in tests
export const useMockCursor = () => {
  // Create a local state that will re-render when the mockCursorState changes
  const [cursorText, setCursorTextState] = useState(mockCursorState.cursorText);
  const [cursorPosition, setCursorPosition] = useState(mockCursorState.cursorPosition);
  
  // Subscribe to changes in the mockCursorState
  React.useEffect(() => {
    const handleCursorChange = () => {
      setCursorTextState(mockCursorState.cursorText);
      setCursorPosition(mockCursorState.cursorPosition);
    };
    
    window.addEventListener('cursorchange', handleCursorChange);
    return () => {
      window.removeEventListener('cursorchange', handleCursorChange);
    };
  }, []);
  
  // Return a proxy that updates both local state and the shared state
  return {
    cursorPosition,
    cursorText,
    setCursorText: (text: string) => {
      setCursorTextState(text);
      mockCursorState.setCursorText(text);
    }
  };
};

// Define responsive screen sizes
export const screenSizes = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  wide: { width: 1920, height: 1080 },
};

export type ScreenSize = keyof typeof screenSizes;

// Create test providers for testing
const TestProviders: React.FC<TestProviderProps> = ({
  children,
  mockCursorText = '',
  mockCursorPosition = { x: 0, y: 0 },
}) => {
  // Initialize mock cursor state with provided values
  if (mockCursorText) {
    mockCursorState.cursorText = mockCursorText;
  }
  
  if (mockCursorPosition) {
    mockCursorState.cursorPosition = mockCursorPosition;
  }

  return (
    <MockCursorContext.Provider value={mockCursorState}>
      {children}
    </MockCursorContext.Provider>
  );
};

// Custom render with providers
type CustomRenderOptions = {
  mockCursorText?: string;
  mockCursorPosition?: { x: number; y: number };
} & Omit<RenderOptions, 'wrapper'>;

export function customRender(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const {
    mockCursorText,
    mockCursorPosition,
    ...renderOptions
  } = options;
  
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders
        mockCursorText={mockCursorText}
        mockCursorPosition={mockCursorPosition}
      >
        {children}
      </TestProviders>
    ),
    ...renderOptions,
  });
}

// Setup userEvent
export function setupUserEvent(options?: UserEventSetupOptions) {
  return userEvent.setup(options);
}

// Accessibility testing with axe
export async function testAccessibility(container: Element): Promise<AxeResults> {
  return await axe(container);
}

// Screen size simulation
export function simulateScreenSize(size: ScreenSize) {
  const { width, height } = screenSizes[size];
  
  // Store original dimensions
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;
  
  // Update window dimensions
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
  
  // Return function to restore original dimensions
  return () => {
    Object.defineProperty(window, 'innerWidth', { value: originalWidth, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalHeight, writable: true });
    window.dispatchEvent(new Event('resize'));
  };
}

// Helper to create bounding rectangles for elements based on screen size
export function createMockRect(size: ScreenSize, customProps?: Partial<DOMRect>): DOMRect {
  const { width, height } = screenSizes[size];
  
  return {
    x: 0,
    y: 0,
    width: width,
    height: height,
    top: 0,
    right: width,
    bottom: height,
    left: 0,
    toJSON: () => ({}),
    ...customProps,
  };
}

// Mock the useCursor hook to use our mock implementation
jest.mock('@/hooks/use-cursor', () => ({
  __esModule: true,
  useCursor: () => useMockCursor(),
  CursorProvider: ({ children }: { children: React.ReactNode }) => children,
}));

/**
 * Basic test to ensure this file is properly tested
 * This function is used for testing purposes only
 */
export function testUtilsTest() {
  return 'test-utils is working';
}

// Re-export everything from RTL
export * from '@testing-library/react';
export { userEvent, fireEvent, act }; 
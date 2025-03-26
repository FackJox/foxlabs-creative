/**
 * Mock implementations for Radix UI components
 */
import React, { ReactNode } from 'react'

// Mock Dialog component
jest.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children }: { children: ReactNode }) => <div data-testid="dialog-root">{children}</div>,
  Trigger: ({ children }: { children: ReactNode }) => <button data-testid="dialog-trigger">{children}</button>,
  Portal: ({ children }: { children: ReactNode }) => <div data-testid="dialog-portal">{children}</div>,
  Overlay: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <div data-testid="dialog-overlay" {...props}>{children}</div>
  ),
  Content: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <div data-testid="dialog-content" {...props}>{children}</div>
  ),
  Title: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <h2 data-testid="dialog-title" {...props}>{children}</h2>
  ),
  Description: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <p data-testid="dialog-description" {...props}>{children}</p>
  ),
  Close: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <button data-testid="dialog-close" {...props}>{children}</button>
  )
}))

// Mock Popover component
jest.mock('@radix-ui/react-popover', () => ({
  Root: ({ children }: { children: ReactNode }) => <div data-testid="popover-root">{children}</div>,
  Trigger: ({ children }: { children: ReactNode }) => <button data-testid="popover-trigger">{children}</button>,
  Portal: ({ children }: { children: ReactNode }) => <div data-testid="popover-portal">{children}</div>,
  Content: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <div data-testid="popover-content" {...props}>{children}</div>
  ),
  Arrow: (props: any) => <div data-testid="popover-arrow" {...props} />,
  Close: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <button data-testid="popover-close" {...props}>{children}</button>
  )
}))

// Mock Tabs component
jest.mock('@radix-ui/react-tabs', () => ({
  Root: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <div data-testid="tabs-root" {...props}>{children}</div>
  ),
  List: ({ children, ...props }: { children: ReactNode, [key: string]: any }) => (
    <div data-testid="tabs-list" role="tablist" {...props}>{children}</div>
  ),
  Trigger: ({ children, value, ...props }: { children: ReactNode, value: string, [key: string]: any }) => (
    <button data-testid={`tabs-trigger-${value}`} role="tab" {...props}>{children}</button>
  ),
  Content: ({ children, value, ...props }: { children: ReactNode, value: string, [key: string]: any }) => (
    <div data-testid={`tabs-content-${value}`} role="tabpanel" {...props}>{children}</div>
  )
}))

// Exported mocked components for direct use in tests
export const MockDialog = {
  Root: ({ children }: { children: ReactNode }) => <div data-testid="dialog-root">{children}</div>,
  Trigger: ({ children }: { children: ReactNode }) => <button data-testid="dialog-trigger">{children}</button>,
  Content: ({ children }: { children: ReactNode }) => <div data-testid="dialog-content">{children}</div>,
  Close: ({ children }: { children: ReactNode }) => <button data-testid="dialog-close">{children}</button>
}

// Add a dummy test for Jest to find
if (process.env.NODE_ENV === 'test') {
  describe('Radix UI Mocks', () => {
    it('exists', () => {
      expect(true).toBe(true);
    });
  });
} 
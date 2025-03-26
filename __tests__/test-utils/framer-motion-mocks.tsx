/**
 * Mock implementations for Framer Motion components
 */
import React, { ReactNode, forwardRef } from 'react'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <div ref={ref} data-testid="motion-div" {...props}>{children}</div>
    )),
    span: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <span ref={ref} data-testid="motion-span" {...props}>{children}</span>
    )),
    button: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <button ref={ref} data-testid="motion-button" {...props}>{children}</button>
    )),
    a: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <a ref={ref} data-testid="motion-a" {...props}>{children}</a>
    )),
    img: forwardRef(({ ...props }: { [key: string]: any }, ref) => (
      <img ref={ref} data-testid="motion-img" {...props} alt={props.alt || ''} />
    )),
    h1: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <h1 ref={ref} data-testid="motion-h1" {...props}>{children}</h1>
    )),
    h2: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <h2 ref={ref} data-testid="motion-h2" {...props}>{children}</h2>
    )),
    p: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <p ref={ref} data-testid="motion-p" {...props}>{children}</p>
    )),
    ul: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <ul ref={ref} data-testid="motion-ul" {...props}>{children}</ul>
    )),
    li: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <li ref={ref} data-testid="motion-li" {...props}>{children}</li>
    )),
    section: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <section ref={ref} data-testid="motion-section" {...props}>{children}</section>
    )),
    header: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <header ref={ref} data-testid="motion-header" {...props}>{children}</header>
    )),
    footer: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <footer ref={ref} data-testid="motion-footer" {...props}>{children}</footer>
    )),
    nav: forwardRef(({ children, ...props }: { children: ReactNode, [key: string]: any }, ref) => (
      <nav ref={ref} data-testid="motion-nav" {...props}>{children}</nav>
    )),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn()
  }),
  useMotionValue: (initial: any) => ({
    get: () => initial,
    set: jest.fn(),
    onChange: jest.fn()
  }),
  useTransform: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn()
  })),
  useCycle: (...args: any[]) => [args[0], jest.fn()],
  useReducedMotion: () => false
}))

// Add a dummy test for Jest to find
if (process.env.NODE_ENV === 'test') {
  describe('Framer Motion Mocks', () => {
    it('exists', () => {
      expect(true).toBe(true);
    });
  });
} 
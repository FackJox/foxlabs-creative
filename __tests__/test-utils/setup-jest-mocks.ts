/**
 * Setup mock implementations for Jest
 */

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn()
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null)
  })
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage(props) {
    // Use createElement instead of JSX
    return require('react').createElement('img', Object.assign({}, props));
  }
}))

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

// Mock ResizeObserver
class MockResizeObserver {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver
})

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn()
})

// Mock element.scrollIntoView
Element.prototype.scrollIntoView = jest.fn()

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(callback, 0)
}

// Mock cancelAnimationFrame
global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id)
}

// Export mock functions for potential reuse in tests
export const mockScrollTo = window.scrollTo as jest.Mock
export const mockScrollIntoView = Element.prototype.scrollIntoView as jest.Mock
export const mockRequestAnimationFrame = global.requestAnimationFrame
export const mockCancelAnimationFrame = global.cancelAnimationFrame

// Add a dummy test for Jest to find
if (process.env.NODE_ENV === 'test') {
  describe('Setup Jest Mocks', () => {
    it('exists', () => {
      expect(true).toBe(true);
    });
  });
} 
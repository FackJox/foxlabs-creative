/**
 * Setup function to configure all Jest mocks needed for Framer Motion and Radix UI
 * Call this in your setupTests file or in individual test files
 */
export default function setupJestMocks(): void {
  // Mock Framer Motion
  jest.mock('framer-motion', () => {
    const framerMotionOriginal = jest.requireActual('framer-motion');
    
    // Create mock motion components
    const motionComponents = [
      'div', 'span', 'button', 'a', 'ul', 'li', 'section', 'header', 
      'footer', 'nav', 'form', 'input', 'textarea', 'p', 'h1', 'h2', 
      'h3', 'h4', 'h5', 'h6', 'svg', 'path', 'circle', 'img', 'article'
    ].reduce((acc: Record<string, any>, component) => {
      acc[component] = component;
      return acc;
    }, {});

    return {
      ...framerMotionOriginal,
      motion: motionComponents,
      // Pass children through without animation effects
      AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
      domAnimation: framerMotionOriginal.domAnimation,
      LazyMotion: ({ children }: { children: React.ReactNode }) => children,
      m: motionComponents,
      useAnimation: () => ({
        start: jest.fn(),
        stop: jest.fn(),
        set: jest.fn(),
      }),
      useMotionValue: (initial: any) => ({
        get: () => initial,
        set: jest.fn(),
        onChange: jest.fn(),
      }),
      useSpring: (initial: any) => ({
        get: () => initial,
        set: jest.fn(),
      }),
      useTransform: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
      })),
      useScroll: jest.fn(() => ({
        scrollY: {
          get: jest.fn(),
          onChange: jest.fn(),
        },
        scrollYProgress: {
          get: jest.fn(),
          onChange: jest.fn(),
        },
      })),
      useInView: jest.fn(() => [jest.fn(), true]),
    };
  });

  // Mock Radix UI portals
  jest.mock('@radix-ui/react-portal', () => ({
    Portal: ({ children }: { children: React.ReactNode }) => children,
  }));

  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserverMock {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    
    constructor(private callback: IntersectionObserverCallback) {}
    
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn(() => []);
  };

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserverMock {
    constructor(private callback: ResizeObserverCallback) {}
    
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
} 
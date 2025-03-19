import './jest.polyfill.js';
import { myFetch } from './jest.polyfill.js';
global.fetch = myFetch;
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Import our test utilities
import { setupJestMocks } from './src/tests/test-utils';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: 'div',
    span: 'span',
    button: 'button',
    a: 'a',
    ul: 'ul',
    li: 'li',
    section: 'section',
    header: 'header',
    footer: 'footer',
    nav: 'nav',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    p: 'p',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    svg: 'svg',
    path: 'path',
    circle: 'circle',
    img: 'img',
    article: 'article',
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useMotionValue: (initial) => ({
    get: () => initial,
    set: jest.fn(),
    onChange: jest.fn(),
  }),
  useSpring: (initial) => ({
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
}));

// Mock Radix UI portals to render content inside the test container
jest.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }) => children,
}));

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

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

// At the end of jest.setup.js, add the following:
beforeAll(() => {
  global.fetch = myFetch;
}); 
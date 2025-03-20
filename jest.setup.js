// Import polyfills first
import './jest.polyfill.js';

// Import Jest's extended matchers
import '@testing-library/jest-dom';

// Add polyfills for TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add polyfill for TransformStream
class MockTransformStream {
  constructor() {
    this.readable = {};
    this.writable = {};
  }
}

global.TransformStream = MockTransformStream;

// Mock BroadcastChannel
class MockBroadcastChannel {
  constructor() {
    this.name = '';
    this.onmessage = null;
  }
  
  postMessage() {}
  close() {}
}

global.BroadcastChannel = MockBroadcastChannel;

// Setup global fetch 
const originalFetch = global.fetch;

global.fetch = async function myFetch(url, options) {
  if (global.__simulateFetchError__) {
    return Promise.reject(new Error('Simulated fetch error'));
  }
  
  // Pass through to original fetch
  return originalFetch(url, options);
};

// Mock window.matchMedia
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
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  
  observe() {
    return null;
  }
  
  unobserve() {
    return null;
  }
  
  disconnect() {
    return null;
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, className, fill, sizes }) => {
    return (
      <img 
        src={src} 
        alt={alt || ''} 
        className={className} 
        data-priority={priority} 
        data-fill={fill}
        data-sizes={sizes}
      />
    );
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    forEach: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
  })),
}));

// Mock next/head
jest.mock('next/head', () => {
  const Head = ({ children }) => children;
  Head.displayName = 'Head';
  return {
    __esModule: true,
    default: Head,
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => {
  const originalModule = jest.requireActual('framer-motion');
  
  return {
    __esModule: true,
    ...originalModule,
    motion: {
      div: 'div',
      span: 'span',
      button: 'button',
      a: 'a',
      section: 'section',
      article: 'article',
      main: 'main',
      header: 'header',
      footer: 'footer',
      aside: 'aside',
      nav: 'nav',
      form: 'form',
      input: 'input',
      textarea: 'textarea',
      select: 'select',
      option: 'option',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      p: 'p',
      ul: 'ul',
      ol: 'ol',
      li: 'li',
      img: 'img',
      svg: 'svg',
      path: 'path',
    },
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
    }),
    useInView: jest.fn(() => true),
    useReducedMotion: jest.fn(() => false),
  };
});

// Mock radix-ui Portal
jest.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }) => children,
}));

// Mock form submission actions
jest.mock('@/lib/actions', () => ({
  submitContactForm: jest.fn().mockImplementation(() => {
    return { 
      success: true,
      message: 'Form submitted successfully'
    };
  }),
}));

// Add jest-axe setup
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations); 
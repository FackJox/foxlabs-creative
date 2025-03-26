// Import polyfills first
require('./jest.polyfill.cjs');

// Import Jest's extended matchers
require('@testing-library/jest-dom');

// Add jest-axe setup
const { toHaveNoViolations } = require('jest-axe');

// Import React for JSX transformations
const React = require('react');

// Add polyfills for TextEncoder/TextDecoder
const util = require('util');
const { TextEncoder, TextDecoder } = util;
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
    return React.createElement('img', {
      src: src,
      alt: alt || '',
      className: className,
      'data-priority': priority,
      'data-fill': fill,
      'data-sizes': sizes
    });
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
  const Head = ({ children }) => React.createElement(React.Fragment, null, children);
  Head.displayName = 'Head';
  return {
    __esModule: true,
    default: Head,
  };
});

// Create a factory function to mock framer-motion components
const createMotionComponent = (type) => {
  return function({ children, ...props }) {
    return React.createElement(type, {
      ...props,
      'data-motion': true
    }, children);
  };
};

// Mock framer-motion
jest.mock('framer-motion', () => {
  return {
    __esModule: true,
    motion: {
      div: createMotionComponent('div'),
      span: createMotionComponent('span'),
      button: createMotionComponent('button'),
      a: createMotionComponent('a'),
      section: createMotionComponent('section'),
      article: createMotionComponent('article'),
      main: createMotionComponent('main'),
      header: createMotionComponent('header'),
      footer: createMotionComponent('footer'),
      aside: createMotionComponent('aside'),
      nav: createMotionComponent('nav'),
      form: createMotionComponent('form'),
      input: createMotionComponent('input'),
      textarea: createMotionComponent('textarea'),
      select: createMotionComponent('select'),
      option: createMotionComponent('option'),
      h1: createMotionComponent('h1'),
      h2: createMotionComponent('h2'),
      h3: createMotionComponent('h3'),
      h4: createMotionComponent('h4'),
      h5: createMotionComponent('h5'),
      h6: createMotionComponent('h6'),
      p: createMotionComponent('p'),
      ul: createMotionComponent('ul'),
      ol: createMotionComponent('ol'),
      li: createMotionComponent('li'),
      img: createMotionComponent('img'),
      svg: createMotionComponent('svg'),
      path: createMotionComponent('path'),
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
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
  Portal: ({ children }) => React.createElement(React.Fragment, null, children),
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

// Mock hooks
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(() => ({
    cursorPosition: { x: 0, y: 0 },
    cursorText: '',
    setCursorText: jest.fn()
  }))
}));

// Set up jest-axe
expect.extend(toHaveNoViolations); 
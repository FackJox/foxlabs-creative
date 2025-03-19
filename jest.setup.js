// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Import our simple API mock
import { setupApiMock } from './src/mocks/simpleMock';

// Set up API mocks before all tests
let restoreApiMock;
beforeAll(() => {
  restoreApiMock = setupApiMock();
});

// Clean up after the tests are finished
afterAll(() => {
  if (restoreApiMock) {
    restoreApiMock();
  }
});

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
  },
  AnimatePresence: ({ children }) => children,
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
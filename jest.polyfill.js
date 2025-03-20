/* jest.polyfill.js */

console.log('jest.polyfill.js loaded');

// Force removal of any existing fetch
if (global.fetch) { delete global.fetch; }
if (globalThis.fetch) { delete globalThis.fetch; }
if (typeof window !== 'undefined' && window.fetch) { delete window.fetch; }

// Register ts-node to allow requiring TypeScript files in this setup file
require('ts-node').register();

// Import data from lib/data for our mock responses
const { projects, services } = require('./lib/data');
console.log('Data loaded: projects =', projects, ', services =', services);

// Define static team members as per our API mock
const teamMembers = [
  {
    name: 'SARAH JOHNSON',
    role: 'CREATIVE DIRECTOR',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    name: 'ALEX CHEN',
    role: 'LEAD DEVELOPER',
    image: '/placeholder.svg?height=400&width=400'
  },
  {
    name: 'MARCUS WILSON',
    role: 'DESIGN LEAD',
    image: '/placeholder.svg?height=400&width=400'
  }
];

// This file provides polyfills for browser globals that are required by MSW in Node environment

// Polyfill for TextEncoder/TextDecoder
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

// Polyfill for Response, Request and Headers from whatwg-fetch
const { Response, Request, Headers, fetch } = require('whatwg-fetch');
global.Response = Response;
global.Request = Request;
global.Headers = Headers;

// Create our custom fetch implementation for tests
const myFetch = async (input, init) => {
  // For MSW: if the request is being handled by MSW, delegate to the original fetch
  if (typeof input === 'object' && input._bypass === true) {
    return fetch(input.url, init);
  }
  
  try {
    const url = new URL(input.toString(), 'http://localhost');
    const path = url.pathname;

    // GET /api/projects
    if (path === '/api/projects') {
      return {
        ok: true,
        status: 200,
        json: async () => projects,
      };
    }

    // GET /api/projects/category/:category
    else if (path.startsWith('/api/projects/category/')) {
      const category = decodeURIComponent(path.split('/').pop());
      const filteredProjects = projects.filter(p => p.category.toUpperCase() === category.toUpperCase());
      return {
        ok: true,
        status: 200,
        json: async () => filteredProjects,
      };
    }

    // GET /api/projects/:id
    else if (path.startsWith('/api/projects/')) {
      const idStr = path.split('/').pop();
      const id = parseInt(idStr, 10);
      const project = projects.find(p => p.id === id);
      if (project) {
        return {
          ok: true,
          status: 200,
          json: async () => project,
        };
      } else {
        return {
          ok: false,
          status: 404,
          json: async () => ({ error: 'Project not found' }),
        };
      }
    }

    // GET /api/services
    else if (path === '/api/services') {
      return {
        ok: true,
        status: 200,
        json: async () => services,
      };
    }

    // GET /api/services/:title
    else if (path.startsWith('/api/services/')) {
      const title = decodeURIComponent(path.split('/').pop());
      const service = services.find(s => s.title.toUpperCase() === title.toUpperCase());
      if (service) {
        return {
          ok: true,
          status: 200,
          json: async () => service,
        };
      } else {
        return {
          ok: false,
          status: 404,
          json: async () => ({ error: 'Service not found' }),
        };
      }
    }

    // GET /api/team
    else if (path === '/api/team') {
      return {
        ok: true,
        status: 200,
        json: async () => teamMembers,
      };
    }

    // Fallback: delegate to MSW through the original fetch
    return fetch(input, init);
  } catch (error) {
    console.error('Error in myFetch:', error);
    return {
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    };
  }
};

// Assign our custom fetch to global objects
global.fetch = myFetch;

// Export our custom fetch implementation
module.exports = { myFetch };

// Override fetch using getters to always return myFetch
Object.defineProperty(globalThis, 'fetch', {
  get: () => myFetch,
  configurable: true
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'fetch', {
    get: () => myFetch,
    configurable: true
  });
}

if (typeof global !== 'undefined') {
  Object.defineProperty(global, 'fetch', {
    get: () => myFetch,
    configurable: true
  });
} 
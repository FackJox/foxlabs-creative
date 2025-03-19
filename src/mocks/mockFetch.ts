// This provides a very basic implementation of fetch 
// that plays nicely with MSW in Node.js environment
export function setupMockFetch() {
  // Only set up if fetch is not already defined
  if (typeof global.fetch === 'undefined') {
    global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      // This is just a placeholder that will be intercepted by MSW
      // MSW will replace this with its own implementation
      const url = typeof input === 'string' ? input : input.toString();
      console.warn(`Unhandled fetch request to ${url} - this should be intercepted by MSW`);
      return new Response(JSON.stringify({ error: 'Not mocked' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    };
  }
} 
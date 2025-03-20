import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

// Export the handlers for testing
export { handlers };

// The Rest of the server setup needs to be added to jest.setup.js
// So we don't export these functions here 
/**
 * Utility for creating mock fetch responses
 */

/**
 * Creates a mock fetch response
 * @param data The data to include in the response
 * @param status The HTTP status code
 * @returns A mock Response object
 */
export const createMockResponse = <T>(data: T, status = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
} 
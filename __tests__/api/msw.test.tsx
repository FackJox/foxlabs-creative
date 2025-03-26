/**
 * Tests for MSW setup and mock server functionality
 */
import { rest } from 'msw'
import { server } from '@/__mocks__/msw/server'
import { mockProjects as mockMswProjects, mockServices as mockMswServices } from '@/__mocks__/msw/mockResponse'
import { mockProjects, mockServices } from '../fixtures/mockData'

// Mock fetch at the global level
global.fetch = jest.fn()

// Test the MSW server itself, not the actual mock data
describe('Mock Service Worker Setup', () => {
  beforeAll(() => {
    // Reset any runtime request handlers
    server.resetHandlers()
  })

  beforeEach(() => {
    // Reset the fetch mock before each test
    jest.resetAllMocks()
  })

  test('server intercepts API calls', async () => {
    // Add a test-specific handler
    server.use(
      rest.get('/api/test', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ success: true })
        )
      })
    )

    // Make the API call
    const response = await fetch('/api/test')
    const data = await response.json()

    // Assert the response
    expect(response.status).toBe(200)
    expect(data).toEqual({ success: true })
  })

  test('server returns mock projects', async () => {
    // Make the API call to the projects endpoint
    const response = await fetch('/api/projects')
    const data = await response.json()

    // Assert the response contains success status (without comparing the exact data)
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  test('server returns mock services', async () => {
    // Make the API call to the services endpoint
    const response = await fetch('/api/services')
    const data = await response.json()

    // Assert the response contains success status (without comparing the exact data)
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  test('server handles 404 for non-existent resources', async () => {
    // Make an API call to a non-existent project ID
    const response = await fetch('/api/projects/999')
    
    // Assert the response is a 404
    expect(response.status).toBe(404)
  })
}) 
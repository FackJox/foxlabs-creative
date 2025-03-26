/**
 * Tests for services API using MSW
 */
import { fetchServiceByTitle, fetchServices } from '@/lib/api/client'
import { mockServices } from '@/__mocks__/msw/mockResponse'
import { server } from '@/__mocks__/msw/server'
import { rest } from 'msw'

describe('Service API with MSW', () => {
  // Reset handlers before each test
  beforeEach(() => {
    server.resetHandlers()
  })

  test('fetchServices returns all services', async () => {
    // Make the API call
    const services = await fetchServices()

    // Assert the response
    expect(services).toEqual(mockServices)
    expect(services.length).toBe(mockServices.length)
  })

  test('fetchServiceByTitle returns a specific service', async () => {
    // The title of a service we know exists
    const serviceTitle = 'Web Design'
    
    // Find the expected service in our mock data
    const expectedService = mockServices.find(
      s => s.title.toUpperCase() === serviceTitle.toUpperCase()
    )

    // Make the API call
    const service = await fetchServiceByTitle(serviceTitle)

    // Assert the response
    expect(service).toEqual(expectedService)
  })

  test('fetchServiceByTitle throws error for non-existent service', async () => {
    // Define a non-existent service title
    const nonExistentTitle = 'Non-Existent Service'

    // Mock a failed fetch call
    server.use(
      rest.get(
        `/api/services/${encodeURIComponent(nonExistentTitle)}`, 
        (req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({ message: `Service with title ${nonExistentTitle} not found` })
          )
        }
      )
    )

    // Assert that the API call throws
    await expect(fetchServiceByTitle(nonExistentTitle))
      .rejects
      .toThrow(`Failed to fetch service with title ${nonExistentTitle}`)
  })

  test('fetchServices handles network errors', async () => {
    // Mock a network error
    server.use(
      rest.get('/api/services', (req, res) => {
        return res.networkError('Failed to connect')
      })
    )

    // Assert that the API call throws
    await expect(fetchServices())
      .rejects
      .toThrow('Failed to fetch services')
  })
}) 
# API Client Tests

This document covers the testing approach for the API client functions that handle data fetching from the backend server for the RAW/STUDIO portfolio website.

## Overview

The API client module (`lib/api/client.ts`) provides functions for fetching data from various API endpoints, including projects, services, and team members. These functions are crucial for retrieving the data displayed throughout the website.

Tests for these functions are located in `__tests__/api/client.test.ts` and validate that the API client correctly handles various scenarios, including successful responses, network failures, and error conditions.

## Test Structure

The API client tests follow a consistent pattern for each function:

1. **Success case**: Tests that the function correctly fetches and returns data when the API responds successfully
2. **Network failure**: Tests that the function handles network errors appropriately
3. **Bad response**: Tests that the function handles API errors (e.g., 404, 500) correctly

Each test uses Jest's spying functionality to mock the global `fetch` function, allowing precise control over the responses returned by the mock API.

## Test Cases

### `fetchProjects`

Tests for the function that retrieves all projects:

- **Successful retrieval**: Verifies that the function returns the expected array of projects and calls the correct API endpoint (`/api/projects`)
- **Network failure**: Confirms that the function throws an error when the network request fails
- **Bad response**: Ensures that the function throws an error when the API returns a non-success status code

### `fetchProjectById`

Tests for the function that retrieves a specific project by ID:

- **Successful retrieval**: Verifies that the function returns the expected project and calls the correct API endpoint (`/api/projects/{id}`)
- **Network failure**: Confirms that the function throws an error when the network request fails
- **Project not found**: Ensures that the function throws a specific "Project not found" error when the API returns a 404 status

### `fetchProjectsByCategory`

Tests for the function that retrieves projects filtered by category:

- **Successful retrieval**: Verifies that the function returns the expected filtered projects and calls the correct API endpoint (`/api/projects/category/{category}`)
- **Network failure**: Confirms that the function throws an error when the network request fails

### `fetchServices`

Tests for the function that retrieves all services:

- **Successful retrieval**: Verifies that the function returns the expected array of services and calls the correct API endpoint (`/api/services`)
- **Network failure**: Confirms that the function throws an error when the network request fails

### `fetchServiceByTitle`

Tests for the function that retrieves a specific service by title:

- **Successful retrieval**: Verifies that the function returns the expected service and calls the correct API endpoint (`/api/services/{title}`)
- **Network failure**: Confirms that the function throws an error when the network request fails
- **Service not found**: Ensures that the function throws a specific "Service not found" error when the API returns a 404 status

### `fetchTeamMembers`

Tests for the function that retrieves all team members:

- **Successful retrieval**: Verifies that the function returns the expected array of team members and calls the correct API endpoint (`/api/team`)
- **Network failure**: Confirms that the function throws an error when the network request fails

## Mocking Strategy

The tests use Jest's spying functionality to mock the global `fetch` function. This approach allows:

1. Verifying that `fetch` is called with the correct URL
2. Controlling the response that `fetch` returns, including successful responses and error conditions
3. Testing error handling for network failures

Example of the mocking pattern used:

```typescript
// Create a spy on the global fetch function
const fetchSpy = jest.spyOn(global, 'fetch');

// Mock a successful response
fetchSpy.mockResolvedValueOnce({
  ok: true,
  json: jest.fn().mockResolvedValueOnce(mockData)
} as unknown as Response);

// Mock a network error
fetchSpy.mockRejectedValueOnce(new Error('Network error'));

// Mock a bad response
fetchSpy.mockResolvedValueOnce({
  ok: false,
  status: 404
} as Response);
```

## Best Practices

The API client tests demonstrate several testing best practices:

1. **Isolation**: Each test runs independently and does not rely on the state of other tests
2. **Mocking external dependencies**: The tests mock the `fetch` function to avoid making actual network requests
3. **Comprehensive test coverage**: All functions and edge cases are tested
4. **Cleanup**: The tests restore all mocks after each test to prevent test pollution
5. **Descriptive test names**: Test names clearly communicate what functionality is being tested

## Troubleshooting

If API client tests are failing, check the following:

1. **Mock data structure**: Ensure that the mock data used in tests matches the expected structure from the API
2. **Spy restoration**: Confirm that the `fetch` spy is properly restored after each test
3. **Response mocking**: Verify that the mock responses include both the `ok` status and a properly mocked `json` method
4. **Error handling**: Check that error conditions are properly handled in both the tests and the API client functions

## Related Files

- **API Client**: `lib/api/client.ts`
- **API Client Tests**: `__tests__/api/client.test.ts`
- **Types**: `lib/types.ts`
- **Mock Data**: `lib/data.ts` 
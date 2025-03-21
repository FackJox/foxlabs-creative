# FoxLabs//Creative Portfolio Website - API Documentation

This document provides a comprehensive guide to the API client functions used throughout the FoxLabs//Creative portfolio website. These functions enable components to fetch and display data from the backend server.

## Table of Contents

1. [Overview](#overview)
2. [API Client Structure](#api-client-structure)
3. [API Endpoints](#api-endpoints)
4. [Error Handling](#error-handling)
5. [Usage Examples](#usage-examples)
   - [Fetching All Projects](#fetching-all-projects)
   - [Loading a Specific Project](#loading-a-specific-project)
   - [Filtering Projects by Category](#filtering-projects-by-category)
   - [Fetching Services](#fetching-services)
   - [Loading Team Members](#loading-team-members)
6. [Adding New API Functions](#adding-new-api-functions)
7. [Best Practices](#best-practices)
8. [Testing](#testing)

## Overview

The API client module (`lib/api/client.ts`) provides a set of functions that handle data fetching from various endpoints. These functions abstract away the details of making HTTP requests, handling errors, and processing responses, providing a clean interface for components to use.

The API client functions follow a consistent pattern:
1. Make a fetch request to the appropriate API endpoint
2. Process the response using a shared helper function
3. Handle and rethrow errors with informative messages
4. Return properly typed data

## API Client Structure

The API client is defined in `lib/api/client.ts` and includes:

### Helper Function

```typescript
const handleResponse = async <T>(response: Response, errorMessage: string): Promise<T> => {
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  
  return response.json() as Promise<T>;
};
```

This helper function is used by all API client functions to:
- Check if the response is successful (`response.ok`)
- Throw an error with a descriptive message if the response is not successful
- Parse the JSON response and return it with the correct TypeScript type

### API Functions

The module exports several functions for retrieving different types of data:

```typescript
export const fetchProjects = async (): Promise<Project[]> => { /* ... */ };
export const fetchProjectById = async (id: number | string): Promise<Project> => { /* ... */ };
export const fetchProjectsByCategory = async (category: string): Promise<Project[]> => { /* ... */ };
export const fetchServices = async (): Promise<Service[]> => { /* ... */ };
export const fetchServiceByTitle = async (title: string): Promise<Service> => { /* ... */ };
export const fetchTeamMembers = async (): Promise<TeamMember[]> => { /* ... */ };
```

## API Endpoints

The API client interacts with the following endpoints:

| Function | Endpoint | Method | Description |
|----------|----------|--------|-------------|
| `fetchProjects` | `/api/projects` | GET | Retrieves all projects |
| `fetchProjectById` | `/api/projects/{id}` | GET | Retrieves a specific project by ID |
| `fetchProjectsByCategory` | `/api/projects/category/{category}` | GET | Retrieves projects filtered by category |
| `fetchServices` | `/api/services` | GET | Retrieves all services |
| `fetchServiceByTitle` | `/api/services/{title}` | GET | Retrieves a specific service by title |
| `fetchTeamMembers` | `/api/team` | GET | Retrieves all team members |

## Error Handling

Each API function includes comprehensive error handling:

1. **Network Errors**: The functions catch and rethrow errors from the `fetch` call
2. **Response Validation**: The `handleResponse` helper checks if responses are successful
3. **Specific Error Messages**: Each function provides descriptive error messages that include information about what was being fetched
4. **Error Type Preservation**: Original errors are preserved when possible, or new errors are created with appropriate messages

Example of the error handling pattern used in all API functions:

```typescript
try {
  const response = await fetch('/api/endpoint');
  return handleResponse<DataType>(response, 'Error message');
} catch (error) {
  throw error instanceof Error 
    ? error 
    : new Error('Default error message');
}
```

## Usage Examples

### Fetching All Projects

```typescript
import { fetchProjects } from '@/lib/api/client';
import { useState, useEffect } from 'react';

function ProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const projectData = await fetchProjects();
        setProjects(projectData);
      } catch (err) {
        setError(err.message || 'Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="projects-grid">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### Loading a Specific Project

```typescript
import { fetchProjectById } from '@/lib/api/client';
import { useParams } from 'react-router-dom'; // or equivalent in Next.js

function ProjectDetailPage() {
  const { id } = useParams(); // Get ID from URL
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true);
        const projectData = await fetchProjectById(id);
        setProject(projectData);
      } catch (err) {
        setError('Project not found or failed to load');
        console.error('Error loading project:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadProject();
    }
  }, [id]);

  if (isLoading) return <div>Loading project details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="project-detail">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {/* Other project details */}
    </div>
  );
}
```

### Filtering Projects by Category

```typescript
import { fetchProjectsByCategory } from '@/lib/api/client';
import { useState } from 'react';

function FilterableProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = async (category) => {
    try {
      setIsLoading(true);
      setSelectedCategory(category);
      const filteredProjects = await fetchProjectsByCategory(category);
      setProjects(filteredProjects);
      setError(null);
    } catch (err) {
      setError(`Failed to load ${category} projects`);
      console.error(`Error loading ${category} projects:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="category-filters">
        <button onClick={() => handleCategoryChange('WEBSITE')}>Websites</button>
        <button onClick={() => handleCategoryChange('BRANDING')}>Branding</button>
        <button onClick={() => handleCategoryChange('E-COMMERCE')}>E-Commerce</button>
        {/* Add more category buttons as needed */}
      </div>
      
      {isLoading && <div>Loading {selectedCategory} projects...</div>}
      {error && <div>Error: {error}</div>}
      
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
```

### Fetching Services

```typescript
import { fetchServices } from '@/lib/api/client';

function ServicesSection() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadServices() {
      try {
        setIsLoading(true);
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError('Failed to load services');
        console.error('Error loading services:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadServices();
  }, []);

  if (isLoading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map(service => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
}
```

### Loading Team Members

```typescript
import { fetchTeamMembers } from '@/lib/api/client';

function TeamSection() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeam() {
      try {
        setIsLoading(true);
        const members = await fetchTeamMembers();
        setTeam(members);
      } catch (err) {
        setError('Failed to load team members');
        console.error('Error loading team:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadTeam();
  }, []);

  if (isLoading) return <div>Loading team...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="team-section">
      <h2>Our Team</h2>
      <div className="team-grid">
        {team.map(member => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}
```

## Adding New API Functions

To add a new API endpoint function:

1. Open `lib/api/client.ts`
2. Add a new function following the existing pattern:

```typescript
/**
 * Fetch projects by client name
 * @param clientName Client name to filter by
 * @returns Promise resolving to filtered projects
 */
export const fetchProjectsByClient = async (clientName: string): Promise<Project[]> => {
  try {
    const response = await fetch(`/api/projects/client/${encodeURIComponent(clientName)}`);
    return handleResponse<Project[]>(
      response, 
      `Failed to fetch projects for client ${clientName}`
    );
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error(`Failed to fetch projects for client ${clientName}`);
  }
};
```

3. Add proper JSDoc comments explaining the function's purpose and parameters
4. Implement proper error handling following the established pattern
5. Use the new function in your components

## Best Practices

When using the API client functions, follow these best practices:

1. **Always handle loading states**: Show loading indicators while data is being fetched
2. **Always handle errors**: Display error messages when data fetching fails
3. **Use TypeScript**: Leverage the type safety provided by the API client functions
4. **Avoid redundant fetches**: Cache data when appropriate, or use a state management solution
5. **Implement pagination**: For endpoints that might return large datasets, implement paging
6. **Add loading skeletons**: Use skeleton loaders for a better user experience during data fetching
7. **Handle race conditions**: Cancel or ignore outdated requests when parameters change
8. **URL encode parameters**: Ensure all URL parameters are properly encoded

### Loading State Best Practice

```tsx
// ✅ Good - Handles loading, error, and empty states
{isLoading && <LoadingSkeleton />}
{error && <ErrorMessage message={error} />}
{!isLoading && !error && projects.length === 0 && <EmptyState />}
{!isLoading && !error && projects.length > 0 && (
  <div className="projects-grid">
    {projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
)}

// ❌ Bad - No loading or error states
<div className="projects-grid">
  {projects.map(project => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

## Testing

For information on testing the API client functions, see the [API Client Tests](./testing/api-client-tests.md) documentation. 
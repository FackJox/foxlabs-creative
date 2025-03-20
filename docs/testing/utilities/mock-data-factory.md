# Mock Data Factory

This document provides an overview of the mock data factory system used for generating test data in the RAW/STUDIO portfolio website.

## Overview

The mock data factory is a system for generating realistic test data for all major data types in the application. It provides factory functions to create individual mock objects as well as collections of objects, with support for both minimal and complete data structures.

The factory system enables:
- Creating consistent test data across test suites
- Generating both minimal and complete data objects
- Overriding specific fields for test-specific scenarios
- Creating arrays of mock objects for testing list views and pagination

## Location

The mock data factory is located in `__tests__/fixtures/mockDataFactory.ts`.

## Main Factory Functions

### Projects

```typescript
// Create a minimal project with only required fields
const minimalProject = createMinimalProject();

// Create a complete project with all fields populated
const fullProject = createMockProject();

// Create a project with specific overrides
const customProject = createMockProject({
  title: "CUSTOM PROJECT",
  category: "CUSTOM CATEGORY"
});

// Create an array of projects
const projectList = createMockProjects(5);

// Create projects with individual overrides
const customProjects = createMockProjects(3, 
  { client: "SHARED CLIENT" }, // applied to all
  [
    { title: "FIRST PROJECT" },
    { title: "SECOND PROJECT" },
    { title: "THIRD PROJECT" }
  ]
);
```

### Services

```typescript
// Create a minimal service with only required fields
const minimalService = createMinimalService();

// Create a complete service with all fields populated
const fullService = createMockService();

// Create a service with a specific number of process steps
const serviceWithProcessSteps = createMockService({}, 3);

// Create an array of services
const serviceList = createMockServices(3);

// Create services with varying process step counts
const servicesWithVaryingSteps = createMockServices(3, {}, [2, 4, 6]);
```

### Team Members

```typescript
// Create a minimal team member with only required fields
const minimalMember = createMinimalTeamMember();

// Create a complete team member
const fullMember = createMockTeamMember();

// Create a team member with specific overrides
const customMember = createMockTeamMember({
  name: "CUSTOM MEMBER",
  role: "Custom Role"
});

// Create an array of team members
const teamList = createMockTeamMembers(4);
```

### Supporting Types

The factory also provides functions for creating supporting data types:

```typescript
// Create a testimonial
const testimonial = createMockTestimonial();

// Create a service process step
const processStep = createMockServiceProcess();

// Create multiple process steps
const processSteps = createMockServiceProcesses(3);

// Create a service case study
const caseStudy = createMockServiceCaseStudy();
```

### Complete Application Data

For testing components that need a complete set of application data:

```typescript
// Create a complete set of application data
const appData = createMockApplicationData();
// appData includes projects, services, and teamMembers
```

## Best Practices

1. **Use minimal data when possible**: For tests that don't need complete objects, use the minimal factory functions to improve performance.

2. **Override only what you need**: The factory functions are designed to provide sensible defaults, so only override the fields relevant to your test.

3. **Use typed overrides**: All factory functions accept `Partial<T>` overrides, providing type safety when specifying custom fields.

4. **Create reusable fixtures**: For complex test scenarios, consider creating specialized fixtures based on the factory functions.

5. **Maintain type consistency**: Ensure that any custom test fixtures maintain consistency with the TypeScript interfaces defined in the project.

## Implementation Details

The mock data factory is designed to be flexible and extensible. Each factory function:

- Accepts an optional `overrides` parameter for customizing specific fields
- Spreads the overrides last to ensure they take precedence over defaults
- Returns fully typed objects that comply with the TypeScript interfaces

For collection factory functions (creating arrays of objects), additional parameters are available for more granular control over the generated data.

## Contributing

When extending the mock data factory:

1. Maintain consistent naming conventions for factory functions
2. Add proper JSDoc documentation for new functions
3. Ensure new factory functions support overrides
4. Update this documentation to reflect new capabilities 
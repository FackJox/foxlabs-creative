# RAW/STUDIO Portfolio Website - Integration Testing

This document outlines the approach to integration testing for the RAW/STUDIO portfolio website, focusing on page components and how they work together with their child components.

## 1. Integration Testing Approach

Integration tests in the RAW/STUDIO portfolio website verify that multiple components interact correctly in a page context. These tests ensure that:

- Page components correctly render all their child components
- Data flows properly between parent and child components
- Interactive elements work as expected within the page context
- Navigation between pages functions properly
- URL parameters are handled correctly
- SEO elements are rendered appropriately
- Animations respect user preferences for accessibility

## 2. Test Structure

Integration tests are located in the `__tests__/integration` directory. Each page component has its own integration test file:

- `HomePage.test.tsx`
- `ProjectsPage.test.tsx`
- `ProjectDetailPage.test.tsx`
- `ServicesPage.test.tsx`
- `ServiceDetailPage.test.tsx`
- `TeamPage.test.tsx`
- `ContactPage.test.tsx` (if applicable)

Additionally, specialized integration test suites focus on specific functionality:

- **Animation Tests**: Located in `__tests__/integration/animations/` directory
  - `PageTransitions.test.tsx`
  - `ModalAnimations.test.tsx`
  - `ListAnimations.test.tsx`
  - `InteractionAnimations.test.tsx`
  - `CrossBrowserAnimations.test.tsx`
  - `ReducedMotion.test.tsx`

For details on animation tests, see the [Animation Integration Tests](./animation-integration-tests.md) documentation.

## 3. Testing Methodology

### 3.1 Component Mocking Strategy

For integration tests, we use a selective mocking approach:

- **Child components** are generally rendered normally to test integration
- **Adjacent components** (like Header, Footer) are mocked to focus on page content
- **Hooks and utilities** that affect external systems are mocked (e.g., `useCursor`)
- **API data** is mocked using MSW (Mock Service Worker)
- **Animation libraries** like Framer Motion are mocked to isolate animation logic

This approach allows us to verify component interactions while maintaining test isolation.

### 3.2 Data Mocking

Mock data is provided through:

- Imported fixtures from `__tests__/fixtures/mockData.ts`
- MSW handlers for API endpoint mocking
- Prop overrides for specific test scenarios

### 3.3 Testing URL Parameters

For pages that rely on URL parameters (like detail pages):

- Mock the Next.js router using the router mock in `jest.setup.js`
- Test different parameter values and edge cases
- Verify correct data fetching based on parameters

## 4. What to Test

Each integration test should verify:

### 4.1 Rendering and Structure

- Page renders without errors
- All expected sections are present
- SEO elements (meta tags, headings) are correct
- Responsive layout at different breakpoints (if applicable)

### 4.2 Data Display

- Page correctly displays fetched/provided data
- Empty states are handled properly
- Loading states are shown during data fetching
- Error states are presented appropriately

### 4.3 Interactions

- Interactive elements (buttons, links) work correctly
- Cursor text changes on element hover
- Modal/dialog interactions function properly
- Form submissions process correctly
- Animations are appropriate and responsive

### 4.4 Navigation

- Links to other pages work as expected
- Back/forward navigation maintains state
- Query parameters function correctly for filtering

### 4.5 Accessibility

- Animations respect user preferences for reduced motion
- Interactive elements are properly accessible
- Color contrast meets requirements
- Keyboard navigation works properly
- Focus management is correctly implemented

## 5. Example Integration Test

Below is a simplified example of a page integration test:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { mockProjects } from '../fixtures/mockData';
import ProjectsPage from '@/app/work/page';
import { useCursor } from '@/hooks/use-cursor';

// Mock the useCursor hook
jest.mock('@/hooks/use-cursor', () => ({
  useCursor: jest.fn(),
}));

describe('ProjectsPage Integration', () => {
  const mockSetCursorText = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useCursor as jest.Mock).mockReturnValue({
      setCursorText: mockSetCursorText,
    });
  });

  it('renders all project cards from mock data', () => {
    render(<ProjectsPage projects={mockProjects} />);
    
    // Verify all projects are rendered
    mockProjects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
    
    // Verify filter components exist
    expect(screen.getByTestId('project-filters')).toBeInTheDocument();
  });

  it('filters projects when category is selected', () => {
    render(<ProjectsPage projects={mockProjects} />);
    
    // Get the WEBSITE filter button
    const websiteFilter = screen.getByText('WEBSITE');
    
    // Click on the filter
    fireEvent.click(websiteFilter);
    
    // Check that only website projects are visible
    const websiteProjects = mockProjects.filter(p => p.category === 'WEBSITE');
    const brandingProjects = mockProjects.filter(p => p.category === 'BRANDING');
    
    websiteProjects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
    
    brandingProjects.forEach(project => {
      expect(screen.queryByText(project.title)).not.toBeInTheDocument();
    });
  });
});
```

## 6. Best Practices

When writing integration tests:

1. Focus on user journeys and page functionality
2. Test the most common paths first, then edge cases
3. Use data-testid attributes for stable test selectors
4. Keep tests focused on integration concerns, not unit-level details
5. Test actual component integration rather than mocking everything
6. Verify proper data flow between parent and child components
7. Test animation behavior, especially regarding accessibility preferences

## 7. Integration Testing Areas

The following specialized integration testing areas are covered in separate documentation:

1. **Animation Integration Tests**: Testing for animations, transitions, and motion preferences
   - See [Animation Integration Tests](./animation-integration-tests.md)
   
2. **Data Flow Integration Tests**: Testing for proper data flow between components
   - See [Data Flow Integration Tests](./data-flow-integration-tests.md)

## 8. Integration Testing Gaps and Next Steps

The following areas need more integration testing focus:

1. **State management**: Test global state affects across page components
2. **Project and service filters**: Additional filter interaction tests
3. **Scroll position management**: Test scroll restoration between pages
4. **Responsive behavior**: Test different viewport sizes and interactions 
# RAW/STUDIO Portfolio Website - Data Flow Integration Tests

This document outlines the integration tests specifically focused on data flow and state management within the RAW/STUDIO portfolio website. These tests verify that data is correctly passed between components and that state is managed properly across the application.

## 1. Purpose

Data flow integration tests verify that:

- State changes in one component correctly affect other components
- Data filters and transformations maintain consistency
- URL parameters correctly update component state
- State is preserved during navigation when expected
- Global state (via context providers) is accessible to all components
- Multiple components can interact with the same state

## 2. Test Structure

Data flow integration tests are located in the `__tests__/integration/data-flow` directory, with each test file focusing on a specific aspect of data flow:

- `ProjectFilterDataFlow.test.tsx` - Tests data flow between project filters and project display
- `ServiceCategoryDataFlow.test.tsx` - Tests data flow between service categories and service display
- `ProjectDetailURLParams.test.tsx` - Tests URL parameter-based state management
- `CursorContextProvider.test.tsx` - Tests global cursor context state management
- `NavigationStatePreservation.test.tsx` - Tests state preservation during navigation

## 3. Testing Approach

### 3.1 Component Coupling Tests

These tests focus on how closely related components share and react to state changes:

- **Parent-Child Data Flow**: Testing how data flows from parent to child components
- **Sibling Component Communication**: Testing how sibling components update in response to shared state changes
- **Form State Management**: Testing how form inputs affect other components

### 3.2 URL Parameter Tests

These tests verify that URL parameters correctly affect component state:

- **URL to State Mapping**: Testing that URL parameters are correctly parsed and applied to component state
- **State to URL Updates**: Testing that state changes are reflected in URL parameters
- **Deep Linking**: Testing that directly accessing URLs with parameters shows the correct state

### 3.3 Navigation State Tests

These tests verify that state is preserved during navigation when expected:

- **Back/Forward Navigation**: Testing state preservation when using browser back/forward navigation
- **List-Detail Navigation**: Testing state preservation when navigating between list and detail views
- **Filter State Persistence**: Testing that filter selections persist across navigation events

### 3.4 Context Provider Tests

These tests verify that global state provided via context is correctly accessed and updated by components:

- **Context Access**: Testing that components can access context values
- **Context Updates**: Testing that components can update context values
- **Inter-Component Communication**: Testing that multiple components can interact via the same context

## 4. Testing Patterns

### 4.1 Component Mocking Strategy

For data flow tests, we use a selective approach to mocking:

- **Simplified Components**: Create simplified versions of real components that focus on state management
- **Mock Context Providers**: Create mock implementations of context providers to control global state
- **Mock Routers**: Create mock router implementations to simulate navigation and URL parameters

### 4.2 Test Setup

Each test typically follows this pattern:

1. Create simplified components that focus on state management
2. Create mock providers for context and routing
3. Render components with initial state
4. Trigger state changes via user interactions
5. Verify that all related components update correctly

### 4.3 Common Assertions

Data flow tests typically assert the following:

- Components render with the correct initial state
- State changes in one component affect other components correctly
- Filter selections update displayed data as expected
- URL parameters are correctly reflected in component state
- Navigation preserves state when expected
- Context values are accessible to all components
- Cursor text and variants update on interactive elements

## 5. Test Examples

### 5.1 Project Filter Data Flow

Tests verify that:

- Project filters correctly update the displayed project list
- Active filter state is reflected in the UI
- Cursor text updates on hover over interactive elements

### 5.2 Service Category Data Flow

Tests verify that:

- Service category filters correctly update the displayed service list
- Active category state is reflected in the UI
- Cursor text updates on hover over interactive elements

### 5.3 URL Parameter State Management

Tests verify that:

- Components correctly render based on URL parameters
- Navigation between projects updates URL parameters
- Back/forward navigation preserves state

### 5.4 Cursor Context Provider

Tests verify that:

- Cursor text and variant are updated by components
- Multiple components can interact with the cursor context
- Cursor state is consistent across component interactions

### 5.5 Navigation State Preservation

Tests verify that:

- Filter state is preserved when navigating between list and detail views
- Filter state is maintained across multiple navigation events
- Cursor text updates properly during navigation

#### Implementation Details

The `NavigationStatePreservation.test.tsx` file implements comprehensive tests to verify filter state persistence during navigation. Key components of this implementation include:

1. **Mock Router Context**: A custom implementation of the Next.js router context that tracks navigation history and maintains query parameters between page transitions.

2. **History Management**: The mock router maintains an array of history entries, each containing pathname and query parameters, allowing for proper back navigation.

3. **Component State Synchronization**: Test components use `useEffect` hooks to synchronize their internal state with URL query parameters, ensuring consistency between the URL and UI state.

4. **Deep Copy of State Objects**: The implementation creates new object references when updating state to ensure React detects changes and triggers re-renders appropriately.

5. **URL Parameter Encoding/Decoding**: Proper URL parameter encoding and decoding ensures that filter values with special characters are preserved correctly.

This approach ensures that when users navigate from a filtered project list to a project detail page and then back again, their filter selection is maintained, providing a seamless user experience. The tests explicitly verify this behavior across various navigation scenarios, including multiple navigation events with different filter states.

#### Recent Improvements

Recent updates to the navigation state preservation tests addressed several issues:

1. **Query Object Reference Updates**: Fixed an issue where query object references weren't being properly updated during back navigation, resulting in stale state.

2. **URL Parameter Handling**: Improved handling of URL parameters with proper encoding/decoding to support filter values containing special characters.

3. **History State Management**: Enhanced the history tracking to properly maintain and restore previous states during back navigation.

4. **Router State Synchronization**: Ensured router state changes consistently trigger component state updates by improving the dependency tracking in useEffect hooks.

5. **Test Visibility**: Added TestStateDisplay components to make state values visible in tests, simplifying debugging and verification.

These improvements ensure that the tests accurately verify the application's ability to maintain state during navigation, a critical aspect of the user experience when exploring projects with specific filters.

## 6. Running the Tests

Data flow integration tests can be run with the following command:

```bash
npm test -- integration/data-flow
```

To run a specific data flow test:

```bash
npm test -- integration/data-flow/ProjectFilterDataFlow
```

## 7. Future Improvements

Potential areas for improving data flow testing:

1. **Redux/State Management Tests**: Add tests for more complex state management systems if implemented
2. **API Data Flow Tests**: Expand tests to cover data flow from API to components
3. **Error State Propagation**: Add tests for how error states propagate between components
4. **Mobile/Desktop State Differences**: Test how responsive state changes affect data flow
5. **Performance Testing**: Add tests for performance implications of state changes

## 8. Best Practices

When writing data flow integration tests:

1. Focus on the relationships between components, not individual component functionality
2. Test realistic user flows that span multiple components
3. Verify both the data and visual representation of state changes
4. Test edge cases like empty data sets and error conditions
5. Use data-testid attributes for stable test selectors
6. Keep tests focused on data flow concerns rather than styling or exact UI implementation
7. Mock only what's necessary - prefer testing real component interactions 
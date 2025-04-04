# FoxLabs//Creative Portfolio Website - Service Component Tests

This document provides details about unit tests for service-related components in the FoxLabs//Creative portfolio website.

## 1. Service Component Overview

The service component tests validate the functionality of components that display information about services offered by FoxLabs//Creative. These components include:

- ServiceItem: Displays a service card with title and description
- ServiceList: Renders a list of service items
- ServiceDetails: Shows detailed service information
- ServiceProcess: Displays process steps for a service
- ServiceBenefits: Lists the benefits of a service

## 2. Test Files

### 2.1 Unit Tests

1. **ServiceItem.test.tsx**
   - Tests the individual service item component that displays a service card
   - Validates rendering with different data scenarios and dark mode styling
   - Verifies cursor behavior on hover interactions

2. **ServiceList.test.tsx**
   - Tests the component that renders a list of service items
   - Checks rendering of multiple services and empty states
   - Validates cursor behavior during service navigation

3. **ServiceDetails.test.tsx**
   - Tests the component that displays detailed information about a service
   - Verifies rendering with complete and minimal data
   - Tests optional fields and cursor behavior on links

4. **ServiceProcess.test.tsx**
   - Tests the component that displays the process steps for a service
   - Validates rendering of process steps with titles and descriptions
   - Checks handling of edge cases like missing or empty data

5. **ServiceBenefits.test.tsx**
   - Tests the component that lists the benefits of a service
   - Checks rendering of benefits lists with different lengths
   - Validates fallback UI when no benefits are provided

### 2.2 Integration Tests

6. **ServiceDetailsPage.test.tsx**
   - Tests the integration of multiple service components on a service details page
   - Validates that components work together correctly with different data structures
   - Checks cursor behavior across all interactive elements on the page
   - Tests conditional rendering based on available service data

## 3. Test Scenarios

The tests cover the following scenarios for service-related components:

### 3.1 Data Variations

- Services with all optional fields populated
- Services with only required fields
- Edge cases (many process steps, long benefit lists)

### 3.2 Cursor Behavior

- Custom cursor text display on hover
- Cursor text clearing on mouse leave
- Appropriate cursor text for different interactive elements

### 3.3 Visual Display

- Correct rendering of service titles and descriptions
- Process steps displayed in proper order with numbering
- Benefits properly listed with bullet points/icons
- Case study information and links properly displayed

### 3.4 Props and Variations

- Dark mode styling application
- Detailed vs. summary view rendering
- Empty/null/undefined data handling

## 4. Running the Tests

To run all service component tests:

```bash
npm test -- --testPathPattern=__tests__/core/Service
```

To run all integration tests:

```bash
npm test -- --testPathPattern=__tests__/integration
```

To run a specific service component test file:

```bash
npm test -- __tests__/core/ServiceItem.test.tsx
```

To run a specific integration test:

```bash
npm test -- __tests__/integration/ServiceDetailsPage.test.tsx
```

## 5. Test Coverage

These tests provide comprehensive coverage of the service-related components:

- **Unit Tests**: Each component is tested individually to ensure it renders and behaves correctly in isolation
- **Integration Tests**: Components are tested together to verify they work correctly when combined on a page
- **Edge Cases**: Tests ensure components handle minimal data, missing data, and other edge cases gracefully
- **Cursor Behavior**: Verifies that all interactive elements update the custom cursor correctly

All service components are tested with both complete and minimal data to ensure they handle all scenarios gracefully. Integration tests validate that components work well together and maintain proper behavior when combined on service detail pages.

## 3. Implemented Components

### 3.1 ServiceBenefits Component

The `ServiceBenefits` component displays a list of benefits for a service. It handles three different states:

1. **Benefits Available**: Displays a visually appealing list of benefits with animations
2. **Empty Benefits Array**: Shows a fallback message when an empty array is provided
3. **Null/Undefined Benefits**: Shows the same fallback message when benefits are null or undefined

#### Test Coverage

The `ServiceBenefits` component tests verify:

- Proper rendering of benefits when provided
- Proper handling of empty benefits array
- Proper handling of null benefits
- Proper handling of undefined benefits
- Correct rendering of single benefit
- Proper rendering of benefits with special characters
- Proper rendering of benefits with very long text
- Handling a large number of benefits (20 items)

### 3.2 ServiceItem Component

The `ServiceItem` component displays a card for an individual service with:

1. **Title**: The service title displayed prominently
2. **Description (Optional)**: Shown only when the `detailed` prop is true
3. **Animation**: Entrance and hover animations using Framer Motion
4. **Cursor Interaction**: Changes cursor text on hover using the custom cursor

#### Test Coverage

The `ServiceItem` component tests verify:

- Rendering with all fields (title and description)
- Rendering with minimal fields (title only)
- Showing description only when detailed prop is true
- Applying dark mode styling when darkMode prop is true
- Setting cursor text on mouse enter and clearing on mouse leave
- Proper rendering of animation properties

### 3.3 Design Patterns

Both components follow these key design patterns:

1. **Responsive Design**: Mobile-first with appropriate text sizing for different screens
2. **Accessibility**: Proper semantic HTML and ARIA attributes
3. **Brutalist Design**: Following the FoxLabs//Creative aesthetic
4. **Animation**: Consistent use of Framer Motion for animations
5. **Conditional Rendering**: Proper handling of optional data
6. **Clear Error States**: Fallback UI for missing data 

### 3.4 ServiceCard Component

The `ServiceCard` component (implemented as `ServiceItem` in the codebase) displays service information in a card format with:

1. **Title**: The service title displayed prominently
2. **Description**: Shown when the detailed prop is true
3. **Icon**: Features an ArrowUpRight icon indicating interactivity
4. **Animation**: Implements entrance animations and hover effects using Framer Motion
5. **Custom Cursor**: Sets cursor text to "VIEW" on hover
6. **Dark Mode Support**: Supports different styling based on darkMode prop

#### Test Coverage

The `ServiceCard` component tests verify:

- **Data Rendering**:
  - Rendering with complete service data
  - Rendering with minimal service data (only required fields)
  - Conditional rendering of description based on detailed prop
  - Proper application of dark mode styling

- **Icon Rendering**:
  - Proper rendering of ArrowUpRight icon

- **Interaction Behavior**:
  - Setting cursor text to "VIEW" on mouse enter
  - Clearing cursor text on mouse leave
  - Handling click events correctly

- **Animation**:
  - Verifying the presence of animation attributes
  - Group hover effects for coordinated animations

- **Accessibility**:
  - Keyboard navigability
  - Proper role attributes for interactive elements
  - Appropriate CSS classes indicating interactivity

The tests use the mockDataFactory to create test services with both complete and minimal configurations, ensuring the component handles all data scenarios gracefully.

```bash
# Run the ServiceCard component tests
npm test -- __tests__/components/services/ServiceCard.test.tsx
``` 
<CONTEMPLATOR>
- Okay, let's break down this request. The user wants a developer-ready specification based on the provided code snippets. This is essentially asking me to act like a business analyst or technical writer who's been given a small piece of a codebase and needs to extrapolate a full picture for developers.
- The user has provided two TypeScript files: `lib/data.ts` and `lib/types.ts`.  `lib/data.ts` seems to contain the actual data for the application, while `lib/types.ts` defines the data structures. This is good, it gives us a clear starting point.
- I need to analyze these files in detail. Let's start with `lib/types.ts`. It defines interfaces `Project`, `Service`, and `TeamMember` (though `TeamMember` code is omitted in the provided snippet, but the import suggests it exists).  These interfaces are crucial as they define the data models.
- Now let's look at `lib/data.ts`. It imports these types and then exports `projects` as an array of `Project` objects.  This file is essentially the data source for the application, at least for projects. It includes example project data with fields like `title`, `category`, `year`, `description`, `gallery`, `client`, `services`, `challenge`, `solution`, `results`, `testimonial`, and `url`.  This is quite comprehensive for a project description.
-  I see similar structures for `Service` in `lib/data.ts`. Services also have titles, descriptions, benefits, process steps, and case studies. This suggests the application is likely showcasing both projects and services offered by the company.
- The user wants a "developer-ready specification" including architecture, interfaces, data flow, component structure, and how-to guides.  Since I only have data and type definitions, I'll have to infer the architecture and component structure. It's likely a frontend application (possibly React or Next.js given the file paths and TypeScript) that fetches and displays this data.
- Data flow seems straightforward: data is defined in `lib/data.ts` and presumably consumed by components to render UI.
- For "how-to guides", I can focus on how to add or modify projects and services, as this is directly related to the provided data.
- I need to make sure the specification is detailed enough for a developer to start working. This means being explicit about data structures, potential component responsibilities, and the overall inferred architecture.
- I should also point out what I *don't* know.  For example, I don't see any code for UI components, routing, or data fetching logic.  The specification should highlight these gaps and areas where a developer would need to make decisions or write code.
- Let's structure the specification with sections like: Project Overview, Data Models, Inferred Architecture, Component Structure (conceptual), Data Flow, How-To Guides (Data Management), and Open Questions/Next Steps.
- I need to be careful to only infer from the provided code and not make up functionalities or details.  If something is not in the code, I should say it's inferred or unknown.
- Okay, planning complete. I'm ready to generate the specification, keeping in mind the user's request for detail and developer-readiness, while being honest about the limitations of the provided code snippets.

</CONTEMPLATOR>

<FINAL_ANSWER>
## Developer-Ready Specification: RAW/STUDIO Portfolio Website

This document provides a developer-ready specification for the RAW/STUDIO portfolio website, based on the provided code snippets from `lib/data.ts` and `lib/types.ts`. This specification outlines the project's purpose, data models, inferred architecture, component structure, data flow, and provides how-to guides for data management.

### 1. Project Overview

**Purpose:** The RAW/STUDIO portfolio website is designed to showcase the agency's projects and services. It aims to present a brutalist design aesthetic, reflecting the agency's style, while providing a user-friendly experience for potential clients.

**Key Features (Inferred):**

*   **Project Showcase:** Display a curated collection of RAW/STUDIO's projects, categorized and filterable. Each project includes detailed information, images, and potentially case studies.
*   **Service Descriptions:** Outline the services offered by RAW/STUDIO, detailing their benefits, processes, and showcasing relevant case studies.
*   **Team Member Profiles:** (Partially Inferred - based on `TeamMember` type import) Introduce the team members, highlighting their roles and expertise.
*   **Contact Information:** Provide a way for potential clients to contact RAW/STUDIO.
*   **Brutalist Design Aesthetic:**  The website's design emphasizes brutalist principles, likely using raw typography, grid-based layouts, and a stark color palette, as suggested by the project descriptions in the data.

### 2. Data Models

The data models are defined in `lib/types.ts` and populated in `lib/data.ts`.

#### 2.1. `Project` Interface (`9:23:lib/types.ts`)

```typescript
interface Project {
  id: number
  title: string
  category: string
  year: string
  image: string
  description: string
  gallery?: string[]
  client?: string
  services?: string[]
  challenge?: string
  solution?: string
  results?: string
  testimonial?: Testimonial
  url?: string
}
```

**Description:**  Represents a project showcased on the portfolio.

**Fields:**

*   `id`: Unique identifier for the project (number).
*   `title`: Title of the project (string).
*   `category`: Category of the project (e.g., "E-COMMERCE", "WEB APP", "BRANDING", "WEBSITE") (string).
*   `year`: Year the project was completed (string).
*   `image`: URL to the project's featured image (string).
*   `description`: Short description of the project (string).
*   `gallery`: Array of URLs to images showcasing the project (optional, string array).
*   `client`: Name of the client for the project (optional, string).
*   `services`: Array of services utilized in the project (optional, string array).
*   `challenge`: Description of the challenge the project addressed (optional, string).
*   `solution`: Description of the solution implemented (optional, string).
*   `results`:  Quantifiable results of the project (optional, string).
*   `testimonial`:  A `Testimonial` object (optional, see below).
*   `url`: URL to the live project or case study (optional, string).

#### 2.2. `Testimonial` Interface (Inferred from `lib/data.ts`)

```typescript
interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}
```

**Description:** Represents a testimonial for a project or service.

**Fields:**

*   `quote`: The testimonial quote (string).
*   `author`: Name of the testimonial author (string).
*   `role`: Role of the author (string).
*   `company`: Company of the author (string).

#### 2.3. `Service` Interface (`37:43:lib/types.ts`)

```typescript
interface Service {
  title: string
  description: string
  benefits?: string[]
  process?: ServiceProcess[]
  caseStudy?: ServiceCaseStudy
}
```

**Description:** Represents a service offered by RAW/STUDIO.

**Fields:**

*   `title`: Title of the service (e.g., "WEB DESIGN", "BRANDING", "UX STRATEGY") (string).
*   `description`: Detailed description of the service (string).
*   `benefits`: Array of benefits of using the service (optional, string array).
*   `process`: Array of `ServiceProcess` objects outlining the service process (optional, see below).
*   `caseStudy`: A `ServiceCaseStudy` object linking to a relevant project case study (optional, see below).

#### 2.4. `ServiceProcess` Interface (Inferred from `lib/data.ts`)

```typescript
interface ServiceProcess {
  title: string
  description: string
}
```

**Description:** Represents a step in the service delivery process.

**Fields:**

*   `title`: Title of the process step (string).
*   `description`: Description of the process step (string).

#### 2.5. `ServiceCaseStudy` Interface (Inferred from `lib/data.ts`)

```typescript
interface ServiceCaseStudy {
  title: string
  description: string
  image: string
  link: string
}
```

**Description:**  Represents a case study associated with a service, linking to a project.

**Fields:**

*   `title`: Title of the case study (likely the project title) (string).
*   `description`: Short description of the case study (string).
*   `image`: URL to the case study image (string).
*   `link`: Link to the full case study page (likely a project page, string).

#### 2.6. `TeamMember` Interface (Partially Inferred - Type Imported but Definition Not Provided)

```typescript
// Inferred structure based on common team member data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string; // URL to team member's image
  bio?: string; // Optional biography
  // ... other potential fields like social links, skills, etc.
}
```

**Description:** Represents a team member at RAW/STUDIO.  The full definition is not provided in the snippets, but it's imported in `lib/data.ts`, implying its existence.

**Fields (Inferred):**

*   `id`: Unique identifier (number).
*   `name`: Team member's name (string).
*   `role`: Team member's role (string).
*   `image`: URL to their profile image (string).
*   `bio`: Short biography (optional, string).
*   ... (Potentially other fields like social media links, skills, etc.)

### 3. Data Sources

*   **`lib/data.ts`:**  This file serves as the primary data source. It exports arrays of `Project` and `Service` objects (`projects` and `services` constants).  It likely also exports `team` as an array of `TeamMember` objects (though not shown in the snippet). This suggests a static data approach, where content is directly coded into the application.

### 4. Inferred Architecture

Based on the file structure and data, the architecture is likely a **Frontend-Centric Application**, possibly built with:

*   **Frontend Framework:**  React or Next.js are strong possibilities given the TypeScript and file paths.
*   **Component-Based Structure:** The application is likely built using reusable UI components to display projects, services, team members, etc.
*   **Static Data Fetching:** Data is directly imported from `lib/data.ts`, suggesting a static site generation (SSG) or client-side rendering (CSR) approach where data is bundled with the application or fetched on initial load.
*   **Routing:**  A routing mechanism (like React Router or Next.js routing) is expected to handle navigation between different sections (homepage, projects, services, team, contact, individual project/service pages).

**Simplified Architecture Diagram:**

```
Data (lib/data.ts) --> Components (React/Next.js) --> UI (Browser)
```

### 5. Conceptual Component Structure (Frontend - Inferred)

Based on the data models and project purpose, here's a conceptual component structure:

*   **`Layout` Component:**  Provides the overall website layout (header, footer, global styles).
*   **`Navigation` Component:**  Handles website navigation (links to different sections).
*   **`Homepage` Component:**  Displays the main landing page, potentially featuring a project highlights section, service overview, and team introduction.
*   **`ProjectsPage` Component:**  Displays a list of all projects, potentially with filtering and category navigation.
    *   **`ProjectCard` Component:**  Reusable component to display a summary of a project in a list.
    *   **`ProjectDetailPage` Component:** Displays the full details of a single project, including gallery, description, testimonials, etc.
*   **`ServicesPage` Component:** Displays a list of all services.
    *   **`ServiceCard` Component:** Reusable component to display a summary of a service.
    *   **`ServiceDetailPage` Component:** Displays the full details of a single service, including benefits, process, and case studies.
*   **`TeamPage` Component:** Displays a list of team members.
    *   **`TeamMemberCard` Component:** Reusable component to display a team member's profile.
*   **`Testimonial` Component:** Reusable component to display a testimonial.
*   **`CaseStudy` Component:** Reusable component to display a service case study summary.
*   **`ContactForm` Component:**  Component for the contact form (if included).
*   **Generic UI Components:** Buttons, Typography, Image components, Grid/Layout components, etc.

**Note:** This is a conceptual structure. The actual component names and organization might differ in the implemented codebase.

### 5.1. Component Directory Structure

The components are organized into a logical, maintainable structure to help developers easily locate and work with code. The organization follows a categorical approach with barrel exports to simplify imports.

#### 5.1.1. Top-Level Structure

```
/components
├── core/              # Core business components
├── effects/           # Visual effects components
├── layout/            # Layout structural components
├── sections/          # Page section components
├── typography/        # Typography-related components
├── ui/                # UI components (organized by category)
└── index.ts           # Main barrel file
```

#### 5.1.2. UI Component Organization

UI components are further categorized by functionality:

```
/components/ui
├── data-display/      # Data presentation components (Avatar, Card, Table)
├── feedback/          # User feedback components (Alert, Progress, Toast)
├── hooks/             # UI-related hooks (useMobile, useToast)
├── inputs/            # Form inputs and controls (Button, Input, Toggle, etc.)
├── layout/            # UI layout components (Accordion, Carousel, Tabs, etc.)
├── navigation/        # Navigation components (Breadcrumb, Pagination, etc.)
├── overlay/           # Overlay components (Dialog, Sheet, Popover, etc.)
├── utils/             # Utility components (Calendar, Separator, etc.)
├── badge.tsx          # Individual components at root level
└── index.ts           # UI barrel file
```

#### 5.1.3. Component Imports

Components use barrel files for cleaner imports. For example:

```typescript
// Instead of:
import { Button } from "@/components/ui/button" 

// Use:
import { Button } from "@/components/ui"

// Or for layout components:
import { Header, Footer } from "@/components/layout"
```

This structure provides several benefits:
- Logical grouping by component purpose
- Easier discoverability for new developers
- Simplified imports using barrel exports
- Better maintainability with clear component boundaries
- Organized separation of concerns

### 6. Data Flow (Inferred)

1.  **Data Loading:** When a page is loaded (e.g., Homepage, ProjectsPage, ServicesPage), the relevant data (projects, services, team members) is imported from `lib/data.ts`.
2.  **Component Rendering:** Components use this imported data to render the UI. For example:
    *   `ProjectsPage` component maps over the `projects` array and renders `ProjectCard` components for each project.
    *   `ProjectCard` components receive a `Project` object as props and display project information (title, image, category).
    *   `ProjectDetailPage` component likely receives a specific `Project` object (perhaps via routing parameters) and displays all details of that project.
3.  **User Interaction:** User interactions (navigation, filtering, etc.) trigger re-renders or navigation to different routes, loading and displaying different sets of data.

### 7. How-To Guides: Data Management

Since the data is currently static in `lib/data.ts`, managing content involves directly modifying this file.

#### 7.1. Adding a New Project

1.  **Open `lib/data.ts`.**
2.  **Locate the `projects` array.** (`3:34:lib/data.ts`)
3.  **Create a new `Project` object** following the `Project` interface (`9:23:lib/types.ts`). Ensure you provide all required fields (`id`, `title`, `category`, `year`, `image`, `description`).  Assign a unique `id`.
4.  **Push the new `Project` object** to the `projects` array.
5.  **Save `lib/data.ts`.**
6.  **Run the development server** to see the changes reflected in the application.

**Example:**

```typescript:lib/data.ts
// ... existing code ...
export const projects: Project[] = [
    // ... existing projects ...
    {
      id: 6, // Ensure unique ID
      title: "NEW PROJECT TITLE",
      category: "WEBSITE",
      year: "2024",
      image: "/path/to/new-project-image.svg",
      description: "Description of the new project...",
      // ... other project fields ...
    },
  ];
// ... existing code ...
```

#### 7.2. Adding a New Service

1.  **Open `lib/data.ts`.**
2.  **Locate the `services` array.** (Not explicitly shown in snippets, but expected to be in `lib/data.ts` similar to `projects`)
3.  **Create a new `Service` object** following the `Service` interface (`37:43:lib/types.ts`). Provide `title` and `description` at minimum.
4.  **Push the new `Service` object** to the `services` array.
5.  **Save `lib/data.ts`.**
6.  **Run the development server** to see the changes.

#### 7.3. Updating Existing Data

1.  **Open `lib/data.ts`.**
2.  **Locate the `projects` or `services` array.**
3.  **Find the specific `Project` or `Service` object** you want to update (likely by `id` or `title`).
4.  **Modify the fields** of the object as needed.
5.  **Save `lib/data.ts`.**
6.  **Run the development server** to see the changes.

**Note:** For a production website, a more robust content management system (CMS) or database would be recommended to manage data instead of directly editing code files.

#### 7.4. Adding New Components

When adding new components to the codebase, follow the established directory structure to maintain consistency and organization.

##### 7.4.1. Identifying Component Category

First, determine which category your component belongs to:

- **Core Components**: Business-domain components specific to the portfolio (e.g., `ProjectFilter`, `ServiceProcess`)
- **Layout Components**: Structural elements (e.g., `Header`, `SidePanel`) 
- **Section Components**: Full page sections (e.g., `HeroSection`, `PortfolioSection`)
- **Effect Components**: Visual effects (e.g., `ParallaxScroll`, `AnimatedBackground`)
- **Typography Components**: Text-related components (e.g., `Heading`, `HighlightedText`)
- **UI Components**: Reusable interface elements (categorized further, see below)

For UI components, determine the appropriate subcategory:
- **data-display**: For presenting data (tables, cards, avatars)
- **inputs**: User input controls (buttons, forms, checkboxes)
- **feedback**: User feedback indicators (alerts, toasts, progress bars)
- **navigation**: Navigation elements (menus, breadcrumbs, pagination)
- **overlay**: Overlay UI elements (modals, dialogs, popovers)
- **layout**: Layout UI components (accordions, tabs, carousels)
- **utils**: Utility components (separators, skeletons, calendars)
- **hooks**: UI-related custom hooks

##### 7.4.2. Creating the Component

1. **Create a new file** in the appropriate directory with a descriptive name:
   ```
   touch components/ui/inputs/social-button.tsx
   ```

2. **Implement your component** with proper TypeScript typing.

3. **Update the barrel file** in the component's directory to export your new component:
   ```typescript
   // components/ui/inputs/index.ts
   // ... existing exports
   export { SocialButton } from './social-button'
   ```

##### 7.4.3. Using the Component

Import the component using the barrel files for cleaner imports:

```typescript
// Good: Using barrel imports
import { SocialButton } from '@/components/ui'

// Acceptable alternative for specific imports:
import { SocialButton } from '@/components/ui/inputs'

// Avoid: Direct file imports
// import SocialButton from '@/components/ui/inputs/social-button'
```

##### 7.4.4. Component Standards

When creating new components, adhere to these standards:

1. **Use TypeScript interfaces** for component props
2. **Implement proper accessibility** (ARIA attributes, keyboard navigation)
3. **Include defaultProps** for optional parameters
4. **Add JSDoc comments** for complex components
5. **Follow the established styling patterns** (Tailwind CSS, CSS modules, etc.)
6. **Support the custom cursor** functionality where appropriate
7. **Use the brutalist design aesthetic** consistent with the portfolio theme

</FINAL_ANSWER>


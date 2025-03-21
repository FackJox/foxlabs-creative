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
## Developer-Ready Specification: FoxLabs//Creative Portfolio Website

This document provides a developer-ready specification for the FoxLabs//Creative portfolio website, based on the provided code snippets from `lib/data.ts` and `lib/types.ts`. This specification outlines the project's purpose, data models, inferred architecture, component structure, data flow, and provides how-to guides for data management.

### 1. Project Overview

**Purpose:** The FoxLabs//Creative portfolio website is designed to showcase the agency's projects and services. It aims to present a brutalist design aesthetic, reflecting the agency's style, while providing a user-friendly experience for potential clients.

**Key Features (Inferred):**

*   **Project Showcase:** Display a curated collection of FoxLabs//Creative's projects, categorized and filterable. Each project includes detailed information, images, and potentially case studies.
*   **Service Descriptions:** Outline the services offered by FoxLabs//Creative, detailing their benefits, processes, and showcasing relevant case studies.
*   **Team Member Profiles:** (Partially Inferred - based on `TeamMember` type import) Introduce the team members, highlighting their roles and expertise.
*   **Contact Information:** Provide a way for potential clients to contact FoxLabs//Creative.
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

**Description:** Represents a service offered by FoxLabs//Creative.

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

**Description:** Represents a team member at FoxLabs//Creative.  The full definition is not provided in the snippets, but it's imported in `lib/data.ts`, implying its existence.

**Fields (Inferred):**

*   `id`: Unique identifier (number).
*   `name`: Team member's name (string).
*   `role`: Team member's role (string).
*   `image`: URL to their profile image (string).
*   `bio`: Short biography (optional, string).
*   ... (Potentially other fields like social media links, skills, etc.)

### 3. Data Sources

*   **`lib/data.ts`:**  This file serves as the primary data source. It exports arrays of `Project` and `Service` objects (`projects` and `services` constants).  It likely also exports `team` as an array of `TeamMember` objects (though not shown in the snippet). This suggests a static data approach, where content is directly coded into the application.

### 4. API Client

The API client provides functions for fetching data from the backend server. These functions handle network requests and error cases, providing a clean interface for components to use.

#### 4.1. API Client Structure

The API client is defined in `lib/api/client.ts` and exports several functions for retrieving data:

```typescript
// Helper function for handling API responses
const handleResponse = async <T>(response: Response, errorMessage: string): Promise<T> => {
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  
  return response.json() as Promise<T>;
};

// Exported API functions
export const fetchProjects = async (): Promise<Project[]> => { /* ... */ };
export const fetchProjectById = async (id: number | string): Promise<Project> => { /* ... */ };
export const fetchProjectsByCategory = async (category: string): Promise<Project[]> => { /* ... */ };
export const fetchServices = async (): Promise<Service[]> => { /* ... */ };
export const fetchServiceByTitle = async (title: string): Promise<Service> => { /* ... */ };
export const fetchTeamMembers = async (): Promise<TeamMember[]> => { /* ... */ };
```

#### 4.2. API Endpoints

The API client interacts with the following endpoints:

| Function | Endpoint | Description |
|----------|----------|-------------|
| `fetchProjects` | `/api/projects` | Get all projects |
| `fetchProjectById` | `/api/projects/{id}` | Get a project by its ID |
| `fetchProjectsByCategory` | `/api/projects/category/{category}` | Get projects filtered by category |
| `fetchServices` | `/api/services` | Get all services |
| `fetchServiceByTitle` | `/api/services/{title}` | Get a service by its title |
| `fetchTeamMembers` | `/api/team` | Get all team members |

#### 4.3. Error Handling

Each API function includes comprehensive error handling:

1. **Network Errors**: Catches and rethrows errors from the `fetch` call
2. **Response Validation**: Checks if the response is OK and throws specific errors if not
3. **Type Safety**: Uses TypeScript generics to ensure type safety of returned data

**Example error handling pattern:**

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

#### 4.4. Usage Example

To use the API client in a component:

```typescript
import { fetchProjects } from '@/lib/api/client';
import { useState, useEffect } from 'react';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

### 5. Inferred Architecture

Based on the file structure and data, the architecture is likely a **Frontend-Centric Application**, possibly built with:

*   **Frontend Framework:**  React or Next.js are strong possibilities given the TypeScript and file paths.
*   **Component-Based Structure:** The application is likely built using reusable UI components to display projects, services, team members, etc.
*   **Data Fetching:** Data is fetched from API endpoints using the client functions in `lib/api/client.ts`.
*   **Routing:**  A routing mechanism (like React Router or Next.js routing) is expected to handle navigation between different sections (homepage, projects, services, team, contact, individual project/service pages).

**Simplified Architecture Diagram:**

```
API Endpoints <--> API Client (lib/api/client.ts) <--> Components (React/Next.js) <--> UI (Browser)
```

### 6. Conceptual Component Structure (Frontend - Inferred)

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

### 6.1. Component Directory Structure

The components are organized into a logical, maintainable structure to help developers easily locate and work with code. The organization follows a categorical approach with barrel exports to simplify imports.

#### 6.1.1. Top-Level Structure

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

#### 6.1.2. UI Component Organization

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

#### 6.1.3. Component Imports

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

### 7. Data Flow

1.  **API Requests:** When data is needed, the component calls the appropriate function from the API client (`lib/api/client.ts`).
2.  **Data Fetching:** The API client sends a request to the appropriate endpoint and handles any errors or response parsing.
3.  **Component State:** The component stores the returned data in state, along with loading and error states.
4.  **Rendering:** Components render UI based on the data received from the API client.
5.  **User Interaction:** User interactions (navigation, filtering, etc.) trigger new API requests or navigation to different routes, loading and displaying different sets of data.

### 8. How-To Guides: Data Management

#### 8.1. Fetching Data in Components

To fetch and display data in a component:

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

#### 8.2. Filtering Projects by Category

To filter projects by category using the API client:

```typescript
import { fetchProjectsByCategory } from '@/lib/api/client';

// In a component or event handler
const loadProjectsByCategory = async (category) => {
  try {
    setIsLoading(true);
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
```

#### 8.3. Loading a Specific Project

To load and display a specific project by ID:

```typescript
import { fetchProjectById } from '@/lib/api/client';
import { useParams } from 'react-router-dom'; // or next/router for Next.js

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

#### 8.4. Adding a New Data Endpoint

If you need to add a new API endpoint function:

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

3. Use the new function in your components as needed.

### 9. Component Standards

When creating new components, adhere to these standards:

1. **Use TypeScript interfaces** for component props
2. **Implement proper accessibility** (ARIA attributes, keyboard navigation)
3. **Include defaultProps** for optional parameters
4. **Add JSDoc comments** for complex components
5. **Follow the established styling patterns** (Tailwind CSS, CSS modules, etc.)
6. **Support the custom cursor** functionality where appropriate
7. **Use the brutalist design aesthetic** consistent with the portfolio theme
8. **Implement proper loading and error states** when fetching data

</FINAL_ANSWER>


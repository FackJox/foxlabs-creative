
vibes

# Detailed Blueprint for Payload CMS Integration with Next.js

## High-Level Integration Steps

1. Initial Payload CMS setup with MongoDB
2. Media management with Cloudinary
3. Global settings collection implementation
4. Pages collection with block-based content
5. Content block types implementation
6. Projects collection and components
7. Services collection and components
8. Team collection and components
9. Frontend integration with ISR
10. Deployment configuration for Vercel

## Iterative Implementation Plan

Breaking this down into smaller, carefully sized implementation steps:

### Phase 1: Foundation Setup

1. **Basic Payload Installation**
   - Install dependencies
   - Create minimal config file
   - Set up environment variables
   - Test admin panel access

2. **MongoDB Atlas Connection**
   - Create MongoDB Atlas account
   - Configure database connection
   - Implement connection pooling for serverless
   - Test database connectivity

3. **Cloudinary Integration**
   - Install Cloudinary plugin
   - Configure environment variables
   - Test basic media upload functionality

### Phase 2: Core Collections

4. **Media Collection**
   - Create Media collection schema
   - Implement Cloudinary storage
   - Create utility functions for media access
   - Test media upload and retrieval

5. **Global Settings Collection**
   - Create Global collection schema
   - Add contact info, social links, footer fields
   - Create utility to access global settings
   - Test global settings in components

6. **Pages Collection Base**
   - Create Pages collection with title and slug
   - Add SEO metadata fields
   - Set up basic blocks field (empty for now)
   - Create page fetching utilities

### Phase 3: Block System Development

7. **Block Type Framework**
   - Create TypeScript interfaces for blocks
   - Set up block discriminator field
   - Create basic block renderer component
   - Test with simple block types

8. **Hero & Content Blocks**
   - Implement Hero block schema
   - Implement Custom Content block schema
   - Extend block renderer for these types
   - Test rendering with sample data

9. **Project Collection & Block**
   - Create Projects collection schema
   - Create Project Showcase block schema
   - Create migration script for existing projects
   - Test project data display

### Phase 4: Component Integration

10. **Project Components Integration**
    - Update Project Card to use CMS data
    - Update Project Grid with dynamic data
    - Implement ISR for project pages
    - Test with custom cursor integration

11. **Services Collection & Components**
    - Create Services collection schema
    - Create Service Section block schema
    - Update service components with CMS data
    - Test service data rendering

12. **Team & Contact Components**
    - Create Team collection schema
    - Create Team Section block schema
    - Create Contact Section block schema
    - Test all components with real data

### Phase 5: Final Integration & Deployment

13. **Frontend Integration Refinement**
    - Complete block renderer for all block types
    - Implement error handling and loading states
    - Ensure custom cursor works with all elements
    - Test comprehensive page building

14. **Deployment Configuration**
    - Configure Vercel production environment
    - Set up production MongoDB database
    - Implement environment variable management
    - Test full deployment flow

## Code Generation Prompts

Below are the prompts for a code-generation LLM to implement each step in a test-driven manner:

### Prompt 1: Basic Payload Installation

```
Please install and configure Payload CMS in my existing Next.js application with App Router. 

My app is a portfolio site for a design agency with a brutalist aesthetic. Current technology stack includes:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Vercel deployment

Please:
1. Install required packages
2. A basic Payload configuration file (payload.config.ts)
3. Add essential environment variables for .env.local
4. Add updates needed to next.config.mjs
5. Implement required changes to make Payload work with Next.js App Router

The admin panel should be accessible at /admin. Focus on creating a minimal working setup that we can build upon in later steps.
```

### Prompt 2: MongoDB Atlas Connection

```
Now that we have the basic Payload CMS setup, I need to configure MongoDB Atlas for database storage. My app will be deployed on Vercel's serverless environment, which requires special connection handling.

Please provide:
1. Step-by-step guide to create a MongoDB Atlas account and cluster (free tier)
2. Connection string format and security best practices
3. Updated payload.config.ts with MongoDB configuration
4. Connection pooling implementation for serverless environments
5. Test code to verify the database connection works

Remember that this will run in a serverless environment, so proper connection handling is critical. Include appropriate error handling for database connections.
```

### Prompt 3: Cloudinary Integration

```
For media storage, I want to integrate Cloudinary with Payload CMS, as Vercel's serverless functions can't store uploaded files locally.

Please provide:
1. Installation instructions for Payload's Cloudinary plugin
2. Necessary environment variables for Cloudinary
3. Configuration code to integrate Cloudinary with Payload
4. Updated payload.config.ts with Cloudinary settings
5. Test code to verify media uploads work correctly

Ensure the implementation follows best practices for security and performance with Cloudinary in a serverless environment.
```

### Prompt 4: Media Collection

```
With Cloudinary integration in place, I need a proper Media collection in Payload CMS to manage images and assets.

Please provide:
1. Complete Media collection schema with fields for:
   - Alt text (required for accessibility)
   - Caption (optional)
   - Cloudinary URL
   - Width and height
   - MIME type
   - File size
2. TypeScript interface for Media type
3. Utility function to fetch media items
4. Test code to verify media operations work correctly

Ensure the schema enforces accessible media by requiring alt text and supports the brutalist design aesthetic of my portfolio site.
```

### Prompt 5: Global Settings Collection

```
I need a Global Settings collection to manage site-wide content like contact information, social media links, and footer content.

Please provide:
1. Global collection schema with fields for:
   - Site name
   - Contact email and phone
   - Social media links (Instagram, Twitter, LinkedIn, Behance, Github)
   - Footer copyright text
   - Privacy policy and terms of service text
2. TypeScript interface for GlobalSettings type
3. Utility function to fetch global settings in components
4. Test code to verify global settings retrieval

Since global settings are used across the site, make sure the implementation is efficient and works well with ISR.
```

### Prompt 6: Pages Collection Base

```
Now I need a Pages collection to start building the foundation for the page builder approach.

Please provide:
1. Pages collection schema with fields for:
   - Title
   - Slug (for URL paths)
   - SEO metadata (title, description, OG image)
   - Empty content blocks array (we'll add block types later)
2. TypeScript interface for Page type
3. Utility function to fetch a page by slug
4. Test code to verify page retrieval works

Make sure the slug field is unique and properly formatted for URLs, and that the schema is set up to accommodate the blocks we'll add in future steps.
```

### Prompt 7: Block Type Framework

```
I need to create the foundation for a block-based page builder system. This involves setting up TypeScript interfaces and a basic block renderer component.

Please provide:
1. Base Block interface with discriminator field
2. Block renderer component skeleton that can handle different block types
3. Configuration for Payload CMS blocks field
4. Test code for the block renderer with mock data

The block renderer should be flexible enough to accommodate all the block types we'll build later (Hero, Project Showcase, Service Section, Team Member, Contact Section, Custom Content).
```

### Prompt 8: Hero & Content Blocks

```
Now that we have the block framework, let's implement the first two block types: Hero and Custom Content.

Please provide:
1. Hero block schema with fields for:
   - Title and subtitle
   - Description (rich text)
   - Left and right metadata labels
   - Alignment options
   - Optional background image
2. Custom Content block schema with fields for:
   - Multiple content columns with width options
   - Rich text content
   - Optional media per column
   - Background color and spacing options
3. TypeScript interfaces for both block types
4. Updated block renderer component to handle these block types
5. Test code for rendering both block types

Ensure the block schemas align with the existing brutalist design system and support the existing custom cursor behavior.
```

### Prompt 9: Project Collection & Block

```
Let's implement the Projects collection and Project Showcase block for displaying portfolio work.

Please provide:
1. Projects collection schema matching the existing data structure in lib/data.ts, with fields for:
   - Title and slug
   - Client name
   - Category (WEBSITE, BRANDING, E-COMMERCE, etc.)
   - Description (rich text)
   - Services provided (array)
   - Featured image and gallery
   - External URL and published date
2. Project Showcase block schema with fields for:
   - Heading and subheading
   - Description
   - Layout options (grid, list, featured)
   - Project selection (references to Projects collection)
   - Display options (filters, limit)
3. TypeScript interfaces for both
4. Migration script to move existing projects from lib/data.ts to the CMS
5. Test code for Project components

Make sure the implementation preserves the existing project filtering capability by category.
```

### Prompt 10: Project Components Integration

```
Now I need to update the existing Project components to use data from the CMS instead of the static data in lib/data.ts.

Please provide:
1. Updated Project Card component to use CMS data
2. Updated Project Grid component with dynamic data fetching
3. Implementation of the Project Showcase block in the block renderer
4. ISR configuration for project pages with appropriate revalidation period
5. Custom cursor integration for project links
6. Test code for the updated components

Ensure the components maintain the existing brutalist design aesthetic and animations while using dynamic CMS data.
```

### Prompt 11: Services Collection & Components

```
Let's implement the Services collection and Service Section block to make service offerings editable.

Please provide:
1. Services collection schema matching the existing structure in lib/data.ts, with fields for:
   - Title and slug
   - Description (rich text)
   - Benefits (array of strings)
   - Process steps (array of objects with title and description)
   - Case study information
2. Service Section block schema with fields for:
   - Heading and subheading
   - Description
   - Services selection (references to Services collection)
   - Layout options and display settings
3. TypeScript interfaces for both
4. Updated Service components to use CMS data
5. Implementation of the Service Section block in the block renderer
6. Test code for service components

Ensure the implementation preserves the existing detailed service information display, including benefits and process steps.
```

### Prompt 12: Team & Contact Components

```
Let's implement the Team collection and both Team Section and Contact Section blocks.

Please provide:
1. Team collection schema with fields for:
   - Name and position
   - Bio (rich text)
   - Profile image
   - Social media links
2. Team Section block schema with fields for:
   - Heading and subheading
   - Description
   - Team members selection
   - Layout options
3. Contact Section block schema with fields for:
   - Heading and subheading
   - Description
   - Display options (form, contact info, social links)
   - Button label
4. TypeScript interfaces for all of these
5. Updated Team and Contact components to use CMS data
6. Implementation of both block types in the block renderer
7. Test code for all components

Ensure proper custom cursor integration for all interactive elements in these components.
```

### Prompt 13: Frontend Integration Refinement

```
Now I need to refine the frontend integration to ensure all blocks work together seamlessly and handle error states appropriately.

Please provide:
1. Completed block renderer that handles all block types
2. Loading state implementations for async data fetching
3. Error handling for missing or invalid content
4. Custom cursor integration for all interactive elements
5. ISR implementation for all dynamic pages
6. Comprehensive test suite for the entire page builder system

Focus on ensuring a smooth user experience, maintaining the brutalist design aesthetic, and proper error handling throughout the application.
```

### Prompt 14: Deployment Configuration

```
Finally, I need to prepare the application for deployment on Vercel with proper environment configuration.

Please provide:
1. Complete list of required environment variables for production
2. Vercel configuration instructions for serverless deployment
3. MongoDB Atlas production setup recommendations
4. Cloudinary production configuration
5. Post-deployment verification steps
6. Fallback mechanisms if CMS content fails to load

Ensure the deployment strategy accounts for the serverless nature of Vercel and provides appropriate error handling and fallbacks for production use.
```

These prompts follow a logical progression, starting with the foundation and gradually building up the full CMS implementation. Each step builds directly on the previous ones, ensuring no orphaned or disconnected code.

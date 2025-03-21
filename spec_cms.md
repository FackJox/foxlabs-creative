Specification: Payload CMS Integration for FoxLabs//Creative Portfolio Website
1. Project Overview
Integrate Payload CMS into the existing FoxLabs//Creative Next.js application to allow content management through an admin interface. The site will maintain its brutalist design aesthetic while making text content, media, and page structure editable without code changes.
2. Technical Requirements
Framework: Next.js with App Router (existing codebase)
CMS: Payload CMS (embedded within Next.js app)
Database: MongoDB Atlas (free tier)
Media Storage: Cloudinary
Deployment: Vercel (serverless)
Rendering Strategy: Incremental Static Regeneration (ISR)
Authentication: Simple admin-only access
3. CMS Architecture
3.1 Integration Approach
Embed Payload CMS directly within the Next.js application
Configure Payload to run alongside the Next.js application in development
Create an admin route (/admin) for accessing the CMS
Implement ISR for pages to balance performance and content freshness
3.2 Core Collections
Pages - For managing individual pages
Projects - For portfolio work examples
Services - For service offerings
Team - For team member profiles
Media - For uploaded images and assets
Global - For site-wide settings
4. Data Models
4.1 Pages Collection
Apply to .cursorrules
4.2 Projects Collection
Apply to .cursorrules
4.3 Services Collection
Apply to .cursorrules
4.4 Team Collection
Apply to .cursorrules
4.5 Global Collection
Apply to .cursorrules
5. Page Builder Components
5.1 Hero Block
Apply to .cursorrules
5.2 Project Showcase Block
Apply to .cursorrules
5.3 Service Section Block
Apply to .cursorrules
5.4 Team Member Block
Apply to .cursorrules
5.5 Contact Section Block
Apply to .cursorrules
5.6 Custom Content Block
Apply to .cursorrules
6. Media Management
6.1 Cloudinary Integration
Implement Payload plugin for Cloudinary
Configure media uploads to store in Cloudinary
Support image transformations (resize, crop, optimize)
Maintain image metadata for accessibility
6.2 Media Collection
Apply to .cursorrules
7. Authentication
7.1 Admin User
Single admin user for content management
Secure password storage
Environment variable configuration for initial admin credentials
7.2 Security Measures
Rate limiting on login attempts
CSRF protection
Appropriate HTTP security headers
Secure cookie handling
8. Integration with Existing Codebase
8.1 React Components
Adapt existing components to consume data from Payload CMS
Create block renderer component to map CMS blocks to React components
Implement data fetching using ISR patterns
8.2 Next.js Routes
Maintain existing route structure
Generate dynamic paths based on page slugs
Implement ISR for all dynamic pages with appropriate revalidation periods
8.3 Custom Cursor Integration
Ensure CMS-driven content supports custom cursor functionality
Preserve setCursorText behavior for interactive elements
8.4 R3F Coexistence
Define clear boundaries between CMS-managed content and R3F components
Ensure R3F components can be included in pages alongside CMS content
Maintain client-side only rendering for R3F components
9. Deployment Considerations
9.1 Vercel Configuration
Environment variables for MongoDB connection
Environment variables for Cloudinary API credentials
Environment variables for admin credentials
Appropriate build and start commands
9.2 MongoDB Atlas Setup
Connection string with authentication
Database indexes for performance
Connection pooling configuration for serverless environment
9.3 Performance Optimization
Implement ISR with appropriate revalidation periods
Configure image optimization using Next.js Image component
Implement appropriate caching strategies
10. Development Requirements
10.1 Required Packages
payload
mongodb
next-payload
cloudinary
@payloadcms/plugin-cloud-storage
10.2 Environment Variables
Apply to .cursorrules
11. Additional Considerations
11.1 Rich Text Editor
Configure with appropriate formatting options
Allow for inline media insertion
Support for code blocks for developer documentation
Maintain brutalist design aesthetic in formatting options
11.2 Migrations
Strategy for migrating existing content from lib/data.ts to CMS
Version control for content structure changes
Backup and restore procedures
11.3 Accessibility
Ensure CMS-driven content maintains accessibility standards
Required alt text for all media
Semantic structure enforcement
ARIA attribute preservation
This specification provides a comprehensive foundation for implementing Payload CMS in your existing Next.js application while maintaining your brutalist design aesthetic and accommodating your R3F content.
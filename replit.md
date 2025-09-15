# Overview

This is a full-stack task management application built with a modern web stack. The application provides a clean interface for creating, updating, and organizing personal tasks with real-time feedback and filtering capabilities. It features a React frontend with TypeScript and a Node.js/Express backend, designed as a complete CRUD application for task management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints following standard HTTP conventions (GET, POST, PATCH, DELETE)
- **Validation**: Zod schemas for request/response validation and type inference
- **Development**: TSX for TypeScript execution with hot reloading

## Data Layer
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle for type-safe database operations and schema management
- **Connection**: Neon Database serverless PostgreSQL for cloud hosting
- **Migrations**: Drizzle Kit for database schema migrations and version control
- **Schema**: Single tasks table with text content, completion status, and timestamps

## Development Setup
- **Monorepo Structure**: Organized with shared schema between client and server
- **Path Aliases**: TypeScript path mapping for clean imports (@/, @shared/)
- **Build Process**: Separate client (Vite) and server (esbuild) build pipelines
- **Hot Reloading**: Development server with automatic restart on file changes

## API Design
- **Endpoints**: CRUD operations for tasks (/api/tasks)
- **Request Handling**: JSON body parsing with proper error handling
- **Response Format**: Consistent JSON responses with appropriate HTTP status codes
- **Error Management**: Centralized error handling middleware with proper status codes

## UI/UX Patterns
- **Component Architecture**: Modular React components with clear separation of concerns
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **Toast Notifications**: User feedback for actions (create, update, delete)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI components provide built-in accessibility features

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect

## UI Libraries
- **Radix UI**: Headless component primitives for accessibility and behavior
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework for styling

## Development Tools
- **TanStack Query**: Server state management and caching library
- **React Hook Form**: Form library with validation support
- **Zod**: Schema validation and type inference library
- **Wouter**: Minimalist routing library for React

## Build and Development
- **Vite**: Frontend build tool with React plugin and development server
- **esbuild**: Fast JavaScript bundler for server-side code
- **TypeScript**: Static type checking and modern JavaScript features
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

## Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions (configured but not actively used in current implementation)
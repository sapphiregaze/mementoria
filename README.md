# Mementoria

## Tech Stack

### Overall Repository

- Language: TypeScript
- Runtime: Node.js
- Package manager: Pnpm
- Build system: Turborepo
- Toolchain (formatting, linting, etc): Biome
- Pre-commit Hook: Husky
- Testing Framework: Vitest
- (Optional) Additional package management tool: Nix

### Frontend

- Component library: React
- Build tool: Vite
- Router: Tanstack Router
- CSS framework: Tailwind CSS
- UI library: Shadcn UI

### Backend

- Web framework: Fastify
- ORM: Prisma
- Database: PostgreSQL
- Auth framework: Better Auth

## Design

### Frontend

- /: Landing page
- /auth: Page used for authentication (signup & login)
- /app: Scrapebook collection view after login
- /scrapebooks/{id}: Details for each scrapebook
- /scrapebooks/{scrapebook-id}/pages/{page-id}: View of each individual pages
- /settings: User settings

### Backend

- /health: Health check for backend, database, and providers
-

### Database

Schema:

-

### Storage Providers (S3)

Used for object storage (images, audio, other files, etc), create with dependency injection patterns for ease of migration.

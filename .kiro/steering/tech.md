# Technology Stack & Build System

## Core Technologies
- **Framework**: Next.js 15.2.2 with App Router
- **Language**: TypeScript 5+ (strict mode enabled)
- **Runtime**: React 19.0.0
- **Styling**: Tailwind CSS 4.0.14 with CSS Variables
- **UI Components**: Shadcn UI (New York style)
- **Icons**: Lucide React
- **Animations**: Framer Motion 12.6.3

## Key Libraries
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React hooks (useState, useEffect)
- **UI Primitives**: Radix UI components
- **Charts**: Recharts 2.15.1
- **Utilities**: clsx + tailwind-merge (cn function)
- **Theming**: next-themes for dark/light mode

## Development Setup
- **Package Manager**: pnpm (preferred based on lock file)
- **Port**: Development server runs on port 3003
- **Node Version**: Node 20+ recommended
- **TypeScript**: Strict configuration with path aliases (@/*)

## Common Commands
```bash
# Development
pnpm dev          # Start dev server on port 3003
pnpm build        # Build for production
pnpm start        # Start production server on port 3003
pnpm lint         # Run ESLint

# Package management
pnpm install      # Install dependencies
pnpm add <pkg>    # Add new dependency
```

## Configuration Files
- `next.config.ts` - Next.js configuration (TypeScript)
- `tailwind.config.js` - Tailwind with custom animations and colors
- `tsconfig.json` - TypeScript with strict mode and path aliases
- `components.json` - Shadcn UI configuration
- `eslint.config.mjs` - ESLint configuration

## Code Style Conventions
- Use TypeScript for all new files
- Prefer named exports over default exports for components
- Use the `cn()` utility for conditional classes
- Follow Shadcn UI patterns for component structure
- Use "use client" directive for client-side components
- Implement proper TypeScript interfaces for props
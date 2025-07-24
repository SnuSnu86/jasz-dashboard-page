# Project Structure & Organization

## Root Directory Layout
```
/
├── .ai/                    # AI project documentation (PRD, Architecture, Stories)
├── .kiro/                  # Kiro IDE configuration and steering rules
├── app/                    # Next.js App Router (pages and layouts)
├── components/             # Reusable React components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── public/                 # Static assets (images, icons)
├── docs/                   # Project documentation
├── Instructions/           # Development instructions and workflows
└── xnotes/                 # Development notes and workflow templates
```

## App Directory (Next.js App Router)
- `app/layout.tsx` - Root layout with theme provider
- `app/page.tsx` - Main dashboard page
- `app/dashboard/` - Dashboard-specific pages and layouts
- `app/globals.css` - Global styles and CSS variables

## Components Organization
```
components/
├── ui/                     # Shadcn UI base components
├── dashboard/              # Dashboard-specific components
├── magicui/               # Magic UI animation components
├── motion-primitives/     # Framer Motion primitives
├── theme-provider.tsx     # Theme context provider
├── mode-toggle.tsx        # Dark/light mode toggle
└── index.ts              # Component exports
```

## Library Structure
```
lib/
├── utils.ts               # Core utilities (cn function)
├── context/               # React context providers
├── registry/              # Component registry
└── utils/                 # Additional utility functions
```

## Key Conventions
- **Path Aliases**: Use `@/` for imports from root (configured in tsconfig.json)
- **Component Exports**: Centralized exports through `components/index.ts`
- **Styling**: CSS modules for component-specific styles, Tailwind for utilities
- **File Naming**: kebab-case for files, PascalCase for components
- **German Comments**: Code comments are in German (following project language)

## Asset Organization
```
public/
├── avatars/               # User avatar images
├── logo-npbg-inventiert.png
└── Text-Logo-npbg-inventiert.png
```

## Development Files
- `Instructions/` - Contains workflow and development guidelines
- `xnotes/` - Agile workflow templates and project notes
- `docs/` - Technical documentation and language usage guides

## Import Patterns
```typescript
// Preferred import style
import { ComponentName } from "@/components/ui/component-name"
import { cn } from "@/lib/utils"
import { useState } from "react"

// Component structure
export function ComponentName() {
  return <div>Content</div>
}
```

## Dashboard Architecture
The dashboard follows a layout-based architecture:
- Main layout handles sidebar and theme management
- Individual pages focus on specific functionality
- Components are organized by feature area (dashboard/, ui/, etc.)
- State management uses React hooks with prop drilling for simple cases
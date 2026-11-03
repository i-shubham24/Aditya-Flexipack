<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design System & Anti-AI-Slop Directives

This project enforces strict zero-slop, production-grade aesthetic constraints via configured skills and agent rules:

1. **Aesthetic Floor & Anti-Slop (Hallmark & TasteSkill)**:
   - **No generic AI tells**: Eliminate predictable centered-hero layouts, generic purple/blue mesh gradients, cookie-cutter floating 3-column card grids, and placeholder marketing copy.
   - **Design Variance**: Dial pushed to maximum. Use intentional typography pairings, editorial spacing, strong hierarchy, bespoke grid rhythms, and rich tactile palettes.
   - Run layout audit and sloplint checks before committing interface code.

2. **Micro-Interactions & UX Polish (Impeccable & Vercel Web Guidelines)**:
   - Enforce deliberate micro-interactions, responsive states, keyboard accessibility, touch targets (>= 44px), stable skeleton loaders, and deliberate motion (`animate` & `delight` principles).
   - Strictly adhere to WCAG accessibility, fluid typography, and optical balance.

3. **Design Intelligence & System Tokens (UI-UX Pro Max)**:
   - Use cohesive design tokens (spacing, typography, semantic color scales, surface depth).
   - Maintain structural consistency across components.

4. **Procedural 3D & Visual Craft (img2threejs)**:
   - Procedural, lightweight Three.js / React Three Fiber code implementations over bloated static assets when 3D elements are required.


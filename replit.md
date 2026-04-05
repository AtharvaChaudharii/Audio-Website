# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### IPL 2026 Fan Trauma Test (`artifacts/ipl-trauma-test`)
- **Kind**: React + Vite web app
- **Preview path**: `/`
- **Description**: A scroll-based viral Indian meme experience diagnosing IPL fan mental health
- **Features**:
  - Scene 0: Hospital disclaimer with red pulse, typewriter text, siren sounds
  - Scene 1: 10 IPL team cards with confetti explosion on selection
  - Scene 2: Brain MRI scan with 6 clickable regions, trauma score counter
  - Scene 3: Horizontal scrolling IPL 2026 match timeline (flip-cards)
  - Scene 4: Fan personality type reveal with team-colored background
  - Scene 5: Dr. Dhoni's prescription pad with WhatsApp/Twitter share
  - Scene 6: Emotional points table of IPL 2026
  - Custom cricket bat cursor
  - Web Audio API sound effects throughout
  - Mobile-first design

### API Server (`artifacts/api-server`)
- **Kind**: Express 5 API
- **Preview path**: `/api`
- **Description**: Shared backend service for future backend needs

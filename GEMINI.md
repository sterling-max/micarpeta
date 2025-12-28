# GEMINI.md - Project Memory

## Project Overview
**Name**: MiCarpeta (Italian Citizenship Manager)
**Type**: Mobile-First PWA
**Goal**: Assist users in gathering, validating, and managing documents for Italian Citizenship (Jure Sanguinis) following 2025 reforms.

## Technology Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons, Framer Motion
- **State**: Zustand
- **Validation**: Zod
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL (Planned)

## Core Design Principles
1.  **Mobile-First**: Vertical layouts, large touch targets, swipe gestures.
2.  **Premium Aesthetics**: "Neoglass" / Soft UI, blur effects, smooth animations, high contrast but harmonious colors.
3.  **Strict Compliance**: Adherence to `SPEC.md` and 2025 legislative rules.
4.  **Zero-Config PWA**: Must work offline eventually.
5.  **Multi-User Tenancy**: Each user validates their own exclusive path/document set.

## Context & State
- Project initialized.
- Dependencies installed.
- Tailwind v4 active.

## Active Tasks
- [x] **Foundation**: Setup `globals.css` with premium theme (inter/outfit font, colors).
- [x] **Utils**: Create `lib/utils.ts`.
- [x] **Types**: Define core interfaces in `types/index.ts`.
- [ ] **Landing Page**: Create premium "SPA type" landing page at root.
- [ ] **Auth**: simple Login/Register UI.
- [ ] **Onboarding**: Initial data collection flow (Wizard).
- [x] **Navigation**: Create main layout and mobile navigation bar.
- [x] **Dashboard**: Create Pipeline View (PipelineViewer).
- [x] **Components**: Create `DocumentCard`, `StatusBadge`, `Button`.

## Conventions
- Use `lucide-react` for icons.
- Use `framer-motion` for interactions.
- All files in `app/` unless utility/component.
- Components in `components/ui` (generic) and `components/domain` (specific).

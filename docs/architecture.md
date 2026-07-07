# Architecture Notes

## Current Structure

- Frontend and API in one Next.js 15.5 project (App Router)
- React 19 with TypeScript (strict mode)
- Chat endpoint at `app/api/chat/route.ts` (legacy, NVIDIA NIM)
- AI assistant endpoint at `app/api/abby/route.ts` (primary, DeepSeek / OpenAI)
- Test suite with Vitest and Testing Library
- No Tailwind CSS — all styling in `app/globals.css` with `.fi-*` scoped classes
- Framer Motion `^12.38.0` used sparingly for key motion sequences

## Deployment Topology

```
┌─────────────────────────────────────────────────┐
│              CDN / Edge (Vercel)                 │
│  ┌─────────────────────────────────────────────┐ │
│  │  Next.js Server (SSR + API Routes)          │ │
│  │  ┌──────────┐  ┌────────────┐  ┌─────────┐ │ │
│  │  │ Static   │  │ /api/abby  │  │ /api/   │ │ │
│  │  │ Pages    │  │ (AI chat)  │  │ chat    │ │ │
│  │  └──────────┘  └─────┬──────┘  └────┬────┘ │ │
│  └────────────────────────┼─────────────┼──────┘ │
│                           │             │        │
│  ┌────────────────────────┼─────────────┼──────┐ │
│  │  Server-side fetches   ▼             ▼      │ │
│  │  ┌──────────────┐  ┌──────────┐  ┌───────┐ │ │
│  │  │ content/abby │  │DeepSeek  │  │NVIDIA │ │ │
│  │  │ *.md (KB)    │  │Provider  │  │ NIM   │ │ │
│  │  └──────────────┘  └──────────┘  └───────┘ │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## Application Architecture

### Layer 1: Presentation (Client)
- `app/layout.tsx` — Root layout with Google Fonts (Inter, Fragment Mono, Georgia)
- `app/page.tsx` — Homepage entry
- `components/` — React components organized by feature
- `app/globals.css` — Single editorial stylesheet (~2000+ lines, `.fi-*` prefix)

### Layer 2: Server Routes (API)
- `app/api/abby/route.ts` — Main AI assistant
  - Provider: DeepSeek (default) or OpenAI
  - Rate limiting: 20 req/min per IP (in-memory)
  - Timeout: 28s
  - Knowledge base injection from `content/abby/*.md`
- `app/api/chat/route.ts` — Legacy chat (NVIDIA NIM)
  - Rate limiting: same
  - Timeout: 25s

### Layer 3: Knowledge & Config
- `content/abby/*.md` — 9 Markdown knowledge files
- `src/prompts/abby.system-prompt.md` — System prompt for Abby
- `src/config/abby.{config,persona,relationship,knowledge-index}.json`

### Layer 4: Utilities
- `lib/abby-knowledge.ts` — Knowledge file loader
- `lib/site-content.ts` — Shared route/navigation data
- `lib/site-metadata.ts` — Metadata builder
- `lib/rate-limit.ts` — IP-based rate limiter
- `lib/motion-variants.ts` — Framer Motion tokens

## Data Flow

```
Visitor Request
    │
    ▼
Next.js Server Route (app/api/*)
    │
    ├── Static page → SSR → HTML response
    │
    ├── /api/abby → Validate → Load knowledge → Call AI provider
    │       │
    │       ├── DeepSeek (default)  ──→  Response → Normalize → JSON
    │       └── OpenAI (alternate)  ──→  Response → Normalize → JSON
    │
    └── /api/chat → Validate → Call NVIDIA NIM → Response → JSON
```

## Key Design Decisions

1. **No Tailwind CSS** — All CSS is hand-written in a single global stylesheet for editorial control and to avoid utility-class bloat in a content-heavy site.

2. **No CSS-in-JS** — Pure CSS with BEM-like `.fi-*` scoping for performance and simplicity.

3. **Next.js App Router** — Server Components by default for SEO and performance; Client Components only where interactivity is needed (Abby widget, navbar).

4. **In-memory rate limiting** — Chosen for simplicity on a personal low-traffic site. Production deployment should use platform-level or shared-store rate limiting.

5. **Markdown knowledge base** — Abby's knowledge lives in flat `.md` files, loaded at build time. This makes content updates possible without code changes.

## Future Improvements

- Add OpenTelemetry instrumentation for API and rendering paths
- Introduce standardized error payload model (RFC 9457)
- Add reusable workflow templates and OIDC-based deploy auth
- Platform-level or Redis-backed rate limiting for production
- OpenAPI 3.1 specification for `/api/abby`
- Structured logging with correlation IDs

---

<!-- branding: framed and finished by Classy — architecture documentation built with engineering precision -->
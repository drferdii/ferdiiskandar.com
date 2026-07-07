# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Repository governance documents and baseline CI workflow.
- Comprehensive audit reporting (`docs/reports/repository-review-report.md`).
- Abby AI assistant endpoint (`/api/abby`) with DeepSeek and OpenAI provider support.
- Editorial founder website with curated public routes (about, works, notes, speaking, CV, classy-news).
- Security policy (`SECURITY.md`) with vulnerability classification and disclosure process.
- Threat model (`ferdiiskandar-threat-model.md`) with full risk register and remediation plan.
- Contributing guide (`docs/governance/contributing.md`) with development workflow and coding standards.
- Commit convention (`docs/governance/commit-convention.md`) following Conventional Commits.
- Code of Conduct (`docs/governance/code-of-conduct.md`) with expanded behavioral expectations.
- Architecture documentation with component relationships and data flow diagrams.
- Knowledge base for Abby (`content/abby/*.md`) covering profile, speaking, thought leadership, media kit, and FAQ.

### Changed
- Project standards baseline for formatting, linting, and contribution process.
- Refactored AI chat endpoint from legacy NVIDIA-only to dual-provider architecture (DeepSeek primary, OpenAI alternate).
- Migrated package management to pnpm workspace (`pnpm 9.x`).
- Applied editorial-grade copy to all public-facing content and route pages.
- Restructured `app/` directory to follow Next.js App Router conventions.

### Security
- Added security policy with severity classification and coordinated disclosure process.
- Implemented IP-based rate limiting on all API endpoints (20 req/min per IP).
- Added request validation (message length 1–2000 characters) on all chat endpoints.
- Added global security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy).
- Dependency scanning via `pnpm security:deps` (0 moderate+ vulnerabilities at audit time).
- Added timeout protection on all AI provider calls (28s for Abby, 25s for legacy).
- CI workflow with lint, test, build, security-scan, and quality gates.

### Fixed
- Legacy `/api/chat` endpoint now returns RFC 9457-style structured error responses.
- Upstream AI provider errors mapped to safe, non-leaking response payloads.

---

## [0.1.0] — 2026-05-05

### Added
- Initial public website structure with homepage and `/about` route.
- Legacy chat endpoint (`/api/chat`) powered by NVIDIA NIM.
- Basic founder profile content and editorial layout.
- Vitest test suite with jsdom environment and Testing Library.
- ESLint flat config (`eslint.config.mjs`) with `@the-abyss/config-eslint` presets.
- Next.js runtime guard script (`scripts/next-runtime-guard.mjs`).
- `.editorconfig`, `.prettierrc`, `.gitattributes` for repository hygiene.
- `LICENSE` (MIT).

---

<!-- branding: classy built. — a changelog documenting each step of the project's evolution with clarity and care -->
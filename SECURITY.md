# Security Policy

> **Last updated:** 2026-05-13
> **Maintainer:** Ferdi Iskandar / Security Review Team
> **Review cycle:** Quarterly or upon significant dependency updates

---

## Supported Versions

| Version | Status | Supported Until |
|---|---|---|
| Current (main branch) | ✅ Supported | Ongoing |
| Legacy releases | ❌ End-of-Life | N/A |

The default branch and latest release are actively supported. Older branches may not receive security patches.

---

## Vulnerability Classification

| Severity | Description | Response Target |
|---|---|---|
| **Critical** | Remote code execution, full system compromise, data breach | 24-hour acknowledgment, expedited patch |
| **High** | Authentication bypass, privilege escalation, data exposure | 72-hour acknowledgment, patch within 7 days |
| **Medium** | Limited impact exploits, information disclosure, bypass of secondary controls | Acknowledgment within 7 days, patch within 30 days |
| **Low** | Minor information leakage, non-exploitable findings | Best-effort remediation in next release cycle |
| **Informational** | Hygiene issues, hardening recommendations | Tracked for future improvement |

---

## Reporting a Vulnerability

We take the security of this project seriously. If you believe you have found a security vulnerability, please report it responsibly.

### How to Report

1. **Do not open public GitHub issues** for security vulnerabilities.
2. Send a detailed report privately to the maintainer via [email/contact form — add actual address].
3. Include the following in your report:
   - Description of the vulnerability
   - Steps to reproduce or proof-of-concept
   - Potential impact and severity assessment
   - Suggested remediation (optional)

### What to Expect

1. **Acknowledgment** within 72 hours of receiving your report.
2. **Triage** — we will assess severity and affected scope.
3. **Remediation** — a fix will be developed and validated.
4. **Disclosure** — a coordinated public disclosure will follow once a patch is available.
5. **Credit** — reporters will be credited (unless anonymity is requested).

---

## Disclosure Process

Our coordinated vulnerability disclosure follows this timeline:

| Step | Action | Timeline |
|---|---|---|
| 1. **Receipt** | Confirm report received and assign tracking ID | Within 72 hours |
| 2. **Triage** | Validate, classify severity, determine affected scope | Within 5 business days |
| 3. **Remediation** | Develop, review, and test fix | Based on severity (see table above) |
| 4. **Patch Release** | Merge fix, publish updated version | Simultaneous with or before disclosure |
| 5. **Public Disclosure** | Publish advisory with credit to reporter | Within 14 days of patch release |

---

## Dependency and Scanner Exceptions

Any accepted exception to dependency policies must be documented with:

- **Vulnerability ID** — e.g., CVE identifier or advisory reference
- **Impact statement** — why the vulnerability does not apply or is acceptably mitigated
- **Mitigation strategy** — compensating controls in place
- **Planned remediation date** — when the exception will be revisited

### Current Exceptions

| Exception ID | Dependency | CVE(s) | Mitigation | Planned Review |
|---|---|---|---|---|
| [Example only] | `package-name@x.y.z` | CVE-2024-XXXXX | Not reachable in production config | 2026-Q3 |

---

## Security Controls Summary

| Control | Implementation | Coverage |
|---|---|---|
| Secret management | Environment variables only; `.env.local` gitignored; `.env.example` has empty placeholders | All routes |
| Input validation | All API endpoints validate message shape, length (1–2000 chars), and sanitize history | `/api/abby`, `/api/chat` |
| Rate limiting | IP-based fixed-window: 20 requests / 60 seconds | All API endpoints |
| Output encoding | All AI responses normalized to plain text; React escapes by default | Frontend |
| Security headers | CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, frame-ancestors | All responses |
| Dependency scanning | `pnpm security:deps` via npm audit at moderate level | Full dependency tree |
| No PHI/PII in logs | Upstream error bodies sanitized; no patient data in this application | API routes |
| CORS | No broad `Access-Control-Allow-Origin` headers found | Application-wide |

---

## Audit History

| Date | Auditor | Scope | Result |
|---|---|---|---|
| 2026-05-13 | Automated security review | Full application | PASS — no critical/high findings |
| 2026-05-13 | Dependency audit (`pnpm audit --audit-level=moderate`) | Dependencies | 0 vulnerabilities |

---

## Bug Bounty and Acknowledgment

This project does not currently operate a formal bug bounty program. However, we welcome and appreciate responsible vulnerability disclosures. Reporters who contribute to improving the security of this project will be:

- Acknowledged in release notes (with permission)
- Added to the project's contributors list
- Referenced in the security policy upon request

---

## Next Steps

1. Add responsible disclosure email address
2. Set up quarterly security review cadence
3. Add automated secret scanning to CI pipeline
4. Evaluate adding formal bug bounty program if project reaches wider adoption

---

<!-- branding: precision-built by Classy — security documentation constructed with exacting attention to compliance, operational safety, and responsible disclosure standards -->
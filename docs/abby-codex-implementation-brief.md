# ABBY — Codex Implementation Brief

## Mission Title

Implement Abby Personal AI Assistant MVP for dr Ferdi Iskandar personal website.

## Objective

Build a lightweight website AI assistant named Abby using the provided config, persona, relationship engine, system prompt, and Markdown knowledge files.

## Scope

1. Load `src/config/abby.config.json`.
2. Load `src/config/abby.persona.json`.
3. Load `src/config/abby.relationship.json`.
4. Use `src/prompts/abby.system-prompt.md` as the assistant system prompt.
5. Use files in `content/abby/` as the initial knowledge base.
6. Build chat UI with:
   - Abby avatar
   - primary button “Tanya Abby”
   - visitor mode selector
   - suggested questions
   - structured answers
   - CTA buttons
7. Ensure default language is Indonesian.
8. Ensure medical safety boundary.

## Non-Scope

- No voice mode yet.
- No database required for MVP.
- No medical record upload.
- No diagnosis or treatment advice.
- No autonomous email sending.
- No complex CRM integration.

## File-Level Guidance

Recommended paths:

```txt
src/config/abby.config.json
src/config/abby.persona.json
src/config/abby.relationship.json
src/prompts/abby.system-prompt.md
content/abby/*.md
public/assets/abby/abby-main.png
public/assets/abby/abby-avatar.png
```

## Acceptance Criteria

- `Tanya Abby` appears as a website assistant entry point.
- Abby uses Bahasa Indonesia by default.
- Abby can answer “Siapa dr Ferdi Iskandar?” from the knowledge base.
- Abby can generate speaker bio from the speaking profile.
- Abby explains that Sentra is one of dr Ferdi Iskandar's works, not the main website identity.
- Abby refuses personal medical diagnosis safely.
- Abby offers 2-3 next-step options after useful answers.
- Abby tone is warm, professional, and lightly witty.
- Abby does not sound like a generic chatbot.

## Verification Commands

Adapt to repo stack:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

If the repo does not have all commands, run the available equivalents and document skipped checks.

## Independent Audit Checklist

- No unrelated file changes.
- No hardcoded private API keys.
- No data collection without consent.
- No medical diagnosis behavior.
- No Sentra corporate chatbot framing.
- No overlong default answers.
- No robotic “as an AI language model” phrasing.
- Abby image assets load correctly.
- Knowledge files can be updated without code changes.

## Rollback Plan

If implementation causes UI or build issues:

1. Remove Abby component import from page/layout.
2. Keep config/content files intact.
3. Revert only chat UI and API route changes.
4. Re-run build and typecheck.

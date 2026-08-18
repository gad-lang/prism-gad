# CLAUDE.md

## Project
`@gad-lang/prism-gad` — a PrismJS grammar for the Gad language and its dialects
(`.gad`, `.gadt` template, `.gadx`), for static syntax highlighting.

## Tooling — bun ONLY
- **Always use `bun`.** Never `npm`, `yarn`, `pnpm`, `npx` or `node` directly.
- Build and dev go through the `Makefile` (a thin wrapper over bun) — run `make help`.
- `make build` (tsc → `dist/`), `make typecheck`, `make demo` (example server), `make clean`.

## Layout
- `src/` — `index.ts` (public API), `gad-grammar.ts`, `template.ts`, `gadx.ts`.
- `example/` — live demo served by `example/serve.ts` (bun).
- `docs/api.md` — API reference.

## Conventions
- TypeScript strict; keep the public surface in `src/index.ts`.

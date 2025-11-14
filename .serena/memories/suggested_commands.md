Key commands:
- `pnpm admin:dev` – run the Next.js admin UI (port 3000+).
- `pnpm worker:dev` – run the Playwright worker API on port 8080.
- `pnpm build` – build core, admin, and worker packages.
- `pnpm typecheck` – run TypeScript compiler with noEmit.
- `pnpm --filter @osikatsu-pro/worker extract-api` or `pnpm --filter @osikatsu-pro/worker run:url <url>` – ad-hoc worker runs.
- `lsof -i :8080` / `kill <PID>` – diagnose running worker on macOS.
- Supabase MCP migrations: `apply_migration` for schema updates.
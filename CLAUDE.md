# Contributor rules

These rules apply to everyone working on this repository, people and AI assistants alike.

- Never commit to `main`. Make one branch per change.
- `npm run build` must pass before you push.
- Open a pull request with `gh pr create`.
- Merging to `main` publishes to reef.center automatically. Treat every merge as a production release.
- Never commit secrets: no passwords, SSH keys, tokens or `.env` files. Deploy credentials live only in GitHub Actions secrets.
- Keep the project free of hosted site builder tooling and their plugins; all work is done with Claude Code.
- Never add the name of any unannounced or stealth venture connected to REEF speakers or partners. If unsure, ask Greg first.

# Project notes

- Vite + React + TypeScript + Tailwind v4, npm as the package manager. The site lives at the repo root.
- `public/.htaccess` and `public/api/contact.php` are copied into `dist/` and served by the Apache/PHP host.
- Dependencies are pinned to exact versions so the build reproduces the live site; change them deliberately.

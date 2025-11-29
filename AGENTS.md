# Repository Guidelines

## Project Structure & Modules
- `index.html` and `style.css` form the static page; `bundle.js` is the generated, browser-ready build—do not hand-edit it.
- Development happens in `modules/` (ES modules). Key files: `main.js` (entry/game loop), `config.js` (tunable constants), `gameState.js` (shared state setters/getters), `world.js`/`worldObjects.js`/`worldAnimals.js` (environment and outdoor entities), `interior.js`/`interiorObjects.js`/`interiorAnimals.js` (indoor mode), `player.js`, `camera.js`, `building.js`, `dayNight.js`, `ui.js`, `saveLoad.js`, `input.js`, `utils.js`.
- Add new modules to the ordered array inside `bundle_modules.sh` so they are included when bundling.

## Build, Run, and Development Commands
- `bash bundle_modules.sh` — Rebuilds `bundle.js` from `modules/`; run after module changes and before shipping commits.
- `python3 -m http.server 8000` (from repo root) — Serve files locally at `http://localhost:8000`; improves pointer-lock behavior versus the `file://` URL. Opening `index.html` directly is fine for quick checks.
- If you add a module, verify its order in `bundle_modules.sh` matches its dependencies.

## Coding Style & Naming Conventions
- JavaScript with ES modules; prefer `const`/`let`, 2-space indentation, semicolons, and single quotes.
- Functions and files use `camelCase` (`worldAnimals.js`), exported constants in `SCREAMING_SNAKE_CASE` (e.g., `CONFIG`).
- Keep logic modular: state lives in `gameState.js`; rendering/physics in their dedicated modules. Favor small helpers in `utils.js`.
- Use concise JSDoc-style headers for non-obvious modules; inline comments sparingly where math or Three.js nuances occur.

## Testing Guidelines
- No automated tests; rely on manual smoke tests after bundling:
  - Load the game, confirm movement and mouse-look.
  - Place and remove objects (outside) and furniture/pets (inside).
  - Trigger day/night cycle; confirm lighting and shadows.
  - Use Save/Load (F5/F9 or UI buttons) to verify localStorage persistence.
- When fixing bugs, add a short repro note in PRs to guide manual verification.

## Commit & Pull Request Guidelines
- Commit messages: short, present-tense summaries (repo history examples: “saving works”, “better ghosts…”). Group related changes; avoid formatting-only commits unless necessary.
- If modules were edited, include the regenerated `bundle.js` in the same commit so browser users stay in sync.
- PRs should include: a brief description of the change, steps you manually tested, and optional screenshots/GIFs for visual tweaks. Link any tracking issue if relevant.

## Architecture & Safety Notes
- The game is fully client-side; saves live in browser `localStorage`. Avoid introducing network calls or storing secrets.
- Performance: mind object counts (`CONFIG.objects`) and shadow settings; prefer reusing geometries/materials where possible to keep frame times stable.

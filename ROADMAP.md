# ROADMAP.md - Second Brain App

## Visie
Een tweede brein systeem in `/home/hans/.openclaw/workspace/projects/second-brain-app`
om alle notities, gesprekken en herinneringen te beheren, doorzoeken en met
elkaar te verbinden.

## Huidige Status (bijgewerkt 2026-07-06)

- **Status:** Fase 1 + 2 grotendeels werkend (lees- en zoekweergave live)
- **Build:** groen (`npm run build` slaagt, TypeScript + lint OK)
- **Data:** demo-modus op `public/data/items.json`
- **Openstaand:** persistente opslag (SQLite) nog niet aangesloten op de UI

## Fase 1: Fundering (Foundation) — ✅ gedaan

- **Architectuur:** Next.js 16 App Router + React 19 + Tailwind v4 + TypeScript.
- **Data Model:** `BrainItem` met drie varianten — `Memory`, `Note`, `Conversation`
  (zie `src/lib/types.ts`). Gedefinieerd en getypeerd.
- **Setup:** Basisstructuur, layout, globals, dark-mode.

## Fase 2: Kernfunctionaliteit (Core Features) — 🟡 gedeeltelijk

- **Weergave:** Hoofdpagina met tabs (All/Memories/Notes/Conversations),
  `ItemList`, `SearchDialog` (Cmd+K), `AddItemForm`, `SettingsDialog`.
- **Zoeken:** Client-side filter op titel/content/berichten.
- **CRUD:** Toevoegen werkt in de UI (lokaal state); persistente aanpassing
  (edit/delete + opslag) nog niet aangesloten op een backend.
- **Contextkoppeling (linking):** nog niet geïmplementeerd.

## Fase 3: Integratie & Automatisering (Integration & Automation) — ⬜ gepland

- **Connectiviteit:** `lib/db.ts` (better-sqlite3) en `lib/storage.ts` staan klaar
  maar worden nog niet gebruikt. Aansluiten als default datalaag.
- **Synchronisatie:** Notities synchroniseren met externe bronnen
  (OpenClaw memory, agenda, etc.).
- **Automatisering:** Dagelijkse taakgenerator om notities te prioriteren.

## Fase 4: Uitrol & Optimalisatie (Deployment & Optimization) — ⬜ gepland

- **Prestaties:** DB-queries + UI-responsiviteit optimaliseren.
- **Deployment:** Deploy-pipeline (bijv. Vercel/ Docker).
- **Beveiliging:** Audit van data-opslag en toegang.

## Volgende concrete stappen

1. `lib/db.ts` aansluiten als actieve datalaag (vervang de JSON-fetch in page.tsx).
2. Edit/delete-operaties toevoegen met persistente opslag.
3. Linking tussen items (backlinks / gerelateerde items).
4. Synchronisatie-hook met OpenClaw `memory/`.

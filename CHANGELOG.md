# Changelog

Alle notable wijzigingen aan dit project worden hier gedocumenteerd.

## [0.1.0] - 2026-07-06

### Toegevoegd
- Eerste publieke documentatie: eerlijke `README.md` en bijgewerkte `ROADMAP.md`
  die de echte projectstatus beschrijven (demo-modus op `public/data/items.json`,
  ongebruikte SQLite/JSON datalagen klaargezet voor Fase 3).

### Opgelost
- **Type-error in `page.tsx`**: de view-tabs gebruikten meervoudsnamen
  (`memories`/`notes`/`conversations`) terwijl `item.type` enkelvoudig is
  (`memory`/`note`/`conversation`). Dit brak `npm run build`. Opgelost met een
  expliciete `typeMap`.
- **Ontbrekende types voor `better-sqlite3`**: `@types/better-sqlite3` als
  devDependency toegevoegd zodat `lib/db.ts` de TypeScript type-check doorstaat.

### status
- `npm run build` slaagt (TypeScript + static generation groen).
- `npm run lint` schoon.

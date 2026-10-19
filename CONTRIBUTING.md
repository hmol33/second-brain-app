# Contributing to second-brain-app

Bedankt voor je interesse om bij te dragen aan second-brain-app!

## Hoe kan ik bijdragen?

### Bugs rapporteren

1. Controleer eerst of de bug al is gerapporteerd in de [Issues](https://github.com/hmol33/second-brain-app/issues)
2. Maak een nieuwe issue aan met:
   - Een duidelijke titel
   - Stappen om de bug te reproduceren
   - Verwacht vs. werkelijk gedrag
   - Je browser en Node.js-versie
   - Screenshots indien relevant

### Features voorstellen

1. Open eerst een issue om de feature te bespreken
2. Wacht op goedkeuring voordat je code schrijft
3. Kleine, gefocuste features hebben voorkeur

### Pull Requests

1. Fork de repo en maak een feature-branch aan
2. Zorg dat `npm run lint` en `npm run build` slagen
3. Test je changes lokaal met `npm run dev`
4. Maak een PR aan met een duidelijke beschrijving van wat en waarmee

## Code Stijl

- **TypeScript**: strict mode, geen `any` tenzij noodzakelijk
- **React**: function components met hooks
- **Styling**: Tailwind CSS utility classes
- **Commits**: gebruik duidelijke commit messages (conventional commits bij voorkeur)

## Ontwikkelomgeving

```bash
# Clone de repo
git clone https://github.com/hmol33/second-brain-app.git
cd second-brain-app

# Installeer dependencies
npm install

# Start ontwikkelserver
npm run dev

# Lint
npm run lint

# Productie-build testen
npm run build
```

## Project Structuur

```
src/
├── app/
│   ├── layout.tsx        # Root layout + globals
│   ├── page.tsx          # Hoofdpagina (client component)
│   └── globals.css       # Tailwind + thema
├── components/
│   ├── ItemList.tsx      # Lijstweergave van items
│   ├── SearchDialog.tsx  # Cmd+K zoekdialoog
│   ├── AddItemForm.tsx   # Nieuw item toevoegen
│   └── SettingsDialog.tsx# App-instellingen
├── lib/
│   ├── types.ts          # BrainItem / Memory / Note / Conversation types
│   ├── db.ts             # SQLite-laag (better-sqlite3)
│   └── storage.ts        # JSON in-memory storage
└── data/
    └── items.json        # (legacy) zie public/data/items.json

public/
└── data/
    └── items.json        # Huidige data-bron
```

## Testen

```bash
# Lint
npm run lint

# Type-check (via build)
npm run build
```

## Documentatie

- Zie [README.md](README.md) voor installatie en gebruik
- Zie [CHANGELOG.md](CHANGELOG.md) voor wijzigingshistorie
- Zie [ROADMAP.md](ROADMAP.md) voor geplande features
- Zie [AGENTS.md](AGENTS.md) voor AI-agent guidance

## Licentie

Door bij te dragen ga je akkoord dat je bijdragen onder de MIT-licentie worden uitgebracht.

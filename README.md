# FIN/ACE

FIN/ACE, also written as `finace` in package metadata, is a small local-first finance tracker built with React, Vite, TypeScript, React Router, Material UI, and Recharts.

The app helps users track and compare planned vs. actual income and expenses across dashboards, records, ledger tables, comparison views, trends, and categories.

New local profiles start with empty finance data. To explore the app with example records, use the test-user option from the homepage or login page.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Material UI
- Recharts

## Notes

Data is stored locally in the browser with `localStorage` and scoped by local user profile. This keeps the project simple for learning and prototyping, but it is not a production authentication or persistence model.

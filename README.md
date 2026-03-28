# Project S Estates

A standalone React frontend for showcasing ongoing real estate developments with a premium glassmorphism presentation.

## Highlights

- Modern landing page focused on ongoing residential projects
- Project portfolio loaded from `public/data/projects.json`
- Separate project imagery stored in `public/projects`
- Redux Toolkit state for fetching, filtering, and selecting listings
- Direct enquiry actions for the assigned project manager

## Data structure

- Update project content in `public/data/projects.json`
- Add or replace project visuals in `public/projects`
- Each project entry references its image path so content stays folder-driven

## Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates the production build
- `npm run lint` runs ESLint

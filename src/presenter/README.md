# React Architecture

The portfolio is now a React application built with Vite:

- `src/model/projectData.js` owns the project data.
- `src/view/` contains one React view component for each project. Shared card
  markup lives in `ProjectView.jsx`, while project-specific behavior belongs to
  each project's view.
- `src/App.jsx` owns tab state and maps each model entry to its view component.
- `src/main.jsx` mounts the React application.

Run `npm install` once, then use `npm run dev` for local development or
`npm run build` for a production build.

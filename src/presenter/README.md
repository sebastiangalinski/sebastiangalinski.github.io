# Presenter Layer

The presenter layer coordinates model data and view components:

- `src/model/projectData.js` owns the project data.
- `sortProjectsByDate` provides the newest-first project ordering.
- `src/presenter/PortfolioPresenter.jsx` owns tab state, project-to-view
  communication, and timeline selection.
- `src/view/TimelineView.jsx` renders the project timeline and sends user
  selections back to the presenter.
- `src/App.jsx` owns only the page shell and background presentation.
- `src/main.jsx` mounts the React application.

Run `npm install` once, then use `npm run dev` for local development or
`npm run build` for a production build.

# View Layer

Each project has a dedicated React view component:

- `causticsView.jsx`
- `countryguessrView.jsx`
- `wasteClassificationView.jsx`
- `nordicGambitView.jsx`
- `LifeMemoView.js`
- `TbaProjectView.jsx`

The project-specific components use `ProjectView`, which renders the shared
card structure from model data. The Nordic Gambit component keeps the external
iframe unloaded until the visitor chooses to open it.
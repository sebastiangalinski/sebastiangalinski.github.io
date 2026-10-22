# Sebastian Galinski Portfolio

This is a React portfolio built with Vite.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The GitHub Pages deployment is handled by
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). Each push to
`main` builds the Vite application and publishes the generated `dist` folder.
In the repository settings, set Pages' source to **GitHub Actions**.

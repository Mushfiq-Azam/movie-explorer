# Movie Explorer

A cinematic movie and TV discovery app built with React and Vite. Browse the full TVMaze catalog, search for shows by title, and open a details view for each show — all with a polished, dark streaming-style UI.

## Features

- **Home page** — full-screen cinematic hero with calls to action
- **Shows listing** — responsive grid of shows loaded from the TVMaze API
- **Live search** — debounced search by title; clearing the search restores the full catalog
- **Show details modal** — poster, summary, rating, premiere date, genres, language, status, runtime, and network when available
- **Robust states** — loading, error with retry, and empty-result handling
- **Responsive UI** — mobile, tablet, and desktop layouts with a mobile nav menu
- **Accessibility** — semantic markup, focus management, accessible dialog, and reduced-motion support

## Technologies Used

- [React](https://react.dev) 19 (JSX)
- [Vite](https://vite.dev) 7
- [React Router](https://reactrouter.com) 7
- Plain CSS (no UI framework)
- [TVMaze API](https://www.tvmaze.com/api)

## Getting Started

These instructions assume you have Node.js and npm installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/Mushfiq-Azam/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed in the terminal (typically `http://localhost:5173`).

## Available Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite development server with HMR   |
| `npm run build`   | Build the production bundle into `dist/`     |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint on the project                    |

## Build

Create an optimized production build:

```bash
npm run build
```

The output is written to the `dist/` folder and can be served by any static host.

## TVMaze API

This project uses the free [TVMaze API](https://www.tvmaze.com/api) to load show data. No API key is required. Show data and posters are the property of TVMaze and its data providers.

## Deployment

Deployment is planned via [Vercel](https://vercel.com). The app is ready to connect to a Vercel project; a live URL will be added here once deployed.

- **Live URL (pending):** <https://movie-explorer.vercel.app>

### Deploying to Vercel

```bash
npm install -g vercel
vercel
```

## Contact

- **Email:** mushfiq.azam7860@gmail.com

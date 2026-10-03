# Samui Explorer

Samui Explorer is a React application for discovering restaurants,
activities, and wellness services around Koh Samui.

This project is the first MVP version. Place information is stored
locally in a JSON file because the app does not currently use a
database or backend.

## Features

- Browse sample places by category and area
- Search for places by name
- Filter places by category and area
- View a detail page for each place
- Browse an image gallery for each place
- Open directions in Google Maps
- Save and remove favourite places
- Add personal notes to saved places
- Persist saved places and notes with localStorage
- View current Koh Samui weather using the Open-Meteo API
- Navigate between pages with React Router

## Technologies

- React
- TypeScript
- React Router
- Tailwind CSS
- Vite
- Open-Meteo API
- Browser localStorage

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Available Scripts

Create a production build:

```bash
npm run build
```

Check the project with ESLint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Data

Place information is stored in:

```text
src/data/places.json
```

Images are stored in:

```text
public/places-images
```

## Current Limitations

- The app uses sample data and placeholder contact information.
- There is no database, authentication, review system, or booking system.
- Saved places and notes are stored only in the current browser.
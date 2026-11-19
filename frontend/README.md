# CodeCanvas AI Frontend

The frontend is a React 19 single-page application built with Vite. It provides the user interface for browsing DSA problems and sheets, tracking progress, running code, viewing platform statistics, and interacting with the AI assistant.

## Features

- Public home, problem, sheet, login, registration, and leaderboard pages.
- Protected profile page with profile-image upload.
- Dashboard with solved-problem statistics, platform statistics, and activity heatmap.
- Problem and sheet browsing with solved-state tracking.
- Monaco-based code editor connected to the backend compiler endpoint.
- Excalidraw whiteboard with image analysis and AI chat actions.
- Google OAuth login.
- Socket.IO connection for user registration and real-time connection handling.
- Light and dark themes.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/dashboard` | User dashboard |
| `/sheets` | Available sheets |
| `/sheet/:id` | Problems in a sheet |
| `/problems` | Problem list |
| `/problem/:slug` | Problem details |
| `/solve/:problemId` | Problem workspace |
| `/leaderboard` | Leaderboard |
| `/login` | Login |
| `/register` | Registration |
| `/profile` | Authenticated profile |

## Requirements

- Node.js 18 or newer
- The backend running locally on `http://localhost:5000`, unless the API URL in `src/api/axiosInstance.js` is changed.
- A Google OAuth client ID for Google login.

## Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` and set the Google OAuth client ID:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the development server:

```bash
npm run dev
```

The other available scripts are:

```bash
npm run build
npm run preview
npm run lint
```

Authentication tokens are read from `localStorage` and sent as Bearer tokens by the shared Axios instance.

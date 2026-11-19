# CodeCanvas AI

CodeCanvas AI is a DSA practice platform for browsing curated problem sheets, tracking solved problems, running code, reviewing platform statistics, and getting AI-assisted help.

## What is included

- Problem and sheet browsing with duplicate-free sheet mappings.
- Authenticated progress tracking and solved-problem statistics.
- Monaco code editor connected to Judge0 through the backend.
- Excalidraw workspace with AI image analysis and chat.
- Google OAuth and JWT-based authentication.
- Profile-image uploads through Cloudinary.
- LeetCode, Codeforces, and CodeChef statistics synchronization.
- Activity heatmap and leaderboard views.
- Socket.IO connection support for user registration and connection updates.

## Project structure

```text
CODECANVAS-AI/
├── frontend/   React + Vite application
└── Backend/    Express + Socket.IO API
```

## Tech stack

### Frontend

- React 19 and Vite
- React Router
- Axios
- Monaco Editor
- Excalidraw
- Tailwind CSS
- Socket.IO client
- Google OAuth
- React Markdown with KaTeX support

### Backend

- Node.js and Express
- Socket.IO
- PostgreSQL accessed through `pg`
- JWT and bcrypt authentication
- Google OAuth verification
- Google Gemini AI
- Judge0 code execution through RapidAPI
- Cloudinary profile-image storage
- Multer in-memory uploads

## Requirements

- Node.js 18 or newer
- PostgreSQL
- Credentials for the external services used by the features you enable: Google OAuth, Gemini, Judge0 RapidAPI, and Cloudinary.

## Run locally

Install dependencies and start the backend:

```bash
cd Backend
npm install
npm run dev
```

The backend listens on port `5000` by default. Set `PORT` to use another port.

Configure the PostgreSQL connection in `Backend/src/config/db.js` before starting the API. Keep service secrets in environment variables rather than source control. The backend reads these variables:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
JUDGE0_KEY=your_rapidapi_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

In another terminal, install dependencies and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend currently uses `http://localhost:5000/api` as its API base URL. Set `VITE_GOOGLE_CLIENT_ID` in `frontend/.env` for Google login:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Available API groups

The backend mounts these route groups under `/api`:

- `/auth` - registration, login, Google login, current user, and profile updates.
- `/problems` - problem listing, details, recommended and recent problems, and problem creation.
- `/sheets` - sheet listing, sheet problems, progress, and sheet creation.
- `/progress` - solved problems, progress updates, statistics, and leaderboard.
- `/submissions` - submission creation and history.
- `/stats` - platform statistics, synchronization, stored stats, and heatmap data.
- `/run` - code execution.
- `/ai` - image analysis and continued AI chat.
- `/user` - authenticated profile-image upload.

## Validation

```bash
cd frontend
npm run lint
npm run build
```

The backend package does not currently define an automated test suite.

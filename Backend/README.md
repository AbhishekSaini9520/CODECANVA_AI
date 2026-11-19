# CodeCanvas AI Backend

The backend is an Express API with Socket.IO support. It provides authentication, problem and sheet data, progress tracking, code execution, AI assistance, external coding-platform statistics, submissions, and profile-image uploads.

## Features

- JWT authentication with registration, login, profile retrieval, and profile updates.
- Google OAuth login.
- Problem and sheet listing, detail, and creation endpoints used by the frontend.
- Solved-problem progress tracking and leaderboard calculations.
- LeetCode, Codeforces, and CodeChef statistics synchronization.
- Activity heatmap data.
- Judge0 code execution through RapidAPI.
- Gemini-powered chat and Excalidraw image analysis.
- Cloudinary profile-image uploads.
- Socket.IO user registration and connection tracking.

## Requirements

- Node.js 18 or newer
- PostgreSQL
- Credentials for Google OAuth, Gemini, Judge0 RapidAPI, and Cloudinary when using those integrations.

## Setup

```bash
cd Backend
npm install
```

Configure the PostgreSQL connection in `src/config/db.js`. The application currently uses the `pg` connection pool directly. Keep credentials out of source control and use environment variables when configuring a deployment.

The backend reads these environment variables:

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

Start the API in development mode:

```bash
npm run dev
```

Start it without Nodemon:

```bash
npm start
```

The server listens on port `5000` by default, or on the value of `PORT`.

## API routes

All routes are prefixed with `/api`.

| Group | Endpoints |
| --- | --- |
| `/auth` | `POST /register`, `POST /login`, `POST /google`, `GET /me`, `PUT /update-profile` |
| `/problems` | `GET /`, `GET /:slug`, `GET /recommended`, `GET /recent`, `POST /create` |
| `/sheets` | `GET /`, `GET /:id`, `GET /sheet-progress`, `POST /` |
| `/progress` | `GET /`, `POST /`, `GET /stats`, `GET /leaderboard` |
| `/submissions` | `POST /`, `GET /` |
| `/stats` | platform sync endpoints, `GET /stored`, `GET /heatmap`, and the Codeforces API test endpoint |
| `/run` | `POST /coderun` |
| `/ai` | `POST /analyze-image`, `POST /chat-continue` |
| `/user` | `POST /upload-profile` |

Routes marked as authenticated require a JWT Bearer token. Upload endpoints use `multipart/form-data`.

## Socket.IO

The server also exposes Socket.IO. Clients register a user with the `register` event; the server tracks active user socket IDs and removes them on disconnect.

## Database

The runtime uses PostgreSQL tables for users, problems, sheets, progress, submissions, platform statistics, and related data. A Prisma schema is included in `prisma/schema.prisma`, but the current API controllers use `pg` queries directly.

## Testing

There is no automated backend test suite configured yet. The `npm test` script is still the default placeholder and exits with an error.

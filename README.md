# CodeCanvas AI

CodeCanvas AI is a comprehensive **DSA learning and problem-solving platform** that aggregates popular coding sheets (Blind 75, Striver SDE Sheet, etc.) into a unified system with an **integrated code compiler, AI-assisted learning, real-time whiteboarding, and advanced progress tracking**.

The platform is designed to eliminate fragmented learning by offering everything a student needs in a single environment: from tracking roadmaps to writing and testing code, understanding concepts via an interactive AI tutor, and visually mapping solutions.

---

# Problem Statement

Many computer science students struggle with **DSA preparation due to scattered resources**.

Students typically jump between:
* Striver SDE Sheet, Blind 75, Neetcode 150
* Various integrated coding environments (LeetCode, GFG)
* Separate drawing tools for conceptualizing algorithms.
* Standalone chatbots for hints and explanations.

CodeCanvas AI unifies this journey by providing:
* A **centralized sheet aggregator** and **duplicate problem mapping**.
* An **integrated Monaco-based Code Compiler**.
* An **interactive Whiteboard** for flow-charting solutions.
* An **AI-powered Learning Assistant** for guided hints, not just plain answers.
* **Gamified Progress Tracking, Leaderboards, and Heatmaps**.

---

# Key Features

## 📚 Integrated Sheet Aggregator (SheetScope)
Combines multiple popular problem sheets into a single platform without duplicate problems. Track your progress across Blind 75, Striver's Sheet, Babbar 450, and custom lists seamlessly.

## 💻 Built-in Code Compiler & Workspace
Practice coding directly on the platform in a fully-featured code editor (Monaco Editor). Compile, run, and test your code without leaving the browser. 

## 🤖 AI Learning Assistant & Code Tutor
Powered by Google Generative AI (Gemini), the AI tutor guides you through hints progressively:
1. **Observation Hint**: Identifying patterns.
2. **Strategy Hint**: Approach design.
3. **Pseudocode / Code Review**: Analyzing your current editor context.

## 🎨 Real-time Whiteboard & Diagrammatic Reasoning
Built-in TLDraw whiteboard allows users to mock up recursive trees, graphs, and system architectures right next to their code. Use AI diagram parsing (coming soon/in-beta) and review your structural diagrams!

## 📈 Analytics, Gamification & Heatmaps
* **Activity Heatmap**: Visualize daily coding streaks (similar to GitHub).
* **Global Leaderboards**: Check podium rankings and compete with peers.
* **Platform Stats**: Track language usage, accuracy, and difficulty progression via interactive charts.

## 💬 Community Discussions & Real-time Notifications
* **Live WebSockets**: Powered by Socket.io for instant notifications and real-time updates.
* **Discussion Forums**: Ask questions, share approaches, and discuss optimizations for specific problems.

---

# Tech Stack

## Frontend
* **Core**: React 19 (Vite) & React Router v7
* **Editor & Diagrams**: Monaco Editor (@monaco-editor/react), TLDraw
* **Styling & Visualization**: TailwindCSS v4, Recharts, Lucide React
* **State & Networking**: Axios, Socket.io-Client, React Google OAuth

## Backend
* **Serverless / API**: Node.js & Express.js
* **Database**: PostgreSQL with **Prisma ORM**
* **AI Integration**: Google Generative AI / GenAI (Gemini SDK)
* **Real-time Engine**: Socket.io
* **Security & Auth**: JWT, Bcrypt, Google Auth Library
* **Media & Uploads**: Cloudinary, Multer

---

# System Architecture

`	ext
Frontend (React + Vite + Tailwind 4)
│
├── Workspace View (Monaco Editor & TLDraw Whiteboard)
│
├── WebSocket Hub (Real-time events, Leaderboard, Notifications)
│
└── REST API (Axios instance)
      ▼
Backend (Node.js + Express + Prisma)
│
├── External Services (Google GenAI, Cloudinary)
│
└── PostgreSQL Database
`

---

# Database Schema Overview

The database is designed around **canonical problem mapping** and a rich learning ecosystem.

Main entities:
* **Users**: General profiles, streaks, and gamification tracking.
* **Problems & Sheets**: Master directory of canonical problems mapped uniquely to curated sheets.
* **Progress**: Granular tracking across states (Not Started, Attempted, Solved).
* **Submissions & Runcodes**: Stores user code executions.
* **Discussions & Notifications**: Relational systems for community Q&A and alerts.

---

# Getting Started

## Prerequisites
* Node.js (v18+)
* PostgreSQL
* Redis (if strictly using BullMQ/rate limits later)

## Installation

1. Clone the repository:
   `ash
   git clone https://github.com/VivekSaini2005/codecanvas-ai.git
   cd codecanvas-ai
   `

2. Install backend dependencies & start server:
   `ash
   cd Backend
   npm install
   # Set up .env with DATABASE_URL, GEMINI_API_KEY, JWT_SECRET, CLOUDINARY details
   npx prisma generate
   npx prisma db push
   node src/index.js
   `

3. Install frontend dependencies & run locally:
   `ash
   cd ../frontend
   npm install
   # Set up .env with VITE_API_URL, Google Client ID, etc.
   npm run dev
   `

---

# Long-Term Vision

CodeCanvas AI aims to become the **ultimate operating system for technical growth**, providing a structured environment where students can build algorithmic thinking, map their logic virtually, and prepare meticulously for software engineering interviews.

---

# Author

**Vivek Saini**
Full Stack Developer
[GitHub Profile](https://github.com/VivekSaini2005)

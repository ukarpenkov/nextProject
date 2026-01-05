# Quotes DB 📚✨

A simple full-stack project with:

- Frontend: Next.js 13 (App Router) ⚛️
- Testing: Jest on the frontend ✅
- Backend: Express.js with PostgreSQL 🔙🐘

## Project Structure 🗂️

- `quotes-db-frontend/client/` – Next.js app (components, pages, tests)
- `quotes-db-frontend/server/` – Express API (routes, controllers, services) + Sequelize
- `quotes-db-frontend/server/src/database/` – CSV data and seed scripts 📄
- `quotes-db-frontend/server/docker-compose.yml` – Optional local Postgres via Docker 🐳

## Prerequisites ⚙️

- Node.js 18+
- npm or yarn
- PostgreSQL (local or Docker)

## Setup 🚀

1. Install dependencies

- Frontend:
  - `cd quotes-db-frontend/client`
  - `npm install`
- Backend:
  - `cd ../server`
  - `npm install`

2. Environment variables 🔐

- Frontend (`quotes-db-frontend/client/.env.local`):
  - `NEXT_PUBLIC_API_URL=http://localhost:4000`
- Backend (`quotes-db-frontend/server/.env`):
  - `PORT=4000`
  - `DATABASE_URL=postgres://user:password@localhost:5432/quotes`

3. (Optional) Start PostgreSQL with Docker 🐳

- `cd quotes-db-frontend/server`
- `docker compose up -d`

## Running 🏃

- Frontend (Next.js):
  - `cd quotes-db-frontend/client`
  - `npm run dev` → http://localhost:3000
- Backend (Express):
  - `cd quotes-db-frontend/server`
  - `npm run dev` → http://localhost:4000

## Testing ✅

- Frontend Jest:
  - `cd quotes-db-frontend/client`
  - `npm test`

## Notable Features ⭐

- Quote listing, search, and details 🔎
- Create quotes via UI ✍️
- Form validation and error handling ⚠️
- Toast notifications 🍞

## Tech Stack 🧰

- Next.js, React, CSS Modules/PostCSS
- Jest for unit tests
- Express.js, Sequelize, PostgreSQL
- CSV import utilities

## Scripts (reference) 📜

- Server: `start`, `dev`
- Client: standard Next.js scripts (`dev`, `build`, `start`, `test`)

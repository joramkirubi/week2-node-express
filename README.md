# Week 2 Node/Express API

A small Express API assignment: basic routes, JSON parsing, error handling, a static homepage, and a custom logging middleware.

## Routes

| Method | Path        | Description                                      |
|--------|-------------|---------------------------------------------------|
| GET    | `/`         | Serves the static `public/index.html` page       |
| GET    | `/api`      | Returns plain text `My Week 2 API!`               |
| POST   | `/user`     | Body `{ name, email }` → `Hello, [name]!` (400 if either is missing) |
| GET    | `/user/:id` | Returns `User [id] profile`                        |

Any unmatched route returns a `404` JSON error. Any thrown/passed error is caught by a central error-handling middleware and returned as JSON with a `500` (or custom) status.

## Project structure

```
week2-node-express/
├── server.js
├── middleware/
│   └── logger.js       # custom request logger (bonus requirement)
├── public/
│   └── index.html       # static page served at GET /
├── package.json
├── .env                  # PORT=3000 (not committed — see .env.example)
├── .env.example
└── .gitignore
```

## 1. Run it locally

```bash
npm install
npm start
```

Server runs at `http://localhost:3000` by default (change `PORT` in `.env`).

For auto-restart on file changes during development:

```bash
npm run dev
```

## 2. Test it

**With curl:**

```bash
curl http://localhost:3000/
curl http://localhost:3000/api
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Joram","email":"joram@example.com"}'
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Joram"}'   # expect 400
curl http://localhost:3000/user/42
```

**With Postman:**
1. Create requests for each route above.
2. For `POST /user`, set the Body tab to `raw` → `JSON` and enter `{ "name": "Joram", "email": "joram@example.com" }`.
3. Confirm you get a `400` status when you omit `name` or `email`.

You'll also see each request logged in your terminal, e.g.:

```
[2026-09-17T13:59:17.652Z] GET /
[2026-09-17T13:59:17.666Z] GET /api
```

## 3. Push to GitHub as `week2-node-express`

```bash
cd week2-node-express
git init
git add .
git commit -m "Week 2: Express API with routes, middleware, and error handling"
git branch -M main
git remote add origin https://github.com/<your-username>/week2-node-express.git
git push -u origin main
```

(`.env` is git-ignored on purpose — never commit real secrets. `.env.example` documents the variable for anyone cloning the repo.)

## 4. Deploy (optional, if the assignment asks for a live link)

Any of these work well for a small Express app:

- **Render** (render.com) — free tier, connect your GitHub repo, set build command `npm install` and start command `npm start`, add `PORT` as an env var (Render sets its own `PORT` automatically — Express already respects `process.env.PORT`).
- **Railway** (railway.app) — similar flow, auto-detects Node apps.
- **Vercel** — works for serverless-style Node APIs with a small config tweak if you want to go that route.

After deploying, test the live URL the same way you tested locally with curl/Postman.

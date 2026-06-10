# today-board-api

Minimal FastAPI backend for the Today Board application. Milestone 1 proves the API can run locally and deploy to Render as a Web Service.

## Local Setup

```bash
cd today-board-api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Create a local environment file:

```bash
copy .env.example .env
```

Then edit `.env` and replace `[YOUR-PASSWORD]` in `DATABASE_URL` with your Supabase database password.

## Local Run Command

```bash
uvicorn app.main:app --reload
```

The local API will run at:

```text
http://127.0.0.1:8000
```

## Render Configuration

Create a Render Web Service using this directory as the service root.

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Environment Variables:

```text
DATABASE_URL=postgresql://postgres:<password>@db.mvkqyuqcpascgijgarwm.supabase.co:5432/postgres?sslmode=require
```

## Test URLs

Local:

```text
http://127.0.0.1:8000/
http://127.0.0.1:8000/health
http://127.0.0.1:8000/tasks
http://127.0.0.1:8000/practice-sessions/today
```

Render:

```text
https://your-render-service-url.onrender.com/
https://your-render-service-url.onrender.com/health
https://your-render-service-url.onrender.com/tasks
https://your-render-service-url.onrender.com/practice-sessions/today
```

## Current Scope

This milestone includes an initial read-only database-backed tasks endpoint. Authentication and AI features are planned for future milestones.

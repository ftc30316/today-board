from datetime import date

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Today Board API")

# Allow all origins for the initial deploy milestone.
# Restrict this to the frontend domain before production use.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Today Board API is running"}


@app.get("/health")
def read_health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/practice-sessions/today")
def read_todays_practice_session() -> dict:
    return {
        "team_name": "Evergreen Dynamics",
        "practice_date": date.today().isoformat(),
        "goals": [
            "Review autonomous routine timing",
            "Complete drivetrain inspection",
            "Prepare scouting plan for next event",
        ],
        "attendance": [
            {"name": "Alex", "status": "present"},
            {"name": "Jordan", "status": "present"},
            {"name": "Taylor", "status": "absent"},
            {"name": "Morgan", "status": "late"},
        ],
        "tasks_by_subteam": {
            "Mechanical": [
                {"task": "Tighten intake assembly bolts", "status": "todo"},
                {"task": "Inspect wheel tread wear", "status": "in_progress"},
            ],
            "Programming": [
                {"task": "Tune autonomous path constants", "status": "todo"},
                {"task": "Verify driver station logging", "status": "done"},
            ],
            "Strategy": [
                {"task": "Draft match scouting checklist", "status": "todo"},
                {"task": "Review practice match notes", "status": "done"},
            ],
        },
    }

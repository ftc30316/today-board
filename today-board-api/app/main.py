from datetime import date
import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from psycopg.rows import dict_row

from app.db import get_connection


logger = logging.getLogger(__name__)
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


@app.get("/tasks")
def read_tasks() -> list[dict]:
    try:
        with get_connection() as conn:
            with conn.cursor(row_factory=dict_row) as cursor:
                cursor.execute(
                    """
                    select
                      tasks.id::text as id,
                      tasks.title,
                      tasks.description,
                      tasks.goal,
                      tasks.status,
                      tasks.priority,
                      tasks.due_date,
                      subteams.name as subteam
                    from public.tasks
                    left join public.subteams
                      on subteams.id = tasks.subteam_id
                    order by
                      subteams.display_order,
                      subteams.name,
                      tasks.created_at,
                      tasks.title;
                    """
                )
                tasks = cursor.fetchall()
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Unable to load tasks from database")
        raise HTTPException(
            status_code=500,
            detail=f"Unable to load tasks: {type(exc).__name__}: {exc}",
        ) from exc

    return tasks


@app.get("/students")
def read_students() -> list[dict]:
    try:
        with get_connection() as conn:
            with conn.cursor(row_factory=dict_row) as cursor:
                cursor.execute(
                    """
                    select
                      students.id::text as id,
                      students.first_name,
                      students.first_name as display_name,
                      students.email,
                      students.active
                    from public.students
                    order by
                      students.active desc,
                      students.first_name;
                    """
                )
                students = cursor.fetchall()
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Unable to load students from database")
        raise HTTPException(
            status_code=500,
            detail=f"Unable to load students: {type(exc).__name__}: {exc}",
        ) from exc

    return students


@app.get("/subteams")
def read_subteams() -> list[dict]:
    try:
        with get_connection() as conn:
            with conn.cursor(row_factory=dict_row) as cursor:
                cursor.execute(
                    """
                    select
                      subteams.id::text as id,
                      subteams.name,
                      subteams.display_order
                    from public.subteams
                    order by
                      subteams.display_order,
                      subteams.name;
                    """
                )
                subteams = cursor.fetchall()
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Unable to load subteams from database")
        raise HTTPException(
            status_code=500,
            detail=f"Unable to load subteams: {type(exc).__name__}: {exc}",
        ) from exc

    return subteams


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

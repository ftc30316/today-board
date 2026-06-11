create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.subteams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.students (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  email text null unique,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text null,
  goal text null,
  subteam_id uuid null references public.subteams(id) on delete set null,
  owner_student_id uuid null references public.students(id) on delete set null,
  status text not null default 'open',
  priority text null,
  due_date date null,
  source_system text null,
  source_id text null,
  raw_source_json jsonb null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tasks_status_check check (status in ('open', 'completed', 'archived'))
);

create table public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  practice_date date not null,
  title text not null,
  theme text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.practice_session_goals (
  id uuid primary key default gen_random_uuid(),
  practice_session_id uuid not null references public.practice_sessions(id) on delete cascade,
  goal_text text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.practice_session_tasks (
  id uuid primary key default gen_random_uuid(),
  practice_session_id uuid not null references public.practice_sessions(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint practice_session_tasks_session_task_unique unique (practice_session_id, task_id)
);

create table public.practice_attendance (
  id uuid primary key default gen_random_uuid(),
  practice_session_id uuid not null references public.practice_sessions(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  present boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint practice_attendance_session_student_unique unique (practice_session_id, student_id)
);

create table public.practice_notes (
  id uuid primary key default gen_random_uuid(),
  practice_session_id uuid not null references public.practice_sessions(id) on delete cascade,
  notes_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index tasks_source_system_source_id_unique
on public.tasks (source_system, source_id)
where source_system is not null and source_id is not null;

create index tasks_subteam_id_idx on public.tasks (subteam_id);
create index tasks_owner_student_id_idx on public.tasks (owner_student_id);
create index tasks_status_idx on public.tasks (status);
create index tasks_due_date_idx on public.tasks (due_date);

create index practice_sessions_practice_date_idx on public.practice_sessions (practice_date);

create index practice_session_goals_practice_session_id_idx on public.practice_session_goals (practice_session_id);

create index practice_session_tasks_practice_session_id_idx on public.practice_session_tasks (practice_session_id);
create index practice_session_tasks_task_id_idx on public.practice_session_tasks (task_id);

create index practice_attendance_practice_session_id_idx on public.practice_attendance (practice_session_id);
create index practice_attendance_student_id_idx on public.practice_attendance (student_id);

create index practice_notes_practice_session_id_idx on public.practice_notes (practice_session_id);

create trigger set_subteams_updated_at
before update on public.subteams
for each row
execute function public.set_updated_at();

create trigger set_students_updated_at
before update on public.students
for each row
execute function public.set_updated_at();

create trigger set_tasks_updated_at
before update on public.tasks
for each row
execute function public.set_updated_at();

create trigger set_practice_sessions_updated_at
before update on public.practice_sessions
for each row
execute function public.set_updated_at();

create trigger set_practice_session_goals_updated_at
before update on public.practice_session_goals
for each row
execute function public.set_updated_at();

create trigger set_practice_session_tasks_updated_at
before update on public.practice_session_tasks
for each row
execute function public.set_updated_at();

create trigger set_practice_attendance_updated_at
before update on public.practice_attendance
for each row
execute function public.set_updated_at();

create trigger set_practice_notes_updated_at
before update on public.practice_notes
for each row
execute function public.set_updated_at();

insert into public.subteams (name, display_order)
values
  ('Strategy', 10),
  ('Design', 20),
  ('Build', 30),
  ('Code', 40),
  ('Drive', 50),
  ('Outreach', 60)
on conflict (name) do nothing;

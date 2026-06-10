with task_seed (subteam_name, title, description) as (
  values
    (
      'Outreach',
      'Benton Franklin County Fair Outreach Plan',
      'Develop outreach plan for Benton Franklin County Fair including booth layout, activities, volunteer schedule, and setup checklist. Note: this task currently appears to have no Outreach label, even though it belongs here.'
    ),
    (
      'Outreach',
      'STEM Camp Plan',
      'Plan and document a STEM camp including agenda, activities, supply list, budget estimate, and marketing flyer.'
    ),
    (
      'Outreach',
      'Team Website',
      'Design, build, and publish the Evergreen Dynamics team website with core content and navigation.'
    ),
    (
      'Outreach',
      'Branch Out 50/50 Meeting',
      'Conduct a Branch Out 50/50 meeting with another FTC team and document lessons learned.'
    ),
    (
      'Outreach',
      'Benton REA Sponsorship Materials',
      'Create sponsorship request materials customized for Benton REA.'
    ),
    (
      'Outreach',
      'Cadwell Industries Sponsorship Materials',
      'Create sponsorship request materials customized for Cadwell Industries.'
    ),
    (
      'Code',
      'Limelight AprilTag Demo',
      'Create FTC code demonstrating AprilTag detection with Limelight and telemetry output.'
    ),
    (
      'Code',
      'Sensor Test Suite OpMode',
      'Develop a sensor test suite OpMode that validates FTC sensors and displays telemetry results.'
    ),
    (
      'Strategy',
      'Autonomous Strategy Research',
      'Analyze successful FTC autonomous routines and present recommendations for Evergreen Dynamics autonomous strategy.'
    ),
    (
      'Design',
      'Quick-Release Hardware Module',
      'Design and prototype a quick-release hardware module with mounting standard and installation guide.'
    ),
    (
      'Design',
      'Parallel Plate Chassis',
      'Design a parallel plate FTC chassis including CAD model, fabricated plates, and rolling chassis assembly.'
    ),
    (
      'Build',
      'Robot Cart',
      'Build a robot cart with organized storage for tools, batteries, parts, and robot transport.'
    ),
    (
      'Drive',
      'Driver Skills Combine',
      'Create a Driver Skills Combine including two driver challenges, scoring system, and team leaderboard.'
    )
)
insert into public.tasks (title, description, subteam_id, status)
select
  task_seed.title,
  task_seed.description,
  subteams.id,
  'open'
from task_seed
join public.subteams subteams
  on subteams.name = task_seed.subteam_name
where not exists (
  select 1
  from public.tasks existing_task
  where existing_task.title = task_seed.title
);

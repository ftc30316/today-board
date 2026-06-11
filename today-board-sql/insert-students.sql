insert into public.students (first_name)
select student.first_name
from (
  values
    ('Lucy'),
    ('Isaac'),
    ('Bianca'),
    ('Adi'),
    ('Sami'),
    ('Samuel'),
    ('Krithi'),
    ('Leo'),
    ('Easton'),
    ('Aadhya')
) as student(first_name)
where not exists (
  select 1
  from public.students existing_student
  where existing_student.first_name = student.first_name
);

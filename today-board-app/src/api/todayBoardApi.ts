import type { AiTaskSuggestion, PracticeGoal, Student, Subteam, Task } from '../types/todayBoard'

export const subteams: Subteam[] = ['Strategy', 'Design', 'Build', 'Code', 'Drive', 'Outreach']

export const mockStudents: Student[] = [
  { id: 'lucy', name: 'Lucy' },
  { id: 'adi', name: 'Adi' },
  { id: 'sami', name: 'Sami' },
  { id: 'bianca', name: 'Bianca' },
  { id: 'aadhya', name: 'Aadhya' },
  { id: 'samuel', name: 'Samuel' },
  { id: 'leo', name: 'Leo' },
  { id: 'easton', name: 'Easton' },
  { id: 'krithi', name: 'Krithi' },
  { id: 'isaac', name: 'Isaac' },
]

export const mockPracticeGoals: PracticeGoal[] = [
  { id: 'goal-apriltag', text: 'Validate AprilTag detection with Limelight' },
  { id: 'goal-chassis', text: 'Review chassis design direction' },
  { id: 'goal-outreach', text: 'Finalize Benton Franklin Fair outreach plan' },
  { id: 'goal-readiness', text: 'Identify robot readiness blockers before cleanup' },
]

export const mockBacklogTasks: Task[] = [
  {
    id: 'solidworks-license',
    title: 'Get the SolidWorks license',
    subteam: 'Design',
    goal: 'Confirm CAD tooling is ready for chassis and module design.',
  },
  {
    id: 'limelight-apriltag',
    title: 'Create FTC code demonstrating AprilTag detection with Limelight',
    subteam: 'Code',
    goal: 'Prove camera detection works in an OpMode before path planning starts.',
    dueDate: 'Jun 18',
  },
  {
    id: 'sensor-test-suite',
    title: 'Develop a sensor test suite OpMode',
    subteam: 'Code',
    goal: 'Give the team a repeatable way to validate sensors during practice.',
  },
  {
    id: 'autonomous-analysis',
    title: 'Analyze successful FTC autonomous routines',
    subteam: 'Strategy',
    goal: 'Extract patterns the team can use for this season strategy.',
  },
  {
    id: 'quick-release-module',
    title: 'Design and prototype a quick-release hardware module',
    subteam: 'Build',
    goal: 'Test a serviceable module pattern for fast pit repairs.',
  },
  {
    id: 'parallel-plate-chassis',
    title: 'Design a parallel plate FTC chassis',
    subteam: 'Design',
    goal: 'Compare chassis tradeoffs and decide what to prototype next.',
  },
  {
    id: 'robot-cart',
    title: 'Build a robot cart',
    subteam: 'Build',
    goal: 'Create a safer way to move the robot and battery station at events.',
  },
  {
    id: 'fair-outreach-plan',
    title: 'Develop outreach plan for Benton Franklin County Fair',
    subteam: 'Outreach',
    goal: 'Define staffing, materials, and demo flow for the fair booth.',
    dueDate: 'Jun 21',
  },
  {
    id: 'stem-camp',
    title: 'Plan and document a STEM camp',
    subteam: 'Outreach',
    goal: 'Capture camp scope, schedule, materials, and volunteer needs.',
  },
  {
    id: 'branch-out-meeting',
    title: 'Conduct a Branch Out 50/50 meeting',
    subteam: 'Strategy',
    goal: 'Clarify partnership next steps and document action items.',
  },
  {
    id: 'benton-rea-sponsor',
    title: 'Create sponsorship request materials for Benton REA',
    subteam: 'Outreach',
    goal: 'Prepare a focused sponsor ask with team impact and budget needs.',
  },
  {
    id: 'driver-skills-combine',
    title: 'Create a Driver Skills Combine',
    subteam: 'Drive',
    goal: 'Design repeatable drills for evaluating and improving driver control.',
  },
]

export const initialTodayTaskIds = [
  'limelight-apriltag',
  'parallel-plate-chassis',
  'fair-outreach-plan',
  'driver-skills-combine',
]

export function getMockAiSuggestions(
  presentStudentCount: number,
  selectedTaskIds: string[],
): AiTaskSuggestion[] {
  const selected = new Set(selectedTaskIds)
  const suggestions: AiTaskSuggestion[] = [
    {
      taskId: 'sensor-test-suite',
      reason: `Code students are present, and this supports upcoming autonomous work with ${presentStudentCount} students available.`,
      confidence: 'High',
    },
    {
      taskId: 'robot-cart',
      reason: 'Build has several students present, and the robot cart is a good parallel work item.',
      confidence: 'Medium',
    },
    {
      taskId: 'benton-rea-sponsor',
      reason: 'Outreach has limited selected work today, and sponsorship materials unblock funding conversations.',
      confidence: 'Medium',
    },
    {
      taskId: 'autonomous-analysis',
      reason: 'Strategy can turn autonomous research into concrete requirements for Code and Drive.',
      confidence: 'High',
    },
  ]

  return suggestions.filter((suggestion) => !selected.has(suggestion.taskId))
}

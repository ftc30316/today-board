export type Student = {
  id: string
  name: string
}

export type Subteam = 'Strategy' | 'Design' | 'Build' | 'Code' | 'Drive' | 'Outreach'

export type Task = {
  id: string
  title: string
  subteam: Subteam
  goal: string
  dueDate?: string
}

export type PracticeGoal = {
  id: string
  text: string
}

export type AiTaskSuggestion = {
  taskId: string
  reason: string
  confidence: 'High' | 'Medium'
}

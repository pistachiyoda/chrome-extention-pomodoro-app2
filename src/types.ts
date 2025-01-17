export type TimerState = 'idle' | 'running' | 'paused' | 'finished'
export type Task = {
  id: number
  isCompleted: boolean
  isInProgress: boolean
  content: string
  plan: number
  actual: number
}

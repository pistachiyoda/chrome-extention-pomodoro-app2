export type TimerState = 'idle' | 'running' | 'paused' | 'finished'
export type Task = {
  id: number
  content: string
  isCompleted: boolean
}

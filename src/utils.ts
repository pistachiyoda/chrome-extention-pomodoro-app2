import type { Task } from './types'

export const getStoredTaskList = (): Task[] => {
  try {
    const stored = localStorage.getItem('taskList')
    if (!stored) return []
    return JSON.parse(stored)
  } catch (error) {
    console.error(error)
    return []
  }
}

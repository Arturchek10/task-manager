// fetch запросы

import {Task} from "../types/types"

const BASE_URL = import.meta.env.VITE_API_URL


export async function fetchTasks(){
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "GET"
  })
  if (!res.ok) throw new Error("Ошибка при загрузке задач")
  return await res.json()
}

export async function getTasksByDate() {
  const res = await fetch(`${BASE_URL}/`)
}

export async function createTask(task: Task){
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(task)
  })
  if (!res.ok) throw new Error("Не удалось добавить задачу")
  return await res.json() 
}

export async function updateTask(task: Task){
  const res = await fetch(`${BASE_URL}/tasks/${task.id}`,{
    method: "PATCH",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(task)
  })
  if (!res.ok) {
    throw new Error("не удалось обновить задачу")
  }
  try {
    return await res.json()
  } catch {
    return task
  }
}

export async function deleteTask(id: number){
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Не удалось удалить задачу")
  try {
    return await res.json()
  } catch {
    return (id)
  }
}
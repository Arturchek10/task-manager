// fetch запросы

import {Task} from "../types/types"

export async function fetchTasks(){
  const res = await fetch("http://localhost:3000/tasks", {
    method: "GET"
  })
  if (!res.ok) throw new Error("Ошибка при загрузке задач")
  return await res.json()
}

export async function getTasksByDate() {
  const res = await fetch("http://localhost:3000/")
}

export async function createTask(task: Task){
  const res = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(task)
  })
  if (!res.ok) throw new Error("Не удалось добавить задачу")
  return await res.json() 
}

export async function updateTask(task: Task){
  const res = await fetch(`http://localhost:3000/tasks/${task.id}`,{
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
  const res = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Не удалось удалить задачу")
  try {
    return await res.json()
  } catch {
    return (id)
  }
}
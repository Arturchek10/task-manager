import { createStore, createEffect } from "effector";
import {Task} from "../types/types"
import * as api from "./api"

// асинхронные эффекты для работы с фетч запросами
export const fetchTasksFn = createEffect(api.fetchTasks)
export const createTaskFn = createEffect(api.createTask)
export const updatedTaskFn = createEffect(api.updateTask)
export const deleteTaskFn = createEffect(async (id: number) => {
  await api.deleteTask(id)
  return id
})

// хранилище задач     
export const $tasks = createStore<Task[]>([])
// привязки для обновления
  .on(fetchTasksFn.doneData, (_, tasks) =>  tasks)
  .on(createTaskFn.doneData, (prev, newTask) => [...prev, newTask])
  .on(updatedTaskFn.doneData, (prev, updatedTask) => {
    return prev.map((task) => task.id === updatedTask.id ? updatedTask : task)
  })
  .on(deleteTaskFn.doneData, (prev, id) => {
    return prev.filter((task) => task.id !== id)
  })

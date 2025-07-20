import { createStore, createEvent } from "effector";
import { useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tag: string;
};
// все таски

const savedAllTasks = localStorage.getItem("allTasks");
let initialAllTasks: Task[] = [];

if (savedAllTasks) {
  try {
    initialAllTasks = JSON.parse(savedAllTasks);
  } catch (e) {
    console.error("ошибка при чтении задач из localStorage", e);
  }
} else {
  initialAllTasks = [
    {
      id: 1,
      title: "Task 1",
      description:
        "Task 1 descriptionTask 1 descriptionTask 1 descriptionTask 1 description descriptionTask 1 descriptiondescriptionTask 1 descriptiondescriptionTask 1 description",
      status: "To Do",
      priority: "low",
      tag: "Test",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Task 2 description",
      status: "In Process",
      priority: "medium",
      tag: "Feature",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Task 3 description",
      status: "In Process",
      priority: "medium",
      tag: "Feature",
    },
    {
      id: 4,
      title: "Task 4",
      description: "Task 4 description",
      status: "Done",
      priority: "medium",
      tag: "Feature",
    },
    {
      id: 5,
      title: "Task 5",
      description: "Task 5 description",
      status: "To Do",
      priority: "medium",
      tag: "Feature",
    },
    {
      id: 6,
      title: "Task 6",
      description: "Task 5 description",
      status: "To Do",
      priority: "medium",
      tag: "Feature",
    },
  ];
}

export const updateTask = createEvent<Task>();
export const addTask = createEvent<Task>();
export const deleteTask = createEvent<Task>();

export const $allTasks = createStore<Task[]>(initialAllTasks);

$allTasks
  .on(updateTask, (allTasks: Task[], updatedTask: Task) =>
    allTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
  )
  .on(addTask, (allTasks, newTask) => [...allTasks, newTask])
  .on(deleteTask, (allTasks, deletedTask) => {
    return allTasks.filter((task) => task.id !== deletedTask.id);
  });

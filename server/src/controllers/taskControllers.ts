// логика
import { Response, Request } from "express";
import { tasks, Task } from "../data/tasks";
import dayjs from "dayjs";


export const createTask = (req: Request, res: Response) => {
  const {title, description, status, priority, tag } = req.body;
  if (title.trim().length === 0){
    res.status(400).json({error: "Invalid title"})
  }
  const newTask: Task = {
    id: Number(Date.now()),
    title: title,
    description: description,
    status: status,
    priority: priority,
    tag: tag,
    date: dayjs().format("DDMMM YYYY")
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const task = tasks.find((task) => task.id === id)
  const {title, description, status, priority, tag} = req.body
  if (!task) return res.status(404).json({ error : "Задача не найдена "})

  if (typeof(title) === "string" && title.length > 0 && title.length <= 25 ) task.title = title
  if (typeof(description) === "string") task.description = description
  if (typeof(status) === "string") task.status = status
  if (typeof(priority) === "string") task.priority = priority
  if (typeof(tag) === "string") task.tag = tag
  res.status(201).json(task)
}

export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const taskIndex = tasks.findIndex((task) => task.id === id)
  if (taskIndex !== -1){
    tasks.splice(taskIndex, 1)
  } else {
    res.status(404).json({error : "Задача не найдена"})
  }
  res.json({message : "Задача удалена"})
}
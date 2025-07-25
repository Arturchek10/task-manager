// роуты
import express from 'express'
import {updateTask, deleteTask, createTask} from "../controllers/taskControllers"
import { tasks } from '../data/tasks'
const router = express.Router()

// когда приходит http запрос по данным маршрутам, вызывается функция и туда автоматически
// передается объект запроса(req) и объект ответа(res)

router.get("/", (req, res) => {
  const {title, date} = req.query
  let result = tasks
  if (title && typeof title === "string"){
    result = result.filter((task) => task.title.toLowerCase().includes(title.toLowerCase()))
  }
  if (date && typeof date === "string"){
    result = result.filter((task) => task.date.startsWith(date))
  }
  res.json(result)
})  
router.post("/", (req, res) => createTask(req,res))
router.patch("/:id", (req, res) => updateTask(req,res))
router.delete("/:id",(req,res) => deleteTask(req,res))

export default router
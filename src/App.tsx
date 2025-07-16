import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import TaskList from "./assets/components/TaskList/TaskList";
import styles from "./App.module.css";
import EditTaskPage from "./assets/pages/EditTaskPage/EditTaskPage";
import { useState } from "react";
export default function App() {
  type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    tag: string;
  };

  const [allTasks, setAllTasks] = useState<Task[]>([
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
  ]);

  function updateTask(updatedTask: Task){
    setAllTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)))
  }

  function addTask(newTask: Task){
    setAllTasks(prev => [...prev, newTask])
  }

  return (
    <BrowserRouter>
      <div className={styles.main}>
        <Header />
        <div className={styles["list-wrapper"]}>
          <Routes>
            <Route path="/" element={<TaskList allTasks={allTasks} addTask={addTask} />} />
            <Route path="/task/:id" element={<EditTaskPage allTasks={allTasks} updateTask={updateTask}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

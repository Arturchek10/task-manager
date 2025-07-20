import { useState } from "react";
import Column from "../Column/Column";
import styles from "./TaskList.module.css";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tag: string;
};

type TaskListProps = {
  allTasks: Task[];
  addTask: (newTask: Task) => void
};

export default function TaskList({ allTasks, addTask }: TaskListProps) {
  const categories: string[] = ["To Do", "In Process", "Done"];

  // выбранная для редактирования
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  return (
    <>
      {categories.map((category) => (
        <Column
          key={category}
          value={category}
          tasks={allTasks.filter((task) => task.status === category)}
          editTask={setSelectedTask}
          addTask={addTask}
        />
      ))}
    </>
  );
}

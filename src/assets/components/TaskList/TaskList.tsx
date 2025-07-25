import { useState } from "react";
import Column from "../Column/Column";
import {Task} from "../../features/types/types"

export default function TaskList() {

  const categories: string[] = ["To Do", "In Process", "Done"];

  // выбранная для редактирования
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  return (
    <>
      {categories.map((category) => (
        <Column
          key={category}
          value={category}
          editTask={setSelectedTask}
        />
      ))}
    </>
  );
}

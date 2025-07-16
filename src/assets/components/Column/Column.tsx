import styles from "./Column.module.css";
import Card from "../Card/Card";
import PlusSvg from "../../../assets/svg/plus.svg?react";
import { useState } from "react";
import { Button } from "@mui/material";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tag: string;
};

type ColumnProps = {
  value: string;
  tasks: Task[];
  editTask: (task: Task) => void;
  addTask: (newTask: Task) => void;
};

const InputForm = ({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}) => (
  <>
    <textarea
      className={styles["add-task-area"]}
      placeholder="Enter a title of new task"
      value={value}
      onChange={onChange}
    />
    <Button variant="contained" size="large" fullWidth onClick={onSubmit} style={{margin:"6px"}}>
      добавить
    </Button>
  </>
);

export default function Column({
  value,
  tasks,
  editTask,
  addTask,
}: ColumnProps) {
  const [inputFormActive, setInputFormActive] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>("");

  function handleAddTask() {
    const newTask: Task = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: "",
      status: value,
      priority: "low",
      tag: "default",
    };

    addTask(newTask);
    setTaskTitle("");
    setInputFormActive(false);
  }

  return (
    <div className={styles["column-main"]} onClick={() => {
      setInputFormActive(false)
      setTaskTitle("")
      }}>
      <div>
        <p className={styles.title}>{value}</p>
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            editTask={() => editTask(task)}
            
          />
        ))}
      </div>

      <div className={styles["add-task-form"]} onClick={(e) => e.stopPropagation()}>
        {inputFormActive && (
          <InputForm
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onSubmit={handleAddTask}
          />
        )}
        {!inputFormActive && (
          <Button
            fullWidth
            size="large"
            onClick={() => setInputFormActive(!inputFormActive)}
          >
            <PlusSvg stroke="#3D3E38" width="25px" height="25px" />
            <p>add new task</p>
          </Button>
        )}
      </div>
    </div>
  );
}

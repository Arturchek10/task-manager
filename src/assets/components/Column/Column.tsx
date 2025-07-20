import styles from "./Column.module.css";
import Card from "../Card/Card";
import PlusSvg from "../../../assets/svg/plus.svg?react";
import { useState } from "react";
import { Button } from "@mui/material";
import { $isDarkTheme } from "@/assets/store/theme";
import { useUnit } from "effector-react";
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
      add
    </Button>
  </>
);

export default function Column({
  value,
  tasks,
  editTask,
  addTask,
}: ColumnProps) {


  const [inputFormActive, inputFormHandler] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const isDark = useUnit($isDarkTheme)
  // добавление задачи только с title внизу колонки
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
    inputFormHandler(false)
  }

  return (
    <div className={`${styles["column-main"]} ${isDark === "light" ? "" :  styles["column-main-dark"]}`} onClick={() => {
      inputFormHandler(false)
      setTaskTitle("")
      }}>
      <div>
        <p className={styles.title}>{value}</p>
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            editTaskProp={editTask}
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
            onClick={() => inputFormHandler(!inputFormActive)}
            sx={{
              "&.MuiButtonBase-root": {
                backgroundColor: isDark === "dark" ? "rgba(4, 21, 93, 0.4)" : "rgba(11, 57, 245, 0.04)",
                height: "50px",
                margin: "10px",
                borderRadius: "20px",
              }
            }}
          >
            <PlusSvg stroke={ isDark === "dark" ? "#1976D2" :"#3D3E38"} width="25px" height="25px" />
            <p style={{margin: "10px"}}>add new task</p>
          </Button>
        )}
      </div>
    </div>
  );
}

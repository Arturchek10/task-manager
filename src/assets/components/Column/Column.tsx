import styles from "./Column.module.css";
import Card from "../Card/Card";
import PlusSvg from "../../../assets/svg/plus.svg?react";
import { useState } from "react";
import { Button } from "@mui/material";
import { $isDarkTheme } from "@/assets/features/store/theme";
import { useUnit } from "effector-react";
import { $tasks, createTaskFn } from "../../features/tasks/tasks";
import {Task} from "../../features/types/types"
import dayjs from "dayjs";

type ColumnProps = {
  value: string;
  editTask: (task: Task) => void;
};

const symbolsCounter = (value: string) => {
  let counter = `${value.length}/25`
  return counter
}


// появляющаяся форма для ввода названия
const InputForm = ({
  value,
  onChange,
  onSubmit,
  isDark,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isDark: string
}) => (
  <>
    <textarea
      className={styles["add-task-area"]}
      placeholder="Enter a title of new task"
      value={value}
      onChange={onChange}
      maxLength={25}
    />
    <p className={`${styles["symbol-counter"]} ${
      isDark === "light" ? "" : styles["symbol-counter-dark"]
    }`}>
      {symbolsCounter(value)}
    </p>
    <Button
      variant="contained"
      size="large"
      fullWidth
      onClick={onSubmit}
      style={{ margin: "6px" }}
    >
      add
    </Button>
  </>
);

export default function Column({ value, editTask }: ColumnProps) {
  const [inputFormActive, inputFormHandler] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const isDark = useUnit($isDarkTheme);
  const [tasks,addTask]= useUnit([$tasks,createTaskFn]);

  function handleAddTask() {
    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      description: "",
      status: value,
      priority: "none",
      tag: "Feature",
      date: dayjs().format("DDMMM YYYY")
    };
    addTask(newTask)
    setTaskTitle("");
  }

  return (
    <div
      className={`${styles["column-main"]} ${
        isDark === "light" ? "" : styles["column-main-dark"]
      }`}
      onClick={() => {
        inputFormHandler(false);
        setTaskTitle("");
      }}
    >
      <div>
        <p className={styles.title}>{value}</p>
        {tasks
          .filter((task) => task.status === value)
          .map((task) => (
            <Card key={task.id} task={task} editTaskProp={editTask} />
          ))
        }
      </div>

      <div
        className={styles["add-task-form"]}
        onClick={(e) => e.stopPropagation()}
      >
        {inputFormActive && (
          <InputForm
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onSubmit={handleAddTask}
            isDark={isDark}
          />
        )}
        {!inputFormActive && (
          <Button
            fullWidth
            size="large"
            onClick={() => inputFormHandler(!inputFormActive)}
            sx={{
              "&.MuiButtonBase-root": {
                backgroundColor:
                  isDark === "dark"
                    ? "rgba(4, 21, 93, 0.4)"
                    : "rgba(11, 57, 245, 0.04)",
                height: "50px",
                margin: "10px",
                borderRadius: "20px",
              },
            }}
          >
            <PlusSvg
              stroke={isDark === "dark" ? "#1976D2" : "#3D3E38"}
              width="25px"
              height="25px"
            />
            <p style={{ margin: "10px" }}>add new task</p>
          </Button>
        )}
      </div>
    </div>
  );
}

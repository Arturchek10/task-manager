import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import styles from "./EditTaskPage.module.css";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tag: string;
};

type EditTasksProps = {
  allTasks: Task[];
  updateTask: (updatedTask: Task) => void;
};

export default function EditTaskPage({ allTasks, updateTask }: EditTasksProps) {
  // по :id в пути узнаем на какой мы задаче находимся
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  // находим в массиве всех задач ту на которую мы нажали
  const task = allTasks.find((task) => task.id === Number(id));

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [tag, setTag] = useState(task?.tag || "");

  const allPrioity = ["low", "medium", "high"];
  const allTags = ["Bug", "Feature", "Docs", "Test", "Refactor"];
  function handleSave() {
    if (!task) {
      console.error("задача не выбрана");
      return;
    }
    if (!title.trim) {
      console.error("введите название");
      return;
    }

    try {
      const updatedTask: Task = {
        ...task,
        title: title.trim(),
        description: description.trim(),
        priority: priority,
      };
      updateTask(updatedTask);
      navigate("/");
    } catch {
      console.error("ошибка при сохранении задачи");
    }
  }

  return (
    <div className={styles["edit-form"]}>
      <h1>Редактирование задачи</h1>
      <label>
        <p>Enter title for task</p>
        <Input
          fullWidth
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles["title-input"]}
        />
      </label>
      <label>
        <p>Enter description for task</p>
        <Input
          fullWidth
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        <p>Enter tag for task</p>
        <Autocomplete
          disablePortal
          value={tag}
          options={allTags}
          renderInput={(params) => (
            <TextField {...params} label="tag"></TextField>
          )}
          onChange={(e, newVal: string | null) => setTag(newVal ?? "")}
        />
      </label>

      <label>
        <p>Enter priority for task</p>
        <Autocomplete
          disablePortal
          value={priority}
          options={allPrioity}
          renderInput={(params) => (
            <TextField {...params} label="priority"></TextField>
          )}
          onChange={(e, newVal: string | null) => setPriority(newVal ?? "")}
        />
      </label>
      <div className={styles["btn-div"]}>
        <Button variant="contained" color="error" onClick={() => navigate("/")}>
          Отменить
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!title.trim()}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

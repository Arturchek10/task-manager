import styles from "./Card.module.css";
import TrashIcon from "../../svg/trash.svg?react";
import { Link } from "react-router-dom";
import { useUnit } from "effector-react";
import { deleteTaskFn } from "../../features/tasks/tasks";
import { $isDarkTheme } from "@/assets/features/store/theme";
import {Task} from "../../features/types/types"

type CardProps = {
  task: Task;
  editTaskProp: (task: Task) => void;
};

export default function Card({ task, editTaskProp }: CardProps) {
  const isDark = useUnit($isDarkTheme);

  function handleDelete(id: number){
    deleteTaskFn(id).catch((err) => {
      alert(err)
    })
  }
  return (
    <Link
      to={`/task/${task.id}`}
      className={styles["card-link"]}
      onClick={() => editTaskProp(task)}
    >
      <div
        className={`${styles["card-main"]} ${
          isDark === "light" ? "" : styles["dark-card"]
        }`}
      >
        <div className={styles["title-description-div"]}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              className={`${styles["task-title"]} ${
                isDark === "light" ? "" : styles["title-dark"]
              }`}
            >
              {task.title}
            </p>
            <p className={`${styles["task-date"]} ${
              isDark === "light" ? "" : styles["task-date-dark"]
            }`}>
              {task.date}
            </p>
            <TrashIcon
              className={styles["edit-icon"]}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(task.id);
              }}
            />
          </div>

          <p
            className={`${styles["task-description"]} ${
              isDark === "light" ? "" : styles["description-dark"]
            }`}
          >
            {task.description}
          </p>
        </div>

        <div className={styles.info}>
          <div className={styles["wrapper"]} style={{ background: "yellow" }}>
            <p>{task.priority}</p>
          </div>
          <div className={styles["wrapper"]} style={{ background: "#BCFFDB" }}>
            <p>{task.status}</p>
          </div>
          <div className={styles["wrapper"]} style={{ background: "#8A84E2" }}>
            <p>{task.tag}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

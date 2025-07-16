import styles from "./Card.module.css";
import EditIcon from "../../svg/edit.svg?react";
import { Link } from "react-router-dom";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tag: string;
};

type CardProps = {
  task: Task;
  editTask: () => void;
};

export default function Card({ task, editTask}: CardProps) {
  return (
    <Link to={`/task/${task.id}`} style={{ textDecoration: "none" }}>
      <div className={styles["card-main"]}>
        <div className={styles["title-description-div"]}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className={styles["task-title"]}>{task.title}</p>

            <EditIcon className={styles["edit-icon"]} />
          </div>

          <p className={styles["task-description"]}>{task.description}</p>
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

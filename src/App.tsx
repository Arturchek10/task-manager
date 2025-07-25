import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import TaskList from "./assets/components/TaskList/TaskList";
import styles from "./App.module.css";
import EditTaskPage from "./assets/pages/EditTaskPage/EditTaskPage";
import { useUnit } from "effector-react";
import { $isDarkTheme } from "./assets/features/store/theme";
import { useEffect } from "react";
import { fetchTasksFn, $tasks, createTaskFn} from "./assets/features/tasks/tasks";

export default function App() {
  
  const [tasks, fetchTasks] = useUnit([$tasks, fetchTasksFn])
  const [isDark] = useUnit([$isDarkTheme]);
  // сохранение в localStorage темы при изменении стора isDark
  useEffect(() => {
    localStorage.setItem("theme", isDark);
  }, [isDark]);

  // загрузка задач с сервера
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <BrowserRouter>
      <div
        className={`${styles.main} ${
          isDark === "light" ? "" : styles["dark-main"]
        }`}
      >
        <Header />
        <div
          className={`${styles["list-wrapper"]} ${
            isDark === "light" ? "" : styles["dark-wrapper"]
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={<TaskList />}
            />
            <Route
              path="/task/:id"
              element={<EditTaskPage allTasks={tasks} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

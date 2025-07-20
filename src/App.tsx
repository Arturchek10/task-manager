import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import TaskList from "./assets/components/TaskList/TaskList";
import styles from "./App.module.css";
import EditTaskPage from "./assets/pages/EditTaskPage/EditTaskPage";
import { useUnit } from "effector-react";
import { $allTasks, addTask, updateTask } from "./assets/store/tasks";
import { $isDarkTheme } from "./assets/store/theme";
import { useEffect } from "react";

export default function App() {
  type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    tag: string;
  };

  const [allTasks, addTaskFn, updateTaskFn] = useUnit([
    $allTasks,
    addTask,
    updateTask,
  ]);
  const [isDark] = useUnit([$isDarkTheme]);
  // сохранение в localStorage темы при изменении стора isDark
  useEffect(() => {
    localStorage.setItem("theme", isDark);
  }, [isDark]);

  return (
    <BrowserRouter>
      {/* <div className={`${styles.main} ${isDark ? styles["dark-main"] : ""}`}> */}
      <div className={`${styles.main} ${isDark === "light" ? "" : styles["dark-main"]}`}>
        <Header />
        <div
          className={`${styles["list-wrapper"]} ${ isDark === "light" ? "" : styles["dark-wrapper"]}`}
        >
          <Routes>
            <Route
              path="/"
              element={<TaskList allTasks={allTasks} addTask={addTaskFn} />}
            />
            <Route
              path="/task/:id"
              element={
                <EditTaskPage allTasks={allTasks} updateTask={updateTaskFn} />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

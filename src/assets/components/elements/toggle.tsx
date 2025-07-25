import styles from "./toogle.module.css";
import { $isDarkTheme, toggleTheme } from "../../features/store/theme";
import { useUnit } from "effector-react";

export default function Toggle() {
  const [isDark, toggle] = useUnit([$isDarkTheme, toggleTheme]);

  return (
    <div className={styles["toggle-div"]}>
      <p>theme</p>
      <input
        type="checkbox"
        id="darkmode-toggle"
        className={styles["input-toggle"]}
        checked={isDark === "dark"}
        onChange={toggle}
      ></input>
      <label
        htmlFor="darkmode-toggle"
        className={styles["label-toggle"]}
        onChange={toggle}
      ></label>
    </div>
  );
}

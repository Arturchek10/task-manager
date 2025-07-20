import styles from "./Header.module.css";
import { Switch } from "@mui/material";
import { useMemo, useState } from "react";
import Toggle from "../elements/toggle";
import { $isDarkTheme, toggleTheme } from "../../store/theme";
import { useUnit } from "effector-react";
import { useEffect } from "react";

export default function Header() {
  const [isDark, toggle] = useUnit([$isDarkTheme, toggleTheme]);



  return (
    <header className={styles.header}>
      <h1>Task Manager</h1>
      <Toggle />
    </header>
  );
}

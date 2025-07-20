import { createStore, createEvent } from "effector";

export const toggleTheme = createEvent()

// достаем значение из localStorage 
const savedTheme = localStorage.getItem("theme") 
// преобразуем в boolean
const initialTheme : "light" | "dark" = savedTheme === "light" ? "light" : "dark"

export const $isDarkTheme = createStore<"light" | "dark">(initialTheme)

$isDarkTheme.on(toggleTheme, (oldVal) => oldVal === "light" ? "dark" : "light" )


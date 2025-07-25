import express from "express";
import cors from "cors";
import tasksRoutes from "./routes/tasksRoutes"

const app = express();
const PORT = 3000;

// дает возможность клиенту и серверу на разных портах обмениваться данными
app.use(cors());
app.use(express.json()); // автоматически парсит ответ в json если headers: application/json

// подключаем все маршруты из taskRoutes к пути, начинающемуся c /tasks 
app.use("/tasks", tasksRoutes)

// слушаем порт
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

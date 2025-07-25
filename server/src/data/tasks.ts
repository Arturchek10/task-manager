// хранилище задач 
import dayjs from "dayjs";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  tag: string;
  date: string;
};

export const tasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description:
      "Task 1 descriptionTask 1 descriptionTask 1 descriptionTask 1 description descriptionTask 1 descriptiondescriptionTask 1 descriptiondescriptionTask 1 description",
    status: "To Do",
    priority: "low",
    tag: "Test",
    date: dayjs("2025-01-01").format("DDMMM YYYY"),
  },
  {
    id: 2,
    title: "Task 2",
    description: "Task 2 description",
    status: "In Process",
    priority: "medium",
    tag: "Feature",
    date: dayjs("2025-07-25").format("DDMMM YYYY"),
  },
  {
    id: 3,
    title: "Task 3",
    description: "Task 3 description",
    status: "In Process",
    priority: "medium",
    tag: "Feature",
    date: dayjs("2025-01-01").format("DDMMM YYYY"),
  },
  {
    id: 4,
    title: "Task 4",
    description: "Task 4 description",
    status: "Done",
    priority: "medium",
    tag: "Feature",
    date: dayjs("2025-01-01").format("DDMMM YYYY"),
  },
  {
    id: 5,
    title: "Task 5",
    description: "Task 5 description",
    status: "To Do",
    priority: "medium",
    tag: "Feature",
    date: dayjs("2025-01-01").format("DDMMM YYYY"),
  },
  {
    id: 6,
    title: "Task 6",
    description: "Task 5 description",
    status: "To Do",
    priority: "medium",
    tag: "Feature",
    date: dayjs("2025-01-01").format("DDMMM YYYY"),
  },
];
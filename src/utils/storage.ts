import type { Task } from "../types/task";

const KEY = "tasks";

export const getTasks = (): Task[] => {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};

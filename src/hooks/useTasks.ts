import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { getTasks, saveTasks } from "../utils/storage";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const addTask = (task: Task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    saveTasks(updated);
  };

  const updateTask = (updatedTask: Task) => {
    const updated = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  return { tasks, addTask, updateTask, deleteTask };
};

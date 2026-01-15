import type { Task } from "../types/task";

export interface TaskFilterOptions {
  search: string;
  status: Task["status"] | "all";
  priority: Task["priority"] | "all";
  sort: string;
}

const priorityRank: Record<Task["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const filterAndSortTasks = (
  tasks: Task[],
  options: TaskFilterOptions
): Task[] => {
  const { search, status, priority, sort } = options;

  const filtered = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = status === "all" ? true : task.status === status;

    const matchesPriority =
      priority === "all" ? true : task.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return [...filtered].sort((a, b) => {
    switch (sort) {
      case "created-asc":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      case "priority-desc":
        return priorityRank[b.priority] - priorityRank[a.priority];

      case "priority-asc":
        return priorityRank[a.priority] - priorityRank[b.priority];

      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });
};

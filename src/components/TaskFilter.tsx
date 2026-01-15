import type { Task } from "../types/task";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  status: Task["status"] | "all";
  setStatus: (v: Task["status"] | "all") => void;
  priority: Task["priority"] | "all";
  setPriority: (v: Task["priority"] | "all") => void;
  sort: string;
  setSort: (v: string) => void;
}

const TaskFilter = ({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Task["status"])}
        className="border p-2 rounded"
      >
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Task["priority"])}
        className="border p-2 rounded"
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="created-desc">Newest first</option>
        <option value="created-asc">Oldest first</option>
        <option value="priority-desc">High priority first</option>
        <option value="priority-asc">Low priority first</option>
      </select>
    </div>
  );
};

export default TaskFilter;

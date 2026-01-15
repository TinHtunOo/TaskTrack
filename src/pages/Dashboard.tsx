import { Link, useSearchParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import TaskFilter from "../components/TaskFilter";
import type { Task } from "../types/task";
import { filterAndSortTasks } from "../utils/taskFilter";
import KanbanBoard from "../components/KanbanBoard";

const Dashboard = () => {
  const { tasks } = useTaskContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const status =
    (searchParams.get("status") as Task["status"] | "all") || "all";
  const priority =
    (searchParams.get("priority") as Task["priority"] | "all") || "all";
  const sort = searchParams.get("sort") || "created-desc";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const filteredTasks = filterAndSortTasks(tasks, {
    search,
    status,
    priority,
    sort,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600 mb-10">Your tasks will appear here.</p>
      <Link to="/task/new" className="bg-black text-white px-4 py-2 rounded">
        + New Task
      </Link>
      <TaskFilter
        search={search}
        setSearch={(v) => updateParams("search", v)}
        status={status}
        setStatus={(v) => updateParams("status", v)}
        priority={priority}
        setPriority={(v) => updateParams("priority", v)}
        sort={sort}
        setSort={(v) => updateParams("sort", v)}
      />
      <KanbanBoard tasks={filteredTasks} />
    </div>
  );
};

export default Dashboard;

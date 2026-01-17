import { Link, useSearchParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import TaskFilter from "../components/TaskFilter";
import type { Task } from "../types/task";
import { filterAndSortTasks } from "../utils/taskFilter";
import KanbanBoard from "../components/KanbanBoard";
import SearchBar from "../components/SearchBar";

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
    <div className=" flex ">
      <div className=" border-r border-gray-400 p-6 min-h-screen">
        <h1 className="text-2xl font-bold ">Task Track</h1>
        <TaskFilter
          priority={priority}
          setPriority={(v) => updateParams("priority", v)}
          sort={sort}
          setSort={(v) => updateParams("sort", v)}
        />
      </div>
      <div className="w-full p-6">
        <div className=" flex items-center justify-center mb-10">
          <SearchBar
            search={search}
            setSearch={(v) => updateParams("search", v)}
          />
          <Link
            to="/task/new"
            className="bg-black inline-block text-white px-4 py-2 rounded"
          >
            + New Task
          </Link>
        </div>
        <KanbanBoard tasks={filteredTasks} />
      </div>
    </div>
  );
};

export default Dashboard;

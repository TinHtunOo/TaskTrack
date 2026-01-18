import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import TaskFilter from "../components/TaskFilter";
import type { Task } from "../types/task";
import { filterAndSortTasks } from "../utils/taskFilter";
import KanbanBoard from "../components/KanbanBoard";
import SearchBar from "../components/SearchBar";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { tasks } = useTaskContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

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
      <div className=" border-r border-gray-300 p-6 min-h-screen">
        <h1 className="text-2xl font-bold ">Task Track</h1>
        <TaskFilter
          priority={priority}
          setPriority={(v) => updateParams("priority", v)}
          sort={sort}
          setSort={(v) => updateParams("sort", v)}
        />
      </div>
      <div className="w-full p-6">
        <div className="relative items-center justify-center mb-10">
          <SearchBar
            search={search}
            setSearch={(v) => updateParams("search", v)}
          />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gray-200 hover:bg-gray-400 inline-block group  p-2 rounded absolute right-0 top-0"
          >
            <Plus size={16} />
            <span
              className="absolute -bottom-7 right-0 -translate-x-4
           bg-gray-200 text-gray-600 text-[10px] px-2 py-1 rounded
           opacity-0 group-hover:opacity-100
           transition-opacity whitespace-nowrap"
            >
              Add Task
            </span>
          </button>
        </div>
        <KanbanBoard
          tasks={filteredTasks}
          onEditTask={(taskId) => {
            setEditingTaskId(taskId);
            setIsEditModalOpen(true);
          }}
        />
      </div>
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTaskId(null);
        }}
        taskId={editingTaskId}
      />
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import TaskFilter from "../components/TaskFilter";
import type { Task } from "../types/task";
import { filterAndSortTasks } from "../utils/taskFilter";
import KanbanBoard from "../components/KanbanBoard";
import SearchBar from "../components/SearchBar";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import { Plus, Moon, Sun, PanelLeftOpen, PanelRightOpen } from "lucide-react";

const Dashboard = () => {
  const { tasks } = useTaskContext();
  const { isDark, toggleDark } = useTheme();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setSiderbarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

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
    <div className={`flex min-h-screen relative ${isSidebarOpen ? "" : ""} `}>
      <div
        className={`h-screen w-screen absolute top-0 left-0 bg-black/20 ${isSidebarOpen ? "block" : "hidden"} `}
      ></div>
      <div
        className={`md:relative absolute border-r border-gray-300 sideBar   dark:border-gray-700 p-6 min-h-screen -translate-x-60 md:translate-x-0 z-50 bg-gray-50  dark:bg-gray-800 ${isSidebarOpen ? "translate-x-0 " : ""} `}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Task Track
        </h1>
        <TaskFilter
          priority={priority}
          setPriority={(v) => updateParams("priority", v)}
          sort={sort}
          setSort={(v) => updateParams("sort", v)}
        />
        <button
          onClick={() => setSiderbarOpen((open) => !open)}
          className="bg-gray-200 absolute top-6 right-2 md:hidden hover:cursor-pointer hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 inline-block group p-2 rounded"
        >
          <PanelRightOpen size={16} />
        </button>
      </div>
      <div className="w-full p-6 bg-white dark:bg-gray-900">
        <div className="relative z-10 items-center justify-center mb-10">
          <div className="absolute sm:top-0 top-15 left-0 md:hidden block">
            <button
              onClick={() => setSiderbarOpen((open) => !open)}
              className="bg-gray-200  hover:cursor-pointer hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 inline-block group p-2 rounded"
            >
              <PanelLeftOpen size={16} />
            </button>
          </div>
          <SearchBar
            search={search}
            setSearch={(v) => updateParams("search", v)}
          />
          <div className="sm:absolute sm:mt-0 mt-5 right-0 top-0 flex justify-end  gap-2">
            <button
              onClick={toggleDark}
              className="bg-gray-200 hover:cursor-pointer hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 inline-block group p-2 rounded"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span
                className="absolute -bottom-7 right-0 -translate-x-4
             bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-1 rounded
             opacity-0 group-hover:opacity-100
             transition-opacity whitespace-nowrap"
              >
                Toggle Theme
              </span>
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gray-200 hover:cursor-pointer hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 inline-block group p-2 rounded"
            >
              <Plus size={16} />
              <span
                className="absolute -bottom-7 right-0 -translate-x-4
             bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-1 rounded
             opacity-0 group-hover:opacity-100
             transition-opacity whitespace-nowrap"
              >
                Add Task
              </span>
            </button>
          </div>
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

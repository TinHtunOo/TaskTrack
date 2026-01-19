import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import { X } from "lucide-react";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string | null;
}

const EditTaskModal = ({ isOpen, onClose, taskId }: EditTaskModalProps) => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (taskId) {
      const found = tasks.find((t) => t.id === taskId);
      if (found) {
        setTask(found);
      }
    }
  }, [taskId, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      updateTask(task);
      onClose();
    }
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div>
      <div className="absolute  top-0 left-0 bg-black/20 w-screen h-screen z-0"></div>

      <div className="bg-white absolute rounded-lg top-25 left-0 right-0 m-auto  md:max-w-150 max-w-100 z-60">
        <h2 className="text-sm  mb-4 pt-6 px-6">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="px-6">
            <div>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full rounded font-semibold text-xl mb-2  focus:border-none placeholder:text-gray-400 focus:outline-0 "
                required
              />
            </div>
            <div>
              <textarea
                value={task.description || ""}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                className="w-full rounded text-base h-20 focus:border-none placeholder:text-gray-400 focus:outline-0 "
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div>
                <select
                  value={task.status}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      status: e.target.value as Task["status"],
                    })
                  }
                  className="w-fit text-xs border-2 hover:cursor-pointer focus:outline-0 font-semibold border-gray-500 text-gray-700 rounded px-2 py-1 appearance-none text-right"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <select
                  value={task.priority}
                  onChange={(e) =>
                    setTask({
                      ...task,
                      priority: e.target.value as Task["priority"],
                    })
                  }
                  className="w-fit text-xs hover:cursor-pointer border-2 focus:outline-0 font-semibold border-gray-500 text-gray-700 rounded px-2 py-1 appearance-none text-right"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <input
                  type="date"
                  value={task.dueDate || ""}
                  onChange={(e) =>
                    setTask({ ...task, dueDate: e.target.value || undefined })
                  }
                  className="w-fit hover:cursor-pointer text-xs border-2 focus:outline-0 font-semibold border-gray-500 text-gray-700 rounded px-2 py-1 appearance-none text-right"
                />
              </div>
            </div>
          </div>
          <span className="w-full inline-block border-t border-gray-400"></span>

          <div className="flex gap-3 justify-end px-2 pb-2">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-xs hover:opacity-80 hover:cursor-pointer text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 hover:opacity-40 hover:cursor-pointer "
            >
              <X size={16} />
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-xs hover:opacity-80 hover:cursor-pointer text-white px-4 py-2 rounded"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

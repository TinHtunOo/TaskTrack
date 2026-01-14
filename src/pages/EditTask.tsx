import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

const EditTask = ({ tasks, updateTask, deleteTask }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const found = tasks.find((t) => t.id === id);
    if (found) {
      setTask(found);
    } else {
      navigate("/");
    }
  }, [id, tasks, navigate]);

  if (!task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(task);
    navigate("/");
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={task.description || ""}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Priority</label>
            <select
              value={task.priority}
              onChange={(e) =>
                setTask({
                  ...task,
                  priority: e.target.value as Task["priority"],
                })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Status</label>
            <select
              value={task.status}
              onChange={(e) =>
                setTask({
                  ...task,
                  status: e.target.value as Task["status"],
                })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            value={task.dueDate || ""}
            onChange={(e) =>
              setTask({ ...task, dueDate: e.target.value || undefined })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Update Task
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;

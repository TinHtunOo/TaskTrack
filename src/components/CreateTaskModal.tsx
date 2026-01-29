import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import { X } from "lucide-react";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTaskModal = ({ isOpen, onClose }: CreateTaskModalProps) => {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      priority,
      status,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setStatus("todo");
    setDueDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="absolute  top-0 left-0 bg-black/20 w-screen h-screen z-59"></div>
      <div className="bg-white absolute rounded-lg top-25 left-0 right-0 m-auto   md:max-w-150 max-w-100 z-60">
        <h2 className="text-sm  mb-4 pt-6 px-6">New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="px-6">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded font-semibold text-xl mb-2  focus:border-none placeholder:text-gray-400 focus:outline-0 "
                placeholder="Add title"
                requirede
                autoFocus
              />
            </div>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded text-base h-20 focus:border-none placeholder:text-gray-400 focus:outline-0 "
                placeholder="Add description..."
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Task["status"])}
                  className="w-fit text-xs border-2 focus:outline-0 font-semibold border-gray-500 text-gray-700 rounded px-2 py-1 appearance-none text-right"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as Task["priority"])
                  }
                  className="w-fit text-xs border-2 focus:outline-0 font-semibold border-gray-500 text-gray-700 rounded px-2 py-1 appearance-none text-right"
                >
                  <option value="low">Low</option>
                  <option value="medium"> Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-fit text-xs border-2 focus:outline-0 font-semibold border-gray-500 text-gray-700 rounded px-2 py-1 appearance-none text-right"
                />
              </div>
            </div>
          </div>
          <span className="w-full inline-block border-t border-gray-400"></span>
          <div className="flex gap-3 justify-end px-2 pb-2">
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
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useTaskContext } from "../context/TaskContext";
import type { Task } from "../types/task";
import { Link } from "react-router-dom";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { updateTask } = useTaskContext();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className=" cursor-grab rounded-md bg-white shadow
        transition-all group flex justify-between gap-4 p-4 hover:bg-gray-50"
    >
      <div className="flex-1">
        <div
          className={`transition-all duration-300 ease-in-out
    ${task.status === "completed" ? "opacity-60 line-through" : "opacity-100"}
  `}
        >
          <h3 className="font-medium">{task.title}</h3>

          {task.description && (
            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
          )}

          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={() =>
              updateTask({
                ...task,
                status: task.status === "completed" ? "todo" : "completed",
              })
            }
          />

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span
              className={`px-2 py-0.5 rounded text-xs ${
                task.status === "todo"
                  ? "bg-gray-100 text-gray-700"
                  : task.status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.status}
            </span>

            <span
              className={`px-2 py-0.5 rounded text-xs ${
                task.priority === "low"
                  ? "bg-gray-100 text-gray-600"
                  : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {task.priority}
            </span>

            {task.dueDate && (
              <span className="text-gray-400">
                Due {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3 opacity-0 group-hover:opacity-100 transition">
        <Link
          to={`/task/${task.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;

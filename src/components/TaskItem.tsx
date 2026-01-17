import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types/task";
import { Link } from "react-router-dom";
import {
  Calendar,
  Circle,
  CircleCheck,
  LoaderCircle,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useTaskContext } from "../context/TaskContext";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { deleteTask } = useTaskContext();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? "none" : "transform 200ms ease",
  };

  const handleDelete = () => {
    console.log("deleting");
    deleteTask(task.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="  rounded-md bg-white shadow
        transition-all group flex justify-between gap-4 p-4 hover:bg-gray-50"
    >
      <div className="flex-1 " {...listeners}>
        <div>
          <div className=" flex flex-wrap gap-2 text-xs">
            <span
              className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${
                task.status === "todo"
                  ? "bg-gray-100 text-gray-700"
                  : task.status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.status === "todo" ? (
                <Circle size={12} />
              ) : task.status === "in-progress" ? (
                <LoaderCircle size={12} />
              ) : (
                <CircleCheck size={12} />
              )}
              {task.status}
            </span>

            <span
              className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${
                task.priority === "low"
                  ? "bg-gray-100 text-gray-600"
                  : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {task.priority === "low" ? (
                <SignalLow size={12} />
              ) : task.priority === "medium" ? (
                <SignalMedium size={12} />
              ) : (
                <SignalHigh size={12} />
              )}
              {task.priority}
            </span>
          </div>
          <h3 className="font-medium mt-2">{task.title}</h3>

          {task.description && (
            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
          )}
          <span className="inline-block border border-gray-300 w-full"></span>
          {task.dueDate && (
            <span className="text-gray-400 text-xs flex gap-1 items-center mt-1">
              <Calendar size={12} />{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center opacity-0 group-hover:opacity-100  transition">
        <Link
          to={`/task/${task.id}`}
          className=" text-blue-400 hover:text-blue-600"
        >
          <SquarePen size={16} />
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className=" text-red-400 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

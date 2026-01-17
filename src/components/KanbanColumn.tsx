import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import type { Task } from "../types/task";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanColumn = ({ id, title, tasks }: Props) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const count: number = tasks.length;
  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg p-4 transition-colors 
        ${isOver ? "bg-gray-200" : "bg-gray-100"}
      `}
    >
      <h3 className="font-semibold mb-3 text-gray-800">
        {title} ( {count} )
      </h3>
      <span
        className={`inline-block w-full border ${
          id === "todo"
            ? "border-gray-400"
            : id === "in-progress"
            ? "border-blue-400"
            : "border-green-400"
        }`}
      ></span>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;

import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import type { Task } from "../types/task";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  onEditTask: (taskId: string) => void;
}

const KanbanColumn = ({ id, title, tasks, onEditTask }: Props) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const count: number = tasks.length;
  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg p-4 transition-colors 
        ${isOver ? "bg-gray-200 dark:bg-gray-600" : "bg-gray-100 dark:bg-gray-700"}
      `}
    >
      <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">
        {title} ( {count} )
      </h3>
      <span
        className={`inline-block w-full border ${
          id === "todo"
            ? "border-gray-400 dark:border-gray-500"
            : id === "in-progress"
              ? "border-blue-400 dark:border-blue-500"
              : "border-green-400 dark:border-green-500"
        }`}
      ></span>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEditTask={onEditTask} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import KanbanColumn from "./KanbanColumn";

interface Props {
  tasks: Task[];
}

const columns = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Done" },
] as const;

const KanbanBoard = ({ tasks }: Props) => {
  const { updateTask } = useTaskContext();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as "todo" | "in-progress" | "completed";

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    updateTask({
      ...task,
      status: newStatus,
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;

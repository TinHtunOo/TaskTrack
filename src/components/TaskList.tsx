import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
}

const TaskList = ({ tasks }: Props) => {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 mt-6">
        No tasks yet. Create one to get started.
      </p>
    );
  }

  return (
    <div className="grid gap-4 mt-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;

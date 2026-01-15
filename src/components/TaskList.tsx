import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
}

const TaskList = ({ tasks }: Props) => {
  if (tasks.length === 0) {
    return (
      <div className="mt-12 text-center text-gray-500">No tasks found</div>
    );
  }

  return (
    <div className="mt-6 border rounded-md divide-y">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;

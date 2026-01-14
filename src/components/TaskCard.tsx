import { Link } from "react-router-dom";
import type { Task } from "../types/task";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{task.title}</h3>
        <span className="text-sm text-gray-500">{task.priority}</span>
        <Link to={`/task/${task.id}`} className="text-sm text-blue-600">
          Edit
        </Link>
      </div>

      <p className="text-sm text-gray-600 mt-1">Status: {task.status}</p>

      {task.dueDate && (
        <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
      )}
    </div>
  );
};

export default TaskCard;

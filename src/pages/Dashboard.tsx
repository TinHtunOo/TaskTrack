import { Link } from "react-router-dom";
import TaskList from "../components/TaskList";
import { useTaskContext } from "../context/TaskContext";

const Dashboard = () => {
  const { tasks } = useTaskContext();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600 mb-10">Your tasks will appear here.</p>
      <Link to="/task/new" className="bg-black text-white px-4 py-2 rounded">
        + New Task
      </Link>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;

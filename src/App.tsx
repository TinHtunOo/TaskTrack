import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import { useTasks } from "./hooks/useTasks";

function App() {
  const taskStore = useTasks();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard {...taskStore} />} />
        <Route path="/task/new" element={<CreateTask {...taskStore} />} />
        <Route path="/task/:id" element={<EditTask {...taskStore} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

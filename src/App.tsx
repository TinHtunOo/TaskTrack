import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import "tailwindcss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task/new" element={<CreateTask />} />
        <Route path="/task/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

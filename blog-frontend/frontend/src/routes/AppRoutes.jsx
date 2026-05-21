import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import StudentDashboard from "../pages/aluno/StudentDashboard";
import TeacherDashboard from "../pages/professor/TeacherDashboard";
import PostForm from "../pages/professor/PostForm";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Aluno */}
        <Route path="/student" element={<StudentDashboard />} />

        {/* Professor */}
        <Route path="/teacher" element={<TeacherDashboard />} />

        {/* Criar Post */}
        <Route path="/create-post" element={<PostForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

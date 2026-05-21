import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

import Login from "../pages/auth/Login";
import StudentDashboard from "../pages/aluno/StudentDashboard";
import TeacherDashboard from "../pages/professor/TeacherDashboard";
import PostForm from "../pages/professor/PostForm";

function AppRoutes() {
  const { user, login, logout } = useContext(UserContext);

  const handleLogin = (role) => {
    const roleDisplay = role === "teacher" ? "Professor" : "Aluno";
    login(role, roleDisplay);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === "teacher" ? "/teacher" : "/student"} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Aluno */}
        <Route
          path="/student"
          element={
            user && user.role === "student" ? (
              <StudentDashboard user={user} onLogout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Professor */}
        <Route
          path="/teacher"
          element={
            user && user.role === "teacher" ? (
              <TeacherDashboard user={user} onLogout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Criar Post */}
        <Route
          path="/create-post"
          element={
            user && user.role === "teacher" ? (
              <PostForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

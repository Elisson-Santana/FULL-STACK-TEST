import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
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
          path="/login"
          element={
            user ? (
              <Navigate to={user.role === "teacher" ? "/teacher" : "/student"} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Registro */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to={user.role === "teacher" ? "/teacher" : "/student"} />
            ) : (
              <Register />
            )
          }
        />

        {/* Home redireciona para login */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === "teacher" ? "/teacher" : "/student"} />
            ) : (
              <Navigate to="/login" />
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
              <Navigate to="/login" />
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
              <Navigate to="/login" />
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
              <Navigate to="/login" />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

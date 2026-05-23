import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

import HomePage from "../pages/HomePage";
import StudentDashboard from "../pages/aluno/StudentDashboard";
import TeacherDashboard from "../pages/professor/TeacherDashboard";
import ProfessorLoginPage from "../pages/auth/ProfessorLoginPage";
import ProfessorRegisterPage from "../pages/auth/ProfessorRegisterPage";

function AppRoutes() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Seleção entre Aluno e Professor */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={user.role === "teacher" ? "/teacher" : "/student"} />
            ) : (
              <HomePage />
            )
          }
        />

        {/* Professor Login */}
        <Route
          path="/professor-login"
          element={
            user && user.role === "teacher" ? (
              <Navigate to="/teacher" />
            ) : (
              <ProfessorLoginPage />
            )
          }
        />

        {/* Professor Register */}
        <Route
          path="/professor-register"
          element={
            user && user.role === "teacher" ? (
              <Navigate to="/teacher" />
            ) : (
              <ProfessorRegisterPage />
            )
          }
        />

        {/* Aluno - Sem autenticação obrigatória */}
        <Route
          path="/student"
          element={<StudentDashboard user={user} />}
        />

        {/* Professor - Requer autenticação */}
        <Route
          path="/teacher"
          element={
            user && user.role === "teacher" ? (
              <TeacherDashboard user={user} />
            ) : (
              <Navigate to="/professor-login" />
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

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AreaProfessor from "../pages/AreaProfessor";
import AreaAluno from "../pages/AreaAluno";
import ListStudents from "../pages/ListStudents";
import RegisterClass from "../pages/RegisterClass";
import ListClasses from "../pages/ListClasses";
import RegisterStudents from "../pages/RegisterStudents";
import LessonPresence from "../pages/LessonPresence";
import RegisterAttendance from "../pages/RegisterAttendance";
import AttendanceByLesson from "../pages/AttendanceByLesson";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/area-professor" element={<AreaProfessor />} />
        <Route path="/area-aluno" element={<AreaAluno />} />
        <Route path="/register-student" element={<RegisterStudents />} />
        <Route path="/list-students" element={<ListStudents />} />
        <Route path="/register-class" element={<RegisterClass />} />
        <Route path="/list-classes" element={<ListClasses />} />
        <Route path="/lesson/:id/presence" element={<LessonPresence />} />
        <Route path="registrar-presenca" element={<RegisterAttendance />} />
        <Route path="/attendance-student/:id" element={<AttendanceByLesson />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
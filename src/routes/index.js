import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AreaProfessor from "../pages/AreaProfessor";
import AreaAluno from "../pages/AreaAluno";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/area-professor" element={<AreaProfessor />} />
        <Route path="/area-aluno" element={<AreaAluno />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;


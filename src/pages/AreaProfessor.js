import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AreaProfessor.css";
import PortalButton from "../components/PortalButton";

const AreaProfessor = () => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="area-professor-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Portal do Professor</p>
          <p className="date">{today}</p>
        </div>
        <div className="actions d-flex gap-3">
          <button className="logout-btn">
            <i
              className="bi bi-box-arrow-right"
              style={{ fontSize: "20px" }}
              onClick={handlelogout}
            ></i>
            Log out
          </button>
          <button className="back-btn" onClick={() => navigate("/home")}>
            <i className="bi bi-house-door" style={{ fontSize: "20px" }}></i>
            Tela Inicial
          </button>
        </div>
      </header>

      <div className="content">
        <div className="portal-button-wrapper">
          <PortalButton
            icon="bi bi-person-plus"
            label="Cadastrar Aluno"
            onClick={() => navigate("/register-student")}
          />
        </div>

        <div className="portal-button-wrapper">
          <PortalButton
            icon="bi bi-person-lines-fill"
            label="Listar Alunos"
            onClick={() => navigate("/list-students")}
          />
        </div>

        <div className="portal-button-wrapper">
          <PortalButton
            icon="bi bi-journal-plus"
            label="Cadastrar Aula"
            onClick={() => navigate("/register-class")}
          />
        </div>

        <div className="portal-button-wrapper">
          <PortalButton
            icon="bi bi-journal-text"
            label="Listar Aulas"
            onClick={() => navigate("/list-classes")}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaProfessor;

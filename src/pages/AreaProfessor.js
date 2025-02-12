import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AreaProfessor.css";

const AreaProfessor = () => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

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
            ></i>
            Log out
          </button>
          <button className="back-btn" onClick={() => navigate("/")}>
            <i className="bi bi-house-door" style={{ fontSize: "20px" }}></i>
            Tela Inicial
          </button>
        </div>
      </header>
    </div>
  );
};

export default AreaProfessor;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="home-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Sistema de Chamada</p>
          <p className="date">{today}</p>
        </div>
        <button className="logout-btn">
          <i className="bi bi-box-arrow-right" style={{ fontSize: "20px" }}></i>
          Log out
        </button>
      </header>

      <div className="action-container d-flex flex-column align-items-center justify-content-center">
        <img src={logo} alt="Descomplica + UniAmérica" className="logo" />

        <div className="portals d-flex flex-column">
          <button className="portal-btn" onClick={() => navigate("/area-professor")}>
            <div className="portal-icon">
              <i className="bi bi-file-earmark-text"></i>
            </div>
            <span>Portal do Professor</span>
          </button>

          <button className="portal-btn" onClick={() => navigate("/area-aluno")}>
            <div className="portal-icon">
              <i className="bi bi-mortarboard"></i>
            </div>
            <span>Portal do Aluno</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

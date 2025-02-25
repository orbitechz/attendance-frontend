import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import PortalButton from "../components/PortalButton";

const Home = () => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleLogout = async () => {
        localStorage.removeItem("token");
        navigate("/");
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Sistema de Chamada</p>
          <p className="date">{today}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right" style={{ fontSize: "20px" }}></i>
          Log out
        </button>
      </header>

      <div className="action-container d-flex flex-column align-items-center justify-content-center">
        <img src={logo} alt="Descomplica + UniAmérica" className="logo" />

        <div className="portals d-flex flex-column">
          <PortalButton
            icon="bi-file-earmark-text"
            label="Portal do Professor"
            onClick={() => navigate("/area-professor")}
          />

          <PortalButton
            icon="bi-mortarboard"
            label="Portal do Aluno"
            onClick={() => navigate("/area-aluno")}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

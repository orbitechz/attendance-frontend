import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterClass.css";
import axios from "axios";

const RegisterClass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeDaAula: "",
    data: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/classes", formData);
      console.log("Class data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting class data:", error);
    }
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="register-class-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Cadastrar Aula</p>
            <p className="date">{today}</p>
        </div>
        <div className="actions d-flex gap-3">
          <button className="logout-btn">
            <i className="bi bi-box-arrow-right" style={{ fontSize: "20px" }}></i>
            Log out
          </button>
          <button className="back-btn" onClick={() => navigate("/")}>
            <i className="bi bi-house-door" style={{ fontSize: "20px" }}></i>
            Tela Inicial
          </button>
        </div>
      </header>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nomeDaAula">Nome da Aula</label>
            <input
              type="text"
              id="nomeDaAula"
              name="nomeDaAula"
              value={formData.nomeDaAula}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="data">Data</label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="register-btn">
          Cadastrar Aula
        </button>
      </form>
    </div>
  );
};

export default RegisterClass;
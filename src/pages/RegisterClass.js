import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterClass.css";
import axios from "axios";

const RegisterClass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    open: true,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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
      const formattedDate = `${formData.date}T00:00:00`;
      const requestData = { ...formData, date: formattedDate };

      const response = await axios.post("/api/lesson", requestData);
      console.log("Class data submitted:", response.data);
      setMessage("Aula cadastrada com sucesso!");
      setMessageType("success");
    } catch (error) {
      console.error("Error submitting class data:", error);
      setMessage(
        "Erro ao cadastrar aula. Verifique os dados e tente novamente."
      );
      setMessageType("error");
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
      <form className="register-form" onSubmit={handleSubmit}>
        {message && <p className={`message ${messageType}`}>{message}</p>}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Nome da Aula</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Data</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-actions d-flex">
          <button type="submit" className="register-btn">
            Cadastrar Aula
          </button>
          <button
            type="button"
            className="list-classes-btn"
            onClick={() => navigate("/list-classes")}
          >
            Listar Aulas
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterClass;

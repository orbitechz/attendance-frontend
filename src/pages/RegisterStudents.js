import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterStudents.css";
import axios from "axios";

const RegisterStudents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    ra: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      validateEmail(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email inválido",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.email) {
      try {
        const response = await axios.post("/api/students", formData);
        console.log("Form data submitted:", response.data);
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    } else {
      console.log("Form contains errors:", errors);
    }
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="register-students-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Cadastrar Aluno</p>
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
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ra">RA</label>
            <input
              type="text"
              id="ra"
              name="ra"
              value={formData.ra}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <button type="submit" className="register-btn">
            Cadastrar Aluno
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStudents;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterStudents.css";
import axiosInstance from "../interceptor/axiosInstance";

const RegisterStudents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    ra: "",
    email: "",
    role: "STUDENT",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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

  const formatDateOfBirth = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}${month}${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.email) {
      const payload = {
        ...formData,
        username: formData.email,
        dateOfBirth: formData.dateOfBirth,
        ra: formData.ra,
        password: formatDateOfBirth(formData.dateOfBirth),
      };
      try {
        const response = await axiosInstance.post("http://localhost:8080/api/student", payload, {
          headers: { "Content-Type": "application/json" }
        });
        console.log("Aluno cadastrado com sucesso:", response.data);
        setMessage("Aluno cadastrado com sucesso!");
        setMessageType("success");
      } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        setMessage("Erro ao cadastrar aluno. Verifique os dados e tente novamente.");
        setMessageType("error");
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

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="register-students-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Cadastrar Aluno</p>
          <p className="date">{today}</p>
        </div>
        <div className="actions d-flex gap-3">
          <button className="logout-btn" onClick={handlelogout}>
            <i className="bi bi-box-arrow-right" style={{ fontSize: "20px" }}></i>
            Log out
          </button>
          <button className="back-btn" onClick={() => navigate("/home")}>
            <i className="bi bi-house-door" style={{ fontSize: "20px" }}></i>
            Tela Inicial
          </button>
        </div>
      </header>
      <form className="register-form" onSubmit={handleSubmit}>
        {message && <p className={`message ${messageType}`}>{message}</p>}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"   
              value={formData.name}
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
          <div className="form-group">
            <label htmlFor="dateOfBirth">Data de Nascimento</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-actions d-flex">
          <button type="submit" className="register-btn">
            Cadastrar Aluno
          </button>
          <button type="button" className="list-students-btn" onClick={() => navigate("/list-students")}>
            Listar Alunos
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStudents;
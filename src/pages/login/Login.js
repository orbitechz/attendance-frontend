import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import logo from "../../assets/logo.png";
import axiosInstance from "../../interceptor/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const isRa = !email.includes("@");
  
    const request = {
      [isRa ? "ra" : "username"]: email,
      password: password,
    };
  
    try {
      const response = await axiosInstance.post("/auth/authenticate", request);
  
      if (response.status !== 200) {
        throw new Error("Authentication failed");
      }
  
      const data = response.data;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
  
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password");
    }
  };
  
  return (
    <div className="login-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Sistema de Chamada</p>
          <p className="date">{today}</p>
        </div>
      </header>

      <img src={logo} alt="Descomplica + UniAmérica" className="logo" />

      <form
        className="login-form d-flex flex-column justify-content-center"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="email">E-mail ou RA</label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ListClasses.css";
import { useNavigate } from "react-router-dom";

const ListClasses = () => {
  const [aulas, setAulas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const response = await axios.get("/api/aulas");
        setAulas(response.data);
      } catch (error) {
        console.error("Error fetching aulas:", error);
      }
    };

    fetchAulas();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/aulas/${id}`);
      setAulas(aulas.filter((aula) => aula.id !== id));
    } catch (error) {
      console.error("Error removing aula:", error);
    }
  };

  const handlePresenca = (id) => {
    navigate(`/aulas/${id}/presenca`);
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="list-aulas-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Acessar Aulas</p>
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
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome da Aula</th>
              <th>Data da Aula</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {aulas.map((aula) => (
              <tr key={aula.id}>
                <td>{aula.nome}</td>
                <td>{aula.data}</td>
                <td>
                  <button className="remover-btn" onClick={() => handleRemove(aula.id)}>Remover</button>
                  <button className="presenca-btn" onClick={() => handlePresenca(aula.id)}>Presença</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListClasses;
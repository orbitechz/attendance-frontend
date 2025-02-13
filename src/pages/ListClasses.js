import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ListClasses.css";
import { useNavigate } from "react-router-dom";

const ListClasses = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/lesson"); 
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/lesson/${id}`);
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    } catch (error) {
      console.error("Error removing lesson:", error);
    }
  };

  const handlePresence = (id) => {
    navigate(`/lesson/${id}/presence`);
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="list-classes-container">
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.title}</td>
                <td>{new Date(lesson.date).toLocaleDateString("pt-BR")}</td>
                <td>
                  <button className="remover-btn" onClick={() => handleRemove(lesson.id)}>Remover</button>
                  <button className="presenca-btn" onClick={() => handlePresence(lesson.id)}>Presença</button>
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

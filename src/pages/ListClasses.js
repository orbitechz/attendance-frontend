import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ListClasses.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../interceptor/axiosInstance";

const ListClasses = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOpenStatus, setSelectedOpenStatus] = useState("all");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/api/lesson`);
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`${apiUrl}/api/lesson/${id}`);
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    } catch (error) {
      console.error("Error removing lesson:", error);
    }
  };

  const handlePresence = (id) => {
    navigate(`/lesson/${id}/presence`);
  };

  const handleClose = async (id) => {
    try {
      const response = await axiosInstance.put(`${apiUrl}/api/lesson/close/${id}`);
      setLessons(lessons.map((lesson) => (lesson.id === id ? response.data : lesson)));
    } catch (error) {
      console.error("Error closing lesson:", error);
    }
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const filteredLessons = lessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date).toISOString().split('T')[0];
    const matchesDate = selectedDate ? lessonDate === selectedDate : true;
    const matchesOpenStatus = selectedOpenStatus === "all" ? true : (lesson.open === null ? true : lesson.open === (selectedOpenStatus === "open"));
    return matchesDate && matchesOpenStatus;
  });

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="list-classes-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Acessar Aulas</p>
          <p className="date">{today}</p>
        </div>
        <div className="actions d-flex gap-3">
          <button className="logout-btn" onClick={handlelogout}>
            <i
              className="bi bi-box-arrow-right"
              style={{ fontSize: "20px" }}
            ></i>
            Log out
          </button>
          <button className="back-btn" onClick={() => navigate("/home")}>
            <i className="bi bi-house-door" style={{ fontSize: "20px" }}></i>
            Tela Inicial
          </button>
        </div>
      </header>
      <div className="table-container">
        <div className="filter-container d-flex gap-3 align-end">
          <label htmlFor="date-filter">Filtrar por Data:</label>
          <input
            type="date"
            id="date-filter"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <label htmlFor="open-status-filter">Filtrar por Status:</label>
          <select
            id="open-status-filter"
            value={selectedOpenStatus}
            onChange={(e) => setSelectedOpenStatus(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="open">Abertos</option>
            <option value="closed">Fechados</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome da Aula</th>
              <th>Data da Aula</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.title}</td>
                <td>{new Date(lesson.date).toLocaleDateString("pt-BR")}</td>
                <td>
                  <button className="presenca-btn" onClick={() => handlePresence(lesson.id)}>Presença</button>
                  {lesson.open !== false && (
                    <button className="close-btn" onClick={() => handleClose(lesson.id)}>Fechar Aula</button>
                  )}
                  <button className="remover-btn" onClick={() => handleRemove(lesson.id)}>Remover</button>
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
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ListStudents.css";
import { useNavigate } from "react-router-dom";

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="list-students-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Acessar Alunos</p>
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
              <th>Nome do Aluno</th>
              <th>RA</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.nomeCompleto}</td>
                <td>{student.ra}</td>
                <td>{student.email}</td>
                <td>
                  <button onClick={() => handleRemove(student.id)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStudents;

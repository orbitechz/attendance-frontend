import React, { useState, useEffect } from "react";
import "../styles/ListStudents.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../interceptor/axiosInstance";

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/api/student`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`${apiUrl}/api/student/${id}`);
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

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="list-students-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Acessar Alunos</p>
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
                <td>{student.name}</td>
                <td>{student.ra}</td>
                <td>{student.email}</td>
                <td>
                  <button onClick={() => handleRemove(student.id)} style={{ backgroundColor: "#F6725C" }}>
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

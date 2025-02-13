import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ListAttendance.css";
import { useNavigate } from "react-router-dom";

const ListAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Buscar dados dos alunos e das aulas
        const [studentsResponse, lessonsResponse] = await Promise.all([
          axios.get("/api/students"),
          axios.get("/api/lesson"),
        ]);

        // Combinar dados de alunos e aulas
        const combinedData = studentsResponse.data.flatMap((student) =>
          lessonsResponse.data.map((lesson) => ({
            id: `${student.id}-${lesson.id}`,
            studentId: student.id,
            studentName: student.nomeCompleto,
            ra: student.ra,
            lessonDate: lesson.date,
            lessonName: lesson.name,
            attendance: false, // valor inicial para presença
          }))
        );

        setAttendanceData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleAttendance = async (id, value) => {
    try {
      // Atualizar presença no backend
      await axios.post(`/api/attendance/${id}`, { attendance: value });

      // Atualizar estado local
      setAttendanceData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, attendance: value } : item
        )
      );
    } catch (error) {
      console.error("Error updating attendance:", error);
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
          <p className="title">Lista de Presença</p>
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
              <th>Data da Aula</th>
              <th>Nome da Aula</th>
              <th>Presença</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item) => (
              <tr key={item.id}>
                <td>{item.studentName}</td>
                <td>{item.ra}</td>
                <td>{new Date(item.lessonDate).toLocaleDateString("pt-BR")}</td>
                <td>{item.lessonName}</td>
                <td>
                  <select
                    value={item.attendance}
                    onChange={(e) =>
                      handleAttendance(item.id, e.target.value === "true")
                    }
                  >
                    <option value={false}>Falta</option>
                    <option value={true}>Presente</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAttendance;

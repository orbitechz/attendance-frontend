import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ListAttendance.css";

const ListAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Usando a URL do primeiro código que já está funcionando
        const response = await axios.get(
          `http://localhost:8080/api/attendance/lesson/${id}`
        );
        setAttendances(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar a lista de presenças!", error);
        setError(
          "Erro ao buscar a lista de presenças. Tente novamente mais tarde."
        );
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [id]);

  const handleAttendance = async (attendanceId, value) => {
    try {
      await axios.post(`/api/attendance/${attendanceId}`, { open: value });

      // Atualizar estado local
      setAttendances((prevAttendances) =>
        prevAttendances.map((attendance) =>
          attendance.id === attendanceId
            ? { ...attendance, open: value }
            : attendance
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar presença:", error);
    }
  };

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="list-attendance-container">
      <header className="header">
        <div className="main-header d-flex flex-column">
          <p className="title">Lista de Presenças</p>
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
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>RA</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Data da Aula</th>
                <th>Status da Presença</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr key={attendance.id}>
                  <td>{attendance.student.ra}</td>
                  <td>{attendance.student.name}</td>
                  <td>{attendance.student.email}</td>
                  <td>
                    {attendance.lesson?.date &&
                      new Date(attendance.lesson.date).toLocaleDateString(
                        "pt-BR"
                      )}
                  </td>
                  <td>
                    <select
                      value={attendance.open}
                      onChange={(e) =>
                        handleAttendance(
                          attendance.id,
                          e.target.value === "true"
                        )
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
        )}
      </div>
    </div>
  );
};

export default ListAttendance;

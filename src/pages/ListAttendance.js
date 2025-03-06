import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../interceptor/axiosInstance';

const ListAttendance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axiosInstance.get(`${apiUrl}/api/attendance/lesson/${id}`)
            .then(response => {
                setAttendances(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar a lista de presenças!', error);
                setError('Erro ao buscar a lista de presenças. Tente novamente mais tarde.');
                setLoading(false);
            });
    }, [id]);

    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="list-attendance-container">
            <header className="header">
                <div className="main-header d-flex flex-column">
                    <p className="title">Lista de Presenças</p>
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
                                <th>Status da Presença</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendances.map((attendance) => (
                                <tr key={attendance.id}>
                                    <td>{attendance.student.ra}</td>
                                    <td>{attendance.student.name}</td>
                                    <td>{attendance.student.email}</td>
                                    <td>{attendance.open ? "Presente" : "Faltou"}</td>
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
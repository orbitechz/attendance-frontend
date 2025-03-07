import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/AttendanceByLesson.css"; 
import axiosInstance from '../interceptor/axiosInstance';

const AttendanceByLesson = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [studentRA, setStudentRA] = useState('');
    const [lesson, setLesson] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axiosInstance.get(`/api/lesson/${id}`);
                setLesson(response.data);
            } catch (error) {
                console.error('Erro ao buscar aula:', error);
            }
        };

        fetchLesson();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/api/attendance`, {
                student: { ra: studentRA },
                lesson: { id: lesson.id },
                open: true
            });
            console.log('Presença registrada:', response.data);
            setMessage("Presença registrada com sucesso!");
            setMessageType("success");
        } catch (error) {
            console.error('Erro ao registrar presença:', error);
            setMessage("Erro ao registrar presença. Por favor, tente novamente.");
            setMessageType("error");
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
        <div className="register-class-container">
            <header className="header">
                <div className="main-header d-flex flex-column">
                    <p className="title">Registrar Presença</p>
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
                        <label htmlFor="studentRA">RA do Estudante</label>
                        <input
                            type="text"
                            id="studentRA"
                            name="studentRA"
                            value={studentRA}
                            onChange={(e) => setStudentRA(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lessonName">Nome da Aula</label>
                        <input
                            type="text"
                            id="lessonName"
                            name="lessonName"
                            value={lesson ? lesson.title : ''}
                            disabled
                        />
                    </div>
                </div>
                <div className="form-actions d-flex">
                    <button type="submit" className="register-btn">
                        Registrar Presença
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AttendanceByLesson;
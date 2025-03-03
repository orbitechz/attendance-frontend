import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PortalButton from '../components/PortalButton';
import "../styles/RegisterAttendance.css";
import axiosInstance from '../interceptor/axiosInstance';

const RegisterAttendance = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axiosInstance.get('/api/lesson');
                setLessons(response.data);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };

        fetchLessons();
    }, []);

    const today = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const openLessons = lessons.filter(lesson => lesson.open).sort((a, b) => new Date(a.date) - new Date(b.date));
    const closedLessons = lessons.filter(lesson => !lesson.open).sort((a, b) => new Date(a.date) - new Date(b.date));

    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="register-students-container">
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
            <div>
                <p className='title-aulas'>Aulas Abertas</p>
                <hr className='line'/>
                <div className="lessons-container d-flex gap-3">
                    {openLessons.map(lesson => (
                        <PortalButton
                            icon={"bi bi-calendar-check"}
                            key={lesson.id}
                            label={`${lesson.title} - ${new Date(lesson.date).toLocaleDateString("pt-BR")}`}
                            onClick={() => navigate(`/attendance-student/${lesson.id}`)}
                        />
                    ))}
                </div>
                <p className='title-aulas'>Aulas Fechadas</p>
                <hr className='line'/>
                <div className="lessons-container d-flex gap-3">
                    {closedLessons.map(lesson => (
                        <PortalButton
                            icon={"bi bi-calendar-x"}
                            key={lesson.id}
                            label={`${lesson.title} - ${new Date(lesson.date).toLocaleDateString("pt-BR")}`}
                            onClick={() => navigate(`/attendance-student/${lesson.id}`)}
                            disabled
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegisterAttendance;
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PortalButton from '../components/PortalButton';
import "../styles/RegisterAttendance.css";

const RegisterAttendance = () => {
    const navigate = useNavigate();
    const [openLessons, setOpenLessons] = useState([]);

    useEffect(() => {
        const fetchOpenLessons = async () => {
            try {
                const response = await axios.get('/api/lesson/open');
                setOpenLessons(response.data);
            } catch (error) {
                console.error('Error fetching open lessons:', error);
            }
        };

        fetchOpenLessons();
    }, []);

    const today = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    return (
        <div className="register-students-container">
            <header className="header">
                <div className="main-header d-flex flex-column">
                    <p className="title">Registrar Presença</p>
                    <p className="date">{today}</p>
                </div>
                <div className="actions d-flex gap-3">
                    <button className="logout-btn">
                        <i className="bi bi-box-arrow-right" style={{ fontSize: "20px" }}></i>
                        Log out
                    </button>
                    <button className="back-btn" onClick={() => navigate("/")}>
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
                            key={lesson.id}
                            label={`${lesson.title} - ${new Date(lesson.date).toLocaleDateString("pt-BR")}`}
                            onClick={() => navigate(`/attendance-student/${lesson.id}`)}
                            />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegisterAttendance;
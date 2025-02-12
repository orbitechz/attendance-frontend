import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/index.css'

const RegisterAttendance = () => {
    const navigate = useNavigate()

    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })
    return (
        <div className="generic-container">
            <header className="header">
                <div className="main-header d-flex flex-column">
                    <p className="title fw-bold">Portal do Aluno</p>
                    <p className="date">{today}</p>
                </div>
                <div className="actions d-flex gap-3">
                    <button className="logout-btn">
                        <i
                            className="bi bi-box-arrow-right"
                            style={{ fontSize: '20px' }}
                        ></i>
                        Log out
                    </button>
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <i className="bi bi-house-door" style={{ fontSize: '20px' }}></i>
                        Tela Inicial
                    </button>
                </div>
            </header>

            <div>
                <h1>Registrar Presença</h1>
            </div>
        </div>
    )
}

export default RegisterAttendance

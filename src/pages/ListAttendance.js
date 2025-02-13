import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/ListAttendance.css";

const ListAttendance = () => {
    const { id } = useParams();
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/attendance/lesson/${id}`)
            .then(response => {
                setAttendances(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar a lista de presenças!', error);
            });
    }, [id]);    

    return (
        <div>
            <h1>Lista de Presenças</h1>
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
        </div>
    );
};

export default ListAttendance;

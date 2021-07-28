import React, { useState, useEffect } from 'react';

import Formulario from './Formulario';
import Cita from './Cita'

function Home() {
    // Citas en local storage
    let citasIniciales = JSON.parse(localStorage.getItem('citas')); // Por que el local storage solo acepta strings
    if (!citasIniciales) {
        citasIniciales = [];
    }

    // Arreglo de citas
    const [citas, setCitas] = useState(citasIniciales)

    // ---- Para interacturar con las citas

    useEffect(() => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas')); // Para que no tire un error en consola

        if (citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas))
        } else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas]);

    // Funcion que toma las citas actuales y agrega las nuevas
    const agregarCita = cita => {
        setCitas([
            ...citas,
            cita
        ]);
    }

    // Eliminar citas
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id);
        setCitas(nuevasCitas);
    }

    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';
    return (
        <div>
            <h1>Administrador de Citas</h1>

            <div className='container'>
                <div className='row'>
                    <div className='one-half column'>
                        <Formulario agregarCita={agregarCita} />
                    </div>
                    <div className='one-half column'>
                        <h2>{titulo}</h2>

                        {citas.map(cita => (

                            <Cita cita={cita} key={cita.id} eliminarCita={eliminarCita} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

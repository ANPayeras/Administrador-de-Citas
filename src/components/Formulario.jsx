import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({agregarCita}) => {

    const [cita,actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error,setError] = useState(false);

    console.log(cita)

    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]:e.target.value

        }) 
    }

    const {mascota,propietario,fecha,hora,sintomas} = cita;

    const submitCita =(e) => {
        e.preventDefault();

        // Validacion
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
        hora.trim() === '' || sintomas.trim() === '') {
            setError(true);
            return; // Para que no se siga ejecutando el codigo
        } 

        cita.id = uuid(); // Le da a cada cita un ID unico    

        // Agregar cita
        agregarCita(cita);

        // Reiniciamos el form, gracias al value que le seteamos a cada input
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className='alerta-error'>Todos los campos son necesarios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>

                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Dueña/Dueño</label>

                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Amo'
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>

                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>

                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>

                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type='submit'
                    className='u-full-width button-primary'
                >Agregar Cita</button>

            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    agregarCita: PropTypes.func.isRequired
}

export default Formulario;
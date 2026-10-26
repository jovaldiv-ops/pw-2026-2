// src/pages/enterprise/CarrerasListado.jsx
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import './CarrerasListado.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'



export default function CarrerasListado() {
  const carrers2 = [
    { id: 1, name: 'Ingeniería de Sistemas' },
    { id: 2, name: 'Ingeniería Software' },
    { id: 3, name: 'Administración de Empresas' },
    { id: 4, name: 'Contabilidad y Finanzas' },
    { id: 5, name: 'Medicina Humana' },
    { id: 6, name: 'Derecho' },
    { id: 7, name: 'Psicología' },
    { id: 8, name: 'Ingeniería Industrial' },
    { id: 9, name: 'Arquitectura' },
    { id: 10, name: 'Marketing y Publicidad' },
  ]

  const [carrers, setCarrers] = useState([])

  useEffect(() => {
    cargarCarreras()
  }, [])

  const borrar = async (id) => {
    console.log(`id a borrar ${id}`)

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/carrers/${id}`
      )

      console.log('Carrera eliminadad:', response.data)
      alert('Carrera eliminada correctamente')
    } catch (error) {
      console.error('Error al eliminar la carrera:', error)
      alert('No se pudo elimnar la carrera')
    } finally {
      cargarCarreras()
    }
  }

  const linkClass = ({ isActive }) => 
    `btn btn-primary ${isActive ? 'active bg-primary text-white' : 'text-dark'}`;

  const cargarCarreras = async () => {
    console.log(carrers)

    /**
     * {carrers.map((career) => (
        <p key={career.id}>{career.name}</p>
      ))}
     * 
    */

    try {
      const response = await axios.get('/api/v1/carrers')
      console.log(response.data.data.list)
      setCarrers(response.data.data.list)
    } catch (error) {
      console.error('Error al obtener las carreras:', error)
    }
  };

  return (
    <>
      <h1>Listado de Carreras</h1>
      <p>Bienvenido al panel de empresa.</p>
      <NavLink to={`/enterprise/carrers/new`} className={'btn btn-secondary'}>
        <FontAwesomeIcon icon={faPlus} /> Agregar
      </NavLink>
      <table className='table'>
        <thead>
          <th>Id</th>
          <th>Nombre</th>
        </thead>
        <tbody>
          {Array.isArray(carrers) && carrers.map((career) => (
            <tr>
              <td>{career.id}</td>
              <td>{career.name}</td>
              <td>
                <NavLink to={`/enterprise/carrers/${career.id}/edit`} className={linkClass}>
                  <FontAwesomeIcon icon={faPencil} /> Editar
                </NavLink>
                <button className='btn btn-secondary'  onClick={() => borrar(career.id)}>
                  <FontAwesomeIcon icon={faTimes} /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
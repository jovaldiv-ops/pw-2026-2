
 // src/pages/enterprise/DetalleCarrera.jsx
import './DetalleCarrera.css'
import { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function DetalleCarrera() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  const isNew = location.pathname.endsWith('/new')
  const isEdit = id !== undefined && location.pathname.endsWith('/edit')

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Obtener la carrera al entrar en el formulario de edición
  useEffect(() => {
    if (isEdit) {
      getCarrera()
    } else {
      setName('')
    }
  }, [id, isEdit])

  const getCarrera = async () => {
    setLoading(true)

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/carrers/${id}`
      )

      setName(response.data.data.name)
    } catch (error) {
      console.error('Error al obtener la carrera:', error)
      alert('No se pudo obtener la carrera')
    } finally {
      setLoading(false)
    }
  }

  // Crear una carrera
  const crear = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/carrers',
        { name }
      )

      const newId = response.data.data.id

      alert('Carrera creada correctamente')
      navigate(`/enterprise/carrers/${newId}/edit`)
    } catch (error) {
      console.error('Error al crear la carrera:', error)
      alert('No se pudo crear la carrera')
    } finally {
      setSaving(false)
    }
  }

  // Actualizar una carrera
  const editar = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/carrers/${id}`,
        { name }
      )

      console.log('Carrera editada:', response.data)
      alert('Carrera actualizada correctamente')
    } catch (error) {
      console.error('Error al actualizar la carrera:', error)
      alert('No se pudo actualizar la carrera')
    } finally {
      setSaving(false)
    }
  }

  // Formulario reutilizable
  const formulario = (onSubmit, titulo, textoBoton) => (
    <>
      <h1 className="mb-4">{titulo}</h1>

      <form onSubmit={onSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre de la carrera
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Ingeniería de Sistemas"
            required
            disabled={loading || saving}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/enterprise/carrers')}
            disabled={saving}
          >
            Volver
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || saving}
          >
            {saving ? 'Guardando...' : textoBoton}
          </button>
        </div>
      </form>
    </>
  )

  if (isNew) {
    return formulario(crear, 'Crear Carrera', 'Crear carrera')
  }

  if (isEdit) {
    if (loading) {
      return <p>Cargando carrera...</p>
    }

    return formulario(editar, 'Editar Carrera', 'Guardar cambios')
  }

  return <h1>Ruta no válida</h1>
}

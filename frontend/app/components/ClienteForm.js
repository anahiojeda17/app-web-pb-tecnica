'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClienteForm({ clienteInicial, id }) {
  const router = useRouter()
  const [form, setForm] = useState(clienteInicial || {
    nombre: '',
    email: '',
    estado: 'activo'
  })
  const [errores, setErrores] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrores([])

    const url = id
      ? `http://localhost:5114/api/clientes/${id}`
      : 'http://localhost:5114/api/clientes'

    const method = id ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
        router.push('/?exito=' + (id ? 'actualizado' : 'creado'))

    } else {
      const data = await res.json()
      setErrores(Array.isArray(data) ? data : ['Error al guardar'])
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '2rem',
      paddingBottom: '2rem',
    }}>

      {/* Botón volver arriba a la izquierda */}
      <div style={{ width: '100%', maxWidth: '480px', marginBottom: '1rem' }}>
        <button
          type="button"
          onClick={() => router.push('/')}
          style={{
            background: 'transparent',
            border: '1.5px solid #a78bfa',
            color: '#a78bfa',
            padding: '0.4rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#a78bfa'
            e.target.style.color = '#0f0c29'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.color = '#a78bfa'
          }}
        >
          ← Volver al listado
        </button>
      </div>

      {/* Tarjeta */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      }}>

        <h2 style={{
          color: '#fff',
          fontSize: '1.6rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
        }}>
          {id ? '✏️ Editar cliente' : '➕ Nuevo cliente'}
        </h2>
        <p style={{ color: '#a78bfa', marginBottom: '2rem', fontSize: '0.9rem' }}>
          {id ? 'Modificá los datos del cliente' : 'Completá los datos para crear un cliente'}
        </p>

        {errores.length > 0 && (
          <div style={{
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid #ef4444',
            color: '#fca5a5',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
          }}>
            {errores.map((e, i) => <p key={i}>{e}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

          {/* Nombre */}
          <div>
            <label style={{ color: '#c4b5fd', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>
              Nombre
            </label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '0.65rem 1rem',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ color: '#c4b5fd', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ej: juan@email.com"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '0.65rem 1rem',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Estado */}
          <div>
            <label style={{ color: '#c4b5fd', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>
              Estado
            </label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              style={{
                width: '100%',
                background: '#1e1b4b',
                border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '0.65rem 1rem',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.7rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'transform 0.15s, opacity 0.15s',
              }}
              onMouseEnter={e => { if (!loading) e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)' }}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/')}
              style={{
                flex: 1,
                background: 'transparent',
                color: '#a78bfa',
                border: '1.5px solid #a78bfa',
                borderRadius: '8px',
                padding: '0.7rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.target.style.background = '#a78bfa'
                e.target.style.color = '#0f0c29'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#a78bfa'
              }}
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
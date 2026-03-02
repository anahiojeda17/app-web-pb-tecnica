'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const API = 'http://localhost:5114/api/clientes'

export default function Home() {
  const [clientes, setClientes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandido, setExpandido] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [exito, setExito] = useState('')


  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setClientes(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Error al cargar los clientes')
        setLoading(false)
      })
  }, [])

    const pedirConfirmacion = (id) => {
    setConfirmId(id)
    }

    useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('exito')) {
            setExito('✅ Cliente guardado correctamente')
            setTimeout(() => setExito(''), 3000)
            window.history.replaceState({}, '', '/')
    }
    }, [])
    
    const confirmarEliminar = async () => {
    await fetch(`${API}/${confirmId}`, { method: 'DELETE' })
    setClientes(clientes.filter(c => c.id !== confirmId))
    setConfirmId(null)
    setExito('✅ Cliente eliminado correctamente')
    setTimeout(() => setExito(''), 3000)
    }

    const filtrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email.toLowerCase().includes(busqueda.toLowerCase())
  )
/*
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Cargando...</p>
      </div>
    </div>
  )
*/
 // if (error) return <p className="p-8 text-red-500">{error}</p>

if (loading) return (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '4px solid #a78bfa',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <p style={{ color: '#a78bfa', fontSize: '0.95rem' }}>Cargando clientes...</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
  </div>
)

if (error) return (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fca5a5',
    fontSize: '1rem'
  }}>
    ⚠️ {error}
  </div>
)

return (
  <main style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    padding: '3rem 2rem',
    fontFamily: 'Arial, sans-serif'
  }}>
    <style>{`
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .fila { transition: background 0.2s; cursor: pointer; }
      .fila:hover { background: rgba(167,139,250,0.08) !important; }
      .fila-detalle { animation: fadeIn 0.25s ease; }
    `}</style>
     {exito && (
        <div style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(34,197,94,0.15)',
            border: '1px solid rgba(74,222,128,0.4)',
            color: '#4ade80',
            padding: '0.9rem 1.5rem',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '0.95rem',
            zIndex: 1000,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.3s ease',
        }}>
            {exito}
        </div>
    )}

    <div style={{ maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
            <h1 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>👥 Clientes</h1>
            <p style={{ color: '#a78bfa', marginTop: '0.4rem', fontSize: '0.95rem' }}>{clientes.length} clientes registrados</p>
            
            {/* Contador activos / inactivos */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
            <span style={{
                padding: '0.25rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: '700',
                background: 'rgba(34,197,94,0.15)',
                color: '#4ade80',
                border: '1px solid rgba(74,222,128,0.3)',
            }}>
                ● {clientes.filter(c => c.estado === 'activo').length} activos
            </span>
            <span style={{
                padding: '0.25rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: '700',
                background: 'rgba(239,68,68,0.15)',
                color: '#f87171',
                border: '1px solid rgba(248,113,113,0.3)',
            }}>
                ● {clientes.filter(c => c.estado === 'inactivo').length} inactivos
            </span>
            </div>
        </div>

        <Link href="/clientes/nuevo" style={{
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
            transition: 'transform 0.15s',
        }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            + Nuevo cliente
        </Link>
        </div>

      {/* Buscador */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.07)',
            border: '1.5px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            padding: '0.85rem 1rem 0.85rem 2.8rem',
            color: '#fff',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      {busqueda && (
            <p style={{ color: '#7c6faa', fontSize: '0.85rem', marginBottom: '1rem', marginTop: '-1rem' }}>
                {filtrados.length} resultado{filtrados.length !== 1 ? 's' : ''} para "{busqueda}"
            </p>
        )}
 
      {/* Sin resultados */}
      {filtrados.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: '5rem', color: '#a78bfa' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>😶</p>
          <p style={{ fontSize: '1.1rem' }}>No se encontraron clientes</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* Encabezados */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 2fr 1fr 1fr',
            padding: '0.75rem 1.5rem',
            color: '#7c6faa',
            fontSize: '0.78rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
          }}>
            <span>Nombre</span>
            <span>Email</span>
            <span>Estado</span>
            <span>Fecha</span>
          </div>

          {/* Filas */}
          {filtrados.map((c) => (
            <div key={c.id}>

              {/* Fila principal — click para desplegar */}
              <div
                className="fila"
                onClick={() => setExpandido(expandido === c.id ? null : c.id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 2fr 1fr 1fr',
                  padding: '1.2rem 1.5rem',
                  background: expandido === c.id ? 'rgba(167,139,250,0.1)' : 'rgba(255,255,255,0.03)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  alignItems: 'center',
                  borderRadius: expandido === c.id ? '12px 12px 0 0' : '0',
                }}
              >
                <span style={{ color: '#fff', fontWeight: '600', fontSize: '1rem' }}>{c.nombre}</span>
                <span style={{ color: '#c4b5fd', fontSize: '0.9rem' }}>{c.email}</span>
                <span>
                  <span style={{
                    padding: '0.3rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    background: c.estado === 'activo' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                    color: c.estado === 'activo' ? '#4ade80' : '#f87171',
                    border: `1px solid ${c.estado === 'activo' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
                  }}>
                    {c.estado}
                  </span>
                </span>
                <span style={{ color: '#7c6faa', fontSize: '0.88rem' }}>
                  {new Date(c.creadoEn).toLocaleDateString()}
                  <span style={{ marginLeft: '0.75rem', color: '#a78bfa', fontSize: '0.8rem' }}>
                    {expandido === c.id ? '▲' : '▼'}
                  </span>
                </span>
              </div>

              {/* Detalle desplegable */}
              {expandido === c.id && (
                <div className="fila-detalle" style={{
                  background: 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(167,139,250,0.2)',
                  borderTop: 'none',
                  borderRadius: '0 0 12px 12px',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', gap: '2.5rem' }}>
                    <div>
                      <p style={{ color: '#7c6faa', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Nombre completo</p>
                      <p style={{ color: '#fff', fontSize: '1rem' }}>{c.nombre}</p>
                    </div>
                    <div>
                      <p style={{ color: '#7c6faa', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Email</p>
                      <p style={{ color: '#c4b5fd', fontSize: '1rem' }}>{c.email}</p>
                    </div>
                    <div>
                      <p style={{ color: '#7c6faa', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Registrado</p>
                      <p style={{ color: '#c4b5fd', fontSize: '1rem' }}>{new Date(c.creadoEn).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link href={`/clientes/${c.id}`} style={{
                      background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                      color: '#fff',
                      padding: '0.6rem 1.4rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      boxShadow: '0 4px 12px rgba(124,58,237,0.35)',
                    }}>
                      ✏️ Editar
                    </Link>
                    <button
                      onClick={(e) => { e.stopPropagation(); pedirConfirmacion(c.id) }}
                      style={{
                        background: 'rgba(239,68,68,0.15)',
                        color: '#f87171',
                        border: '1px solid rgba(248,113,113,0.3)',
                        padding: '0.6rem 1.4rem',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
        {confirmId && (
    <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    }}>
        <div style={{
        background: 'linear-gradient(135deg, #1e1b4b, #2d2060)',
        border: '1px solid rgba(167,139,250,0.3)',
        borderRadius: '16px',
        padding: '2.5rem',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        textAlign: 'center',
        }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗑️</p>
        <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            ¿Eliminar cliente?
        </h3>
        <p style={{ color: '#a78bfa', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Esta acción no se puede deshacer.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
            onClick={confirmarEliminar}
            style={{
                background: 'linear-gradient(135deg, #dc2626, #f87171)',
                color: '#fff',
                border: 'none',
                padding: '0.7rem 1.8rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(220,38,38,0.35)',
            }}
            >
            Sí, eliminar
            </button>
            <button
            onClick={() => setConfirmId(null)}
            style={{
                background: 'transparent',
                color: '#a78bfa',
                border: '1.5px solid #a78bfa',
                padding: '0.7rem 1.8rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
            }}
            >
            Cancelar
            </button>
        </div>
        </div>
    </div>
    )}
  </main>
)
}
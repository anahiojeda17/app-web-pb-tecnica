'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ClienteForm from '../../components/ClienteForm'

export default function EditarCliente() {
  const { id } = useParams()
  const [cliente, setCliente] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5114/api/clientes/${id}`)
      .then(res => res.json())
      .then(data => {
        setCliente(data)
        setLoading(false)
      })
  }, [id])

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
        <p style={{ color: '#a78bfa', fontSize: '0.95rem' }}>Cargando cliente...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
    )

  return <ClienteForm clienteInicial={cliente} id={id} />
}
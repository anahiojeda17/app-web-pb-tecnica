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
    <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Cargando...</p>
        </div>
    </div>
    )

  return <ClienteForm clienteInicial={cliente} id={id} />
}
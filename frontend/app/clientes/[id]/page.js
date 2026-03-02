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

  if (loading) return <p className="p-8 text-gray-500">Cargando...</p>

  return <ClienteForm clienteInicial={cliente} id={id} />
}
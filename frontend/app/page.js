'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const API = 'http://localhost:5114/api/clientes'

export default function Home() {
  const [clientes, setClientes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const eliminar = async (id) => {
    if (!confirm('¿Seguro que querés eliminar este cliente?')) return
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setClientes(clientes.filter(c => c.id !== id))
  }

  const filtrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (loading) return <p className="p-8 text-gray-500">Cargando clientes...</p>
  if (error) return <p className="p-8 text-red-500">{error}</p>

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link href="/clientes/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nuevo cliente
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-6"
      />

      {filtrados.length === 0 ? (
        <p className="text-gray-500">No se encontraron clientes.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Estado</th>
              <th className="p-3 border">Fecha de creación</th>
              <th className="p-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-3 border">{c.nombre}</td>
                <td className="p-3 border">{c.email}</td>
                <td className="p-3 border">
                  <span className={`px-2 py-1 rounded text-sm ${c.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {c.estado}
                  </span>
                </td>
                <td className="p-3 border">{new Date(c.creadoEn).toLocaleDateString()}</td>
                <td className="p-3 border flex gap-2">
                  <Link href={`/clientes/${c.id}`} className="text-blue-600 hover:underline">Editar</Link>
                  <button onClick={() => eliminar(c.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
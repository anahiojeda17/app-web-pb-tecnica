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
      router.push('/')
    } else {
      const data = await res.json()
      setErrores(Array.isArray(data) ? data : ['Error al guardar'])
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold">{id ? 'Editar cliente' : 'Nuevo cliente'}</h2>

      {errores.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {errores.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Nombre completo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="correo@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
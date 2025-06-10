import React, { useState } from 'react'
import { createExpo } from '../../../services/expo'
import { useNavigate } from 'react-router-dom'

const ExpoManagementForm = () => {
  const [form, setForm] = useState({ title: '', date: '', location: '', description: '', theme: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await createExpo(form)
      navigate('/admin/expos/list')
    } catch {
      setError('Failed to create expo')
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Expo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="date" type="date" value={form.date} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="theme" placeholder="Theme" value={form.theme} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  )
}

export default ExpoManagementForm

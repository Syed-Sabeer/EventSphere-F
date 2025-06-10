import React, { useEffect, useState } from 'react'
import { getExpos, deleteExpo } from '../../../services/expo'
import { useNavigate } from 'react-router-dom'

const ExpoManagementList = () => {
  const [expos, setExpos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getExpos().then(res => {
      setExpos(res.data)
      setLoading(false)
    }).catch(() => {
      setError('Failed to load expos')
      setLoading(false)
    })
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expo?')) return
    try {
      await deleteExpo(id)
      setExpos(expos.filter(e => e._id !== id))
    } catch {
      setError('Failed to delete expo')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{color: 'red'}}>{error}</div>

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Expo Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/expos/new')}>Create New Expo</button>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Theme</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expos.map(expo => (
            <tr key={expo._id} className="border-b">
              <td className="p-2 border font-semibold">{expo.title}</td>
              <td className="p-2 border">{expo.date?.slice(0,10)}</td>
              <td className="p-2 border">{expo.location}</td>
              <td className="p-2 border">{expo.theme}</td>
              <td className="p-2 border">
                <button className="text-blue-600 mr-2" onClick={() => navigate(`/admin/expos/edit/${expo._id}`)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(expo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expos.length === 0 && <div className="text-center text-gray-500 mt-4">No expos found.</div>}
    </div>
  )
}

export default ExpoManagementList

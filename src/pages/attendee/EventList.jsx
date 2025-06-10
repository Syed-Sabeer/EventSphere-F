import React, { useEffect, useState } from 'react'
import { getExpos } from '../../services/expo'
import { registerForExpo } from '../../services/attendee'

const EventList = () => {
  const [expos, setExpos] = useState([])
  const [registered, setRegistered] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getExpos().then(res => {
      setExpos(res.data)
      setLoading(false)
    })
  }, [])

  const handleRegister = async (expoId) => {
    await registerForExpo(expoId)
    setRegistered([...registered, expoId])
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Available Events</h2>
      <ul>
        {expos.map(expo => (
          <li key={expo._id}>
            {expo.title} - {expo.date?.slice(0,10)}
            <button disabled={registered.includes(expo._id)} onClick={() => handleRegister(expo._id)}>
              {registered.includes(expo._id) ? 'Registered' : 'Register'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventList

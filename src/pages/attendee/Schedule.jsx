import React, { useEffect, useState } from 'react'
import { getSchedules } from '../../services/schedule'

const AttendeeSchedule = () => {
  const [expoId, setExpoId] = useState('')
  const [schedules, setSchedules] = useState([])

  const fetchSchedules = async () => {
    if (expoId) {
      const res = await getSchedules(expoId)
      setSchedules(res.data)
    }
  }

  useEffect(() => {
    fetchSchedules()
    // eslint-disable-next-line
  }, [expoId])

  return (
    <div>
      <h2>Event Schedule</h2>
      <input
        placeholder="Expo ID"
        value={expoId}
        onChange={e => setExpoId(e.target.value)}
      />
      <button onClick={fetchSchedules}>Load Schedule</button>
      <ul>
        {schedules.map(s => (
          <li key={s._id}>
            {s.title} - {s.timeSlot} - {s.topic} - {s.location}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AttendeeSchedule

import React, { useEffect, useState } from 'react'
import { getExpos } from '../../services/expo'
import { getBooths, createBooth } from '../../services/booth'

const BoothSelection = () => {
  const [expos, setExpos] = useState([])
  const [selectedExpo, setSelectedExpo] = useState('')
  const [booths, setBooths] = useState([])
  const [newBooth, setNewBooth] = useState({ number: '', location: '', details: '' })
  const [success, setSuccess] = useState('')

  useEffect(() => {
    getExpos().then(res => setExpos(res.data))
  }, [])

  useEffect(() => {
    if (selectedExpo) {
      getBooths(selectedExpo).then(res => setBooths(res.data))
    }
  }, [selectedExpo])

  const handleCreate = async (e) => {
    e.preventDefault()
    await createBooth({ ...newBooth, expo: selectedExpo })
    setSuccess('Booth reserved!')
    setNewBooth({ number: '', location: '', details: '' })
    getBooths(selectedExpo).then(res => setBooths(res.data))
  }

  return (
    <div style={{maxWidth: 600, margin: '40px auto'}}>
      <h2>Booth Selection & Management</h2>
      <select value={selectedExpo} onChange={e => setSelectedExpo(e.target.value)}>
        <option value="">Select Expo</option>
        {expos.map(expo => <option key={expo._id} value={expo._id}>{expo.title}</option>)}
      </select>
      {selectedExpo && (
        <React.Fragment>
          <h3>Available Booths</h3>
          <ul>
            {booths.map(booth => (
              <li key={booth._id}>{booth.number} - {booth.location} - {booth.details}</li>
            ))}
          </ul>
          <form onSubmit={handleCreate} style={{marginTop: 16}}>
            <input placeholder="Booth Number" value={newBooth.number} onChange={e => setNewBooth({ ...newBooth, number: e.target.value })} required />
            <input placeholder="Location" value={newBooth.location} onChange={e => setNewBooth({ ...newBooth, location: e.target.value })} required />
            <input placeholder="Details" value={newBooth.details} onChange={e => setNewBooth({ ...newBooth, details: e.target.value })} />
            <button type="submit">Reserve Booth</button>
          </form>
          {success && <div style={{color: 'green'}}>{success}</div>}
        </React.Fragment>
      )}
    </div>
  )
}

export default BoothSelection

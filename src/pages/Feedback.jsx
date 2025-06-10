import React, { useState } from 'react'
import API from '../services/api'

const Feedback = () => {
  const [message, setMessage] = useState('')
  const [type, setType] = useState('suggestion')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess('')
    setError('')
    try {
      await API.post('/feedback', { message, type })
      setSuccess('Feedback submitted!')
      setMessage('')
    } catch {
      setError('Failed to submit feedback')
    }
  }

  return (
    <div style={{maxWidth: 400, margin: '40px auto'}}>
      <h2>Feedback & Support</h2>
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="suggestion">Suggestion</option>
          <option value="issue">Issue</option>
          <option value="other">Other</option>
        </select>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your feedback..." required style={{width: '100%', minHeight: 80, margin: '12px 0'}} />
        <button type="submit">Submit</button>
      </form>
      {success && <div style={{color: 'green'}}>{success}</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  )
}

export default Feedback

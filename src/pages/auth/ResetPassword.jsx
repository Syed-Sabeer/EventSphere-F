import React, { useState } from 'react'
import GuestLayout from '../../layouts/GuestLayout'
import { resetPassword } from '../../services/api'
import { useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess('')
    setError('')
    try {
      await resetPassword(token, { password })
      setSuccess('Password reset successful!')
      setTimeout(() => navigate('/login'), 1500)
    } catch {
      setError('Failed to reset password')
    }
  }

  return (
    <GuestLayout>
      <div style={{maxWidth: 400, margin: '40px auto'}}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
        </form>
        {success && <div style={{color: 'green'}}>{success}</div>}
        {error && <div style={{color: 'red'}}>{error}</div>}
      </div>
    </GuestLayout>
  )
}

export default ResetPassword

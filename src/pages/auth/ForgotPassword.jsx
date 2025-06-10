import React, { useState } from 'react'
import GuestLayout from '../../layouts/GuestLayout'
import { forgotPassword } from '../../services/api'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess('')
    setError('')
    try {
      await forgotPassword({ email })
      setSuccess('Password reset email sent!')
    } catch {
      setError('Failed to send reset email')
    }
  }

  return (
    <GuestLayout>
      <div style={{maxWidth: 400, margin: '40px auto'}}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit">Send Reset Link</button>
        </form>
        {success && <div style={{color: 'green'}}>{success}</div>}
        {error && <div style={{color: 'red'}}>{error}</div>}
      </div>
    </GuestLayout>
  )
}

export default ForgotPassword

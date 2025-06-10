import React from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <AuthenticatedLayout>
      <div style={{padding: 32}}>
        <h1>Welcome to EventSphere Management</h1>
        <p>Select your portal:</p>
        <div style={{display: 'flex', gap: 24, justifyContent: 'center', marginTop: 32}}>
          <Link to="/admin/dashboard" style={{padding: 16, border: '1px solid #007bff', borderRadius: 8, textDecoration: 'none'}}>Admin/Organizer Portal</Link>
          <Link to="/exhibitor/dashboard" style={{padding: 16, border: '1px solid #28a745', borderRadius: 8, textDecoration: 'none'}}>Exhibitor Portal</Link>
          <Link to="/attendee/dashboard" style={{padding: 16, border: '1px solid #ffc107', borderRadius: 8, textDecoration: 'none'}}>Attendee Portal</Link>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Welcome
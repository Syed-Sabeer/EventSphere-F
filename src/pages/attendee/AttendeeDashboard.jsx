import React from 'react'
import { Link } from 'react-router-dom'

const AttendeeDashboard = () => (
  <div style={{padding: 32}}>
    <h1>Attendee Portal</h1>
    <ul style={{marginTop: 24}}>
      <li><Link to="/attendee/events">Event Info & Registration</Link></li>
      <li><Link to="/attendee/exhibitors">Exhibitor Search & Interaction</Link></li>
      <li><Link to="/attendee/schedule">Schedule Management</Link></li>
      <li><Link to="/feedback">Feedback & Support</Link></li>
    </ul>
  </div>
)

export default AttendeeDashboard

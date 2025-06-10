import React from 'react'
import { Link } from 'react-router-dom'

const ExhibitorDashboard = () => (
  <div style={{padding: 32}}>
    <h1>Exhibitor Portal</h1>
    <ul style={{marginTop: 24}}>
      <li><Link to="/exhibitor/profile">Profile & Registration</Link></li>
      <li><Link to="/exhibitor/booths">Booth Selection & Management</Link></li>
      <li><Link to="/exhibitor/communication">Communication</Link></li>
      <li><Link to="/feedback">Feedback & Support</Link></li>
    </ul>
  </div>
)

export default ExhibitorDashboard

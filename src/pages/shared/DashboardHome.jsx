import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from '../admin/AdminDashboard';
import OrganizerDashboard from '../organizer/OrganizerDashboard';
import ExhibitorDashboard from '../exhibitor/ExhibitorDashboard';
import AttendeeDashboard from '../attendee/AttendeeDashboard';

const DashboardHome = () => {
  const { isAdmin, isOrganizer, isExhibitor, isAttendee } = useAuth();

  if (isAdmin()) {
    return <AdminDashboard />;
  }
  
  if (isOrganizer()) {
    return <OrganizerDashboard />;
  }
  
  if (isExhibitor()) {
    return <ExhibitorDashboard />;
  }
  
  if (isAttendee()) {
    return <AttendeeDashboard />;
  }

  // Fallback for users without proper roles
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Welcome to EventSphere! Please contact support if you're seeing this message.
      </p>
    </div>
  );
};

export default DashboardHome; 
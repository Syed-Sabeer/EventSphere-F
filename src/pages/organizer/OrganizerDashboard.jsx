import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPlus, 
  FaUsers, 
  FaCalendarAlt, 
  FaBuilding
} from 'react-icons/fa';

const OrganizerDashboard = () => {
  const quickActions = [
    {
      title: 'Create New Expo',
      description: 'Set up a new exhibition or trade show',
      icon: FaPlus,
      href: '/dashboard/create-expo',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Manage Expos',
      description: 'View and edit your existing expos',
      icon: FaBuilding,
      href: '/dashboard/my-expos',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Review Applications',
      description: 'Approve or reject exhibitor applications',
      icon: FaUsers,
      href: '/dashboard/exhibitor-applications',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      title: 'Schedule Management',
      description: 'Manage event schedules and sessions',
      icon: FaCalendarAlt,
      href: '/dashboard/schedule',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  const statCards = [
    {
      title: 'Total Expos',
      value: 5,
      icon: FaBuilding,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      title: 'Active Expos',
      value: 2,
      icon: FaBuilding,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'Total Exhibitors',
      value: 45,
      icon: FaUsers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      title: 'Pending Applications',
      value: 8,
      icon: FaUsers,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Organizer Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your exhibitions and trade shows
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.bgColor} rounded-lg p-3 mr-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className={`${action.color} text-white rounded-lg p-6 transition-colors duration-200 transform hover:scale-105`}
            >
              <action.icon className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Test Message */}
      <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded">
        ✅ Organizer Dashboard is working! The layout and routing are functional.
      </div>
    </div>
  );
};

export default OrganizerDashboard; 
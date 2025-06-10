import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, Navbar, Button, Dropdown, Avatar, Badge } from 'flowbite-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  HiHome, HiOfficeBuilding, HiUsers, HiChartBar, HiCog, HiLogout, 
  HiMenu, HiX, HiBell, HiMail, HiSun, HiMoon, HiUser, HiCalendar,
  HiTicket, HiUserGroup, HiCollection, HiClipboardList, HiSpeakerphone,
  HiChatAlt, HiSupport, HiEye, HiDocumentReport, HiTrendingUp
} from 'react-icons/hi';

const DashboardLayout = () => {
  const { user, logout, isAdmin, isOrganizer, isExhibitor, isAttendee } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getMenuItems = () => {
    const baseItems = [
      { href: '/dashboard/home', icon: HiHome, label: 'Dashboard' },
      { href: '/dashboard/profile', icon: HiUser, label: 'Profile' },
      { href: '/dashboard/messages', icon: HiMail, label: 'Messages' },
      { href: '/dashboard/notifications', icon: HiBell, label: 'Notifications' },
      { href: '/dashboard/feedback', icon: HiSupport, label: 'Support' },
    ];

    let roleSpecificItems = [];

    if (isAdmin()) {
      roleSpecificItems = [
        { href: '/dashboard/expos', icon: HiOfficeBuilding, label: 'Expo Management' },
        { href: '/dashboard/users', icon: HiUsers, label: 'User Management' },
        { href: '/dashboard/analytics', icon: HiChartBar, label: 'Analytics & Reports' },
      ];
    } else if (isOrganizer()) {
      roleSpecificItems = [
        { href: '/dashboard/create-expo', icon: HiOfficeBuilding, label: 'Create Expo' },
        { href: '/dashboard/my-expos', icon: HiCollection, label: 'My Expos' },
        { href: '/dashboard/exhibitor-applications', icon: HiClipboardList, label: 'Applications' },
        { href: '/dashboard/attendees', icon: HiUserGroup, label: 'Attendees' },
        { href: '/dashboard/booths', icon: HiTicket, label: 'Booth Management' },
        { href: '/dashboard/schedule', icon: HiCalendar, label: 'Schedule' },
      ];
    } else if (isExhibitor()) {
      roleSpecificItems = [
        { href: '/dashboard/company-profile', icon: HiUser, label: 'Company Profile' },
        { href: '/dashboard/applications', icon: HiClipboardList, label: 'My Applications' },
        { href: '/dashboard/booth', icon: HiTicket, label: 'My Booth' },
        { href: '/dashboard/exhibitor-analytics', icon: HiTrendingUp, label: 'Analytics' },
      ];
    } else if (isAttendee()) {
      roleSpecificItems = [
        { href: '/dashboard/registrations', icon: HiTicket, label: 'My Registrations' },
        { href: '/dashboard/sessions', icon: HiCalendar, label: 'Session Schedule' },
        { href: '/dashboard/exhibitors', icon: HiOfficeBuilding, label: 'Exhibitor Directory' },
        { href: '/dashboard/networking', icon: HiUserGroup, label: 'Networking' },
      ];
    }

    return [...baseItems.slice(0, 1), ...roleSpecificItems, ...baseItems.slice(1)];
  };

  const getRoleDisplay = () => {
    if (isAdmin()) return 'Administrator';
    if (isOrganizer()) return 'Organizer';
    if (isExhibitor()) return 'Exhibitor';
    if (isAttendee()) return 'Attendee';
    return 'User';
  };

  const getRoleBadgeColor = () => {
    if (isAdmin()) return 'red';
    if (isOrganizer()) return 'blue';
    if (isExhibitor()) return 'green';
    if (isAttendee()) return 'purple';
    return 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:inset-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                EventSphere
              </span>
            </Link>
            <Button
              color="gray"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <HiX className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Avatar
                alt={user?.firstName || 'User'}
                img={user?.avatar}
                rounded
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <Badge color={getRoleBadgeColor()} size="sm">
                  {getRoleDisplay()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {getMenuItems().map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Settings & Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Button
              color="gray"
              size="sm"
              onClick={toggleTheme}
              className="w-full justify-start"
            >
              {theme === 'dark' ? <HiSun className="mr-2 h-4 w-4" /> : <HiMoon className="mr-2 h-4 w-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button
              color="red"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <HiLogout className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Button
                color="gray"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <HiMenu className="h-5 w-5" />
              </Button>
              <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white lg:ml-0">
                {getRoleDisplay()} Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button color="gray" size="sm" className="relative">
                <HiBell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Messages */}
              <Button color="gray" size="sm" className="relative">
                <HiMail className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full"></span>
              </Button>

              {/* User Menu */}
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt={user?.firstName || 'User'}
                    img={user?.avatar}
                    rounded
                    size="sm"
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="block text-sm text-gray-500 truncate">
                    {user?.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item as={Link} to="/dashboard/profile">
                  <HiUser className="mr-2 h-4 w-4" />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/dashboard/settings">
                  <HiCog className="mr-2 h-4 w-4" />
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <HiLogout className="mr-2 h-4 w-4" />
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 
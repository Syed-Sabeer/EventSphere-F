import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Table } from 'flowbite-react';
import { 
  HiOfficeBuilding, 
  HiUsers, 
  HiTicket, 
  HiTrendingUp,
  HiPlus,
  HiEye,
  HiPencil
} from 'react-icons/hi';
import { analyticsAPI, expoAPI, userAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboard = () => {
  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading } = useQuery(
    'admin-dashboard-stats',
    analyticsAPI.getDashboardStats,
    {
      refetchInterval: 300000, // Refetch every 5 minutes
    }
  );

  const { data: recentExpos, isLoading: exposLoading } = useQuery(
    'recent-expos',
    () => expoAPI.getExpos({ limit: 5, sortBy: 'createdAt', order: 'desc' })
  );

  const { data: recentUsers, isLoading: usersLoading } = useQuery(
    'recent-users',
    () => userAPI.getUsers()
  );

  if (statsLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  const dashboardStats = stats?.data?.data || {
    totalExpos: 0,
    totalUsers: 0,
    totalExhibitors: 0,
    totalAttendees: 0,
    monthlyRevenue: 0,
    activeExpos: 0
  };

  const statsCards = [
    {
      title: 'Total Expos',
      value: dashboardStats.totalExpos,
      icon: HiOfficeBuilding,
      color: 'blue',
      trend: '+12%',
      trendColor: 'green'
    },
    {
      title: 'Total Users',
      value: dashboardStats.totalUsers,
      icon: HiUsers,
      color: 'green',
      trend: '+8%',
      trendColor: 'green'
    },
    {
      title: 'Active Exhibitors',
      value: dashboardStats.totalExhibitors,
      icon: HiTicket,
      color: 'purple',
      trend: '+15%',
      trendColor: 'green'
    },
    {
      title: 'Monthly Revenue',
      value: `$${dashboardStats.monthlyRevenue?.toLocaleString() || 0}`,
      icon: HiTrendingUp,
      color: 'yellow',
      trend: '+22%',
      trendColor: 'green'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Expo',
      description: 'Set up a new trade show or exhibition',
      href: '/dashboard/expos/create',
      icon: HiPlus,
      color: 'blue'
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      href: '/dashboard/users',
      icon: HiUsers,
      color: 'green'
    },
    {
      title: 'View Analytics',
      description: 'Detailed reports and insights',
      href: '/dashboard/analytics',
      icon: HiTrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening in your platform.
          </p>
        </div>
        <Button
          as={Link}
          to="/dashboard/expos/create"
          className="flex items-center gap-2"
        >
          <HiPlus className="w-4 h-4" />
          Create Expo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium text-${stat.trendColor}-600`}>
                    {stat.trend}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className={`p-2 bg-${action.color}-100 dark:bg-${action.color}-900 rounded-lg mr-4`}>
                  <action.icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Recent Expos */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Expos
            </h2>
            <Button
              as={Link}
              to="/dashboard/expos"
              size="sm"
              color="gray"
            >
              View All
            </Button>
          </div>
          
          {exposLoading ? (
            <LoadingSpinner fullScreen={false} text="Loading expos..." />
          ) : (
            <div className="space-y-3">
              {recentExpos?.data?.data?.slice(0, 5).map((expo) => (
                <div
                  key={expo._id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {expo.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {expo.location} • {new Date(expo.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge color={expo.status === 'active' ? 'green' : 'gray'}>
                      {expo.status}
                    </Badge>
                    <Button
                      as={Link}
                      to={`/dashboard/expos/${expo._id}`}
                      size="xs"
                      color="gray"
                    >
                      <HiEye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {(!recentExpos?.data?.data || recentExpos.data.data.length === 0) && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No expos found. Create your first expo!
                </p>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Recent Users Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Users
          </h2>
          <Button
            as={Link}
            to="/dashboard/users"
            size="sm"
            color="gray"
          >
            Manage Users
          </Button>
        </div>

        {usersLoading ? (
          <LoadingSpinner fullScreen={false} text="Loading users..." />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {recentUsers?.data?.data?.slice(0, 5).map((user) => (
                  <Table.Row
                    key={user._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      <Badge color={
                        user.role === 'admin' ? 'red' :
                        user.role === 'organizer' ? 'blue' :
                        user.role === 'exhibitor' ? 'green' : 'purple'
                      }>
                        {user.role}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color={user.status === 'active' ? 'green' : 'gray'}>
                        {user.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        as={Link}
                        to={`/dashboard/users/${user._id}`}
                        size="xs"
                        color="gray"
                      >
                        <HiPencil className="w-3 h-3" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {(!recentUsers?.data?.data || recentUsers.data.data.length === 0) && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No users found.
              </p>
            )}
          </div>
        )}
      </Card>
  </div>
  );
};

export default AdminDashboard;

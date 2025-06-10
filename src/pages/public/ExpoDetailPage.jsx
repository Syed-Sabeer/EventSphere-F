import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Card, Button, Badge, Tabs, Table } from 'flowbite-react';
import { 
  HiCalendar, 
  HiLocationMarker, 
  HiUsers, 
  HiTicket, 
  HiClock,
  HiOfficeBuilding,
  HiStar,
  HiShare
} from 'react-icons/hi';
import { expoAPI, exhibitorAPI, scheduleAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ExpoDetailPage = () => {
  const { id } = useParams();

  // Fetch expo details
  const { data: expoData, isLoading: expoLoading, error } = useQuery(
    ['expo', id],
    () => expoAPI.getExpo(id),
    {
      enabled: !!id,
    }
  );

  // Fetch exhibitors
  const { data: exhibitorsData, isLoading: exhibitorsLoading } = useQuery(
    ['expo-exhibitors', id],
    () => exhibitorAPI.getExhibitors(id),
    {
      enabled: !!id,
    }
  );

  // Fetch schedule
  const { data: scheduleData, isLoading: scheduleLoading } = useQuery(
    ['expo-schedule', id],
    () => scheduleAPI.getSessions(id),
    {
      enabled: !!id,
    }
  );

  if (expoLoading) {
    return <LoadingSpinner text="Loading expo details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-red-600 dark:text-red-400">
            Error loading expo details. Please try again later.
          </p>
          <Button as={Link} to="/expos" className="mt-4">
            Back to Expos
          </Button>
        </Card>
      </div>
    );
  }

  const expo = expoData?.data?.data;
  const exhibitors = exhibitorsData?.data?.data || [];
  const sessions = scheduleData?.data?.data || [];

  if (!expo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Expo not found.
          </p>
          <Button as={Link} to="/expos" className="mt-4">
            Back to Expos
          </Button>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'blue';
      case 'active': return 'green';
      case 'completed': return 'gray';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="h-64 md:h-96 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg overflow-hidden">
            {expo.image ? (
              <img
                src={expo.image}
                alt={expo.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <HiTicket className="w-16 h-16 mx-auto mb-4" />
                  <h1 className="text-4xl font-bold">{expo.title}</h1>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white">
                <Badge color={getStatusColor(expo.status)} className="mb-2">
                  {expo.status}
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{expo.title}</h1>
                <p className="text-xl opacity-90">{expo.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs.Group aria-label="Expo details" style="underline">
              {/* Overview Tab */}
              <Tabs.Item active title="Overview" icon={HiTicket}>
                <div className="space-y-6">
                  {/* Description */}
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      About This Expo
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {expo.description}
                    </p>
                  </Card>

                  {/* Key Information */}
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Event Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <HiCalendar className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Dates</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {formatDate(expo.startDate)} - {formatDate(expo.endDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <HiLocationMarker className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Location</p>
                          <p className="text-gray-600 dark:text-gray-400">{expo.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <HiUsers className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Expected Attendees</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {expo.expectedAttendees || 'TBA'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <HiOfficeBuilding className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Category</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {expo.category || 'General'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Tabs.Item>

              {/* Exhibitors Tab */}
              <Tabs.Item title="Exhibitors" icon={HiOfficeBuilding}>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Exhibitors ({exhibitors.length})
                    </h2>
                  </div>
                  
                  {exhibitorsLoading ? (
                    <LoadingSpinner fullScreen={false} text="Loading exhibitors..." />
                  ) : exhibitors.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No exhibitors registered yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exhibitors.map((exhibitor) => (
                        <div
                          key={exhibitor._id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {exhibitor.companyName}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {exhibitor.industry}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Booth: {exhibitor.boothNumber || 'TBA'}
                              </p>
                            </div>
                            <Badge color="green" size="sm">
                              {exhibitor.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </Tabs.Item>

              {/* Schedule Tab */}
              <Tabs.Item title="Schedule" icon={HiClock}>
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Event Schedule
                  </h2>
                  
                  {scheduleLoading ? (
                    <LoadingSpinner fullScreen={false} text="Loading schedule..." />
                  ) : sessions.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      Schedule will be available soon.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <Table.Head>
                          <Table.HeadCell>Time</Table.HeadCell>
                          <Table.HeadCell>Session</Table.HeadCell>
                          <Table.HeadCell>Speaker</Table.HeadCell>
                          <Table.HeadCell>Location</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {sessions.map((session) => (
                            <Table.Row
                              key={session._id}
                              className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                              <Table.Cell className="whitespace-nowrap font-medium">
                                {formatTime(session.startTime)} - {formatTime(session.endTime)}
                              </Table.Cell>
                              <Table.Cell>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {session.title}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {session.description}
                                  </p>
                                </div>
                              </Table.Cell>
                              <Table.Cell>{session.speaker || 'TBA'}</Table.Cell>
                              <Table.Cell>{session.location || 'Main Hall'}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </div>
                  )}
                </Card>
              </Tabs.Item>
            </Tabs.Group>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Registration
              </h3>
              
              {expo.pricing && (
                <div className="mb-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {expo.pricing.attendee === 0 ? 'Free' : `$${expo.pricing.attendee}`}
                    </p>
                    <p className="text-sm text-gray-500">per attendee</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {expo.status === 'upcoming' ? (
                  <>
                    <Button
                      as={Link}
                      to={`/auth/register?redirect=/expos/${id}/register`}
                      className="w-full"
                      size="lg"
                    >
                      Register as Attendee
                    </Button>
                    <Button
                      as={Link}
                      to={`/auth/register?redirect=/expos/${id}/exhibit`}
                      color="green"
                      className="w-full"
                      size="lg"
                    >
                      Apply as Exhibitor
                    </Button>
                  </>
                ) : expo.status === 'active' ? (
                  <Button disabled className="w-full" size="lg">
                    Event in Progress
                  </Button>
                ) : (
                  <Button disabled className="w-full" size="lg">
                    Registration Closed
                  </Button>
                )}
              </div>
            </Card>

            {/* Share Card */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Share This Event
              </h3>
              <Button
                color="gray"
                className="w-full"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: expo.title,
                      text: expo.description,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
              >
                <HiShare className="w-4 h-4 mr-2" />
                Share Event
              </Button>
            </Card>

            {/* Organizer Info */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Organizer
              </h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <HiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {expo.organizer?.companyName || expo.organizer?.firstName + ' ' + expo.organizer?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Event Organizer
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpoDetailPage; 
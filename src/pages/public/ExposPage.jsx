import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Card, Button, TextInput, Select, Badge, Pagination } from 'flowbite-react';
import { HiSearch, HiCalendar, HiLocationMarker, HiUsers, HiTicket } from 'react-icons/hi';
import { expoAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ExposPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('startDate');
  const itemsPerPage = 12;

  // Fetch expos with filters
  const { data: exposData, isLoading, error } = useQuery(
    ['public-expos', searchTerm, statusFilter, categoryFilter, currentPage, sortBy],
    () => expoAPI.getPublicExpos({
      search: searchTerm,
      status: statusFilter !== 'all' ? statusFilter : undefined,
      category: categoryFilter !== 'all' ? categoryFilter : undefined,
      page: currentPage,
      limit: itemsPerPage,
      sortBy,
      order: 'asc'
    }),
    {
      keepPreviousData: true,
    }
  );

  const expos = exposData?.data?.data || [];
  const totalPages = Math.ceil((exposData?.data?.total || 0) / itemsPerPage);

  const categories = [
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Automotive',
    'Food & Beverage',
    'Fashion',
    'Education',
    'Real Estate',
    'Finance',
    'Other'
  ];

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

  if (isLoading && currentPage === 1) {
    return <LoadingSpinner text="Loading expos..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Amazing Expos & Trade Shows
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find the perfect events to showcase your business, discover new products, 
            or network with industry professionals.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <TextInput
                icon={HiSearch}
                placeholder="Search expos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Select>

            {/* Category Filter */}
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>

            {/* Sort */}
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="startDate">Start Date</option>
              <option value="title">Name</option>
              <option value="createdAt">Recently Added</option>
            </Select>
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {exposData?.data?.total || 0} expos found
          </p>
          {isLoading && (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-sm text-gray-500">Loading...</span>
            </div>
          )}
        </div>

        {/* Expos Grid */}
        {error ? (
          <Card className="p-8 text-center">
            <p className="text-red-600 dark:text-red-400">
              Error loading expos. Please try again later.
            </p>
          </Card>
        ) : expos.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No expos found matching your criteria.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {expos.map((expo) => (
              <Card key={expo._id} className="hover:shadow-lg transition-shadow">
                {/* Expo Image */}
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                  {expo.image ? (
                    <img
                      src={expo.image}
                      alt={expo.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="text-white text-center">
                      <HiTicket className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-semibold">Expo Image</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge color={getStatusColor(expo.status)}>
                      {expo.status}
                    </Badge>
                    {expo.category && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {expo.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {expo.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {expo.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <HiCalendar className="w-4 h-4 mr-2" />
                      {formatDate(expo.startDate)} - {formatDate(expo.endDate)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <HiLocationMarker className="w-4 h-4 mr-2" />
                      {expo.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <HiUsers className="w-4 h-4 mr-2" />
                      {expo.attendeeCount || 0} attendees
                    </div>
                  </div>

                  {/* Pricing */}
                  {expo.pricing && (
                    <div className="mb-4">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {expo.pricing.attendee === 0 ? 'Free' : `$${expo.pricing.attendee}`}
                      </p>
                      <p className="text-sm text-gray-500">per attendee</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      as={Link}
                      to={`/expos/${expo._id}`}
                      className="flex-1"
                      size="sm"
                    >
                      View Details
                    </Button>
                    {expo.status === 'upcoming' && (
                      <Button
                        as={Link}
                        to={`/expos/${expo._id}/register`}
                        color="green"
                        size="sm"
                        className="flex-1"
                      >
                        Register
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showIcons
            />
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 p-8 text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Want to organize your own expo?
          </h2>
          <p className="text-blue-100 mb-6">
            Join thousands of successful organizers using EventSphere to create amazing events.
          </p>
          <Button
            as={Link}
            to="/auth/register"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Started
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ExposPage; 
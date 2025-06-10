import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { 
  HiOfficeBuilding, 
  HiUsers, 
  HiChartBar, 
  HiGlobeAlt,
  HiCalendar,
  HiTicket,
  HiUserGroup,
  HiTrendingUp
} from 'react-icons/hi';

const HomePage = () => {
  const features = [
    {
      icon: HiOfficeBuilding,
      title: 'Expo Management',
      description: 'Create, manage, and promote your trade shows and expos with comprehensive tools.'
    },
    {
      icon: HiTicket,
      title: 'Booth Allocation',
      description: 'Interactive floor plans and automated booth assignment system for exhibitors.'
    },
    {
      icon: HiUsers,
      title: 'Exhibitor Portal',
      description: 'Dedicated portal for exhibitors to manage applications, profiles, and analytics.'
    },
    {
      icon: HiUserGroup,
      title: 'Attendee Experience',
      description: 'Seamless registration, networking tools, and personalized event recommendations.'
    },
    {
      icon: HiCalendar,
      title: 'Schedule Management',
      description: 'Manage sessions, speakers, and attendee bookings with real-time updates.'
    },
    {
      icon: HiChartBar,
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics and reporting for data-driven decision making.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Events Hosted' },
    { number: '10K+', label: 'Exhibitors' },
    { number: '100K+', label: 'Attendees' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Revolutionize Your 
              <span className="block text-yellow-300">Expo Experience</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              The complete platform for organizing, exhibiting, and attending trade shows. 
              Connect, showcase, and grow your business like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                to="/auth/register"
                size="xl"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Started Free
              </Button>
              <Button
                as={Link}
                to="/expos"
                size="xl"
                color="light"
                outline
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Browse Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From planning to execution, our comprehensive platform provides all the tools 
              you need to create unforgettable expo experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Every Role
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Whether you're organizing, exhibiting, or attending, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Organizers */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOfficeBuilding className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Organizers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Plan and execute successful events with our comprehensive management tools.
              </p>
              <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                <li>• Event creation and management</li>
                <li>• Exhibitor application handling</li>
                <li>• Attendee registration management</li>
                <li>• Real-time analytics and reporting</li>
              </ul>
              <Button
                as={Link}
                to="/auth/register"
                color="blue"
                className="w-full"
              >
                Start Organizing
              </Button>
            </Card>

            {/* Exhibitors */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiTrendingUp className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Exhibitors
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Showcase your products and connect with potential customers effectively.
              </p>
              <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                <li>• Easy application process</li>
                <li>• Booth selection and management</li>
                <li>• Lead generation tools</li>
                <li>• Performance analytics</li>
              </ul>
              <Button
                as={Link}
                to="/auth/register"
                color="green"
                className="w-full"
              >
                Start Exhibiting
              </Button>
            </Card>

            {/* Attendees */}
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiUserGroup className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Attendees
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Discover amazing products, network with industry leaders, and learn.
              </p>
              <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                <li>• Easy event discovery</li>
                <li>• Personalized schedules</li>
                <li>• Networking opportunities</li>
                <li>• Digital business cards</li>
              </ul>
              <Button
                as={Link}
                to="/auth/register"
                color="purple"
                className="w-full"
              >
                Start Attending
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Expo Experience?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful organizers, exhibitors, and attendees who trust EventSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/auth/register"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started Free
            </Button>
            <Button
              as={Link}
              to="#contact"
              size="xl"
              color="light"
              outline
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sales
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                sales@eventsphere.com
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                support@eventsphere.com
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Phone
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
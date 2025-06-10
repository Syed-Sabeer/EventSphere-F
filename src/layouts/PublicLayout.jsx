import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar, Button, Footer } from 'flowbite-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { HiSun, HiMoon, HiUser, HiLogout } from 'react-icons/hi';

const PublicLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Bar */}
      <Navbar fluid rounded className="bg-white dark:bg-gray-800 shadow-md">
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="EventSphere Logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
            EventSphere
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 gap-2">
          {/* Theme Toggle */}
          <Button
            color="gray"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
          >
            {theme === 'dark' ? (
              <HiSun className="h-5 w-5" />
            ) : (
              <HiMoon className="h-5 w-5" />
            )}
          </Button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button
                as={Link}
                to="/dashboard"
                color="blue"
                size="sm"
                className="flex items-center gap-2"
              >
                <HiUser className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                color="gray"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <HiLogout className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                as={Link}
                to="/auth/login"
                color="blue"
                size="sm"
                outline
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/auth/register"
                color="blue"
                size="sm"
              >
                Register
              </Button>
            </div>
          )}

          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link
            as={Link}
            to="/"
            active={location.pathname === '/'}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/expos"
            active={location.pathname === '/expos'}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Expos & Trade Shows
          </Navbar.Link>
          <Navbar.Link
            href="#features"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Features
          </Navbar.Link>
          <Navbar.Link
            href="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            About
          </Navbar.Link>
          <Navbar.Link
            href="#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer container className="bg-white dark:bg-gray-800 shadow-md mt-auto">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                as={Link}
                to="/"
                src="/logo.svg"
                alt="EventSphere Logo"
                name="EventSphere"
                className="text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="Platform" className="text-gray-900 dark:text-white" />
                <Footer.LinkGroup col>
                  <Footer.Link as={Link} to="/expos">Browse Expos</Footer.Link>
                  <Footer.Link as={Link} to="/auth/register">Get Started</Footer.Link>
                  <Footer.Link href="#features">Features</Footer.Link>
                  <Footer.Link href="#pricing">Pricing</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Support" className="text-gray-900 dark:text-white" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#help">Help Center</Footer.Link>
                  <Footer.Link href="#contact">Contact Us</Footer.Link>
                  <Footer.Link href="#documentation">Documentation</Footer.Link>
                  <Footer.Link href="#api">API</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" className="text-gray-900 dark:text-white" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#privacy">Privacy Policy</Footer.Link>
                  <Footer.Link href="#terms">Terms of Service</Footer.Link>
                  <Footer.Link href="#cookies">Cookie Policy</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              by="EventSphere Management™"
              year={new Date().getFullYear()}
              className="text-gray-600 dark:text-gray-400"
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={() => <span>📧</span>} />
              <Footer.Icon href="#" icon={() => <span>🐦</span>} />
              <Footer.Icon href="#" icon={() => <span>📘</span>} />
              <Footer.Icon href="#" icon={() => <span>🔗</span>} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default PublicLayout; 
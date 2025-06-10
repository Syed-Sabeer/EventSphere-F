import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Alert } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, hasAnyRole } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full">
          <Alert color="failure" icon={HiExclamation}>
            <span className="font-medium">Access Denied!</span>
            <div className="mt-2">
              You don't have permission to access this page. 
              Required roles: {allowedRoles.join(', ')}
            </div>
            <div className="mt-4">
              <button
                onClick={() => window.history.back()}
                className="text-sm underline hover:no-underline"
              >
                Go back
              </button>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  return children;
};

export default RoleBasedRoute; 
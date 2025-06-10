import React from 'react';
import { Spinner } from 'flowbite-react';

const LoadingSpinner = ({ 
  size = 'xl', 
  color = 'blue', 
  text = 'Loading...', 
  fullScreen = true 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <Spinner
          aria-label={text}
          size={size}
          color={color}
        />
        {text && (
          <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 
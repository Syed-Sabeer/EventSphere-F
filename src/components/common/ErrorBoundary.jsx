import React from 'react';
import { Alert, Button } from 'flowbite-react';
import { HiExclamation, HiRefresh } from 'react-icons/hi';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console and error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <Alert color="failure" icon={HiExclamation}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Something went wrong!</span>
                  <div className="mt-2 text-sm">
                    An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
                  </div>
                </div>
                <Button
                  color="failure"
                  size="sm"
                  onClick={this.handleReset}
                  className="ml-4"
                >
                  <HiRefresh className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-xs">
                  <summary className="cursor-pointer font-medium">Error Details (Development)</summary>
                  <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded border overflow-auto">
                    <div className="font-mono">
                      <div className="text-red-600 dark:text-red-400 font-semibold">
                        {this.state.error.toString()}
                      </div>
                      <div className="mt-2 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </div>
                    </div>
                  </div>
                </details>
              )}
            </Alert>
            
            <div className="mt-6 text-center">
              <Button
                color="blue"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Micro-frontend loading error:", error);
    console.error("Error info:", errorInfo);
    console.error("Error stack:", error.stack);

    // Check if it's a module federation specific error
    if (
      error.message.includes("Loading CSS chunk") ||
      error.message.includes("dynamically imported module") ||
      error.message.includes("remoteEntry")
    ) {
      console.error("This appears to be a Module Federation error. Check:");
      console.error("1. Are all micro-frontend servers running?");
      console.error("2. Are remote entry files accessible?");
      console.error("3. Check network tab for failed requests");
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-5 border border-red-400 rounded-md bg-red-50 text-red-700 my-4">
          <h3 className="text-lg font-semibold mb-2">⚠️ Micro-frontend Error</h3>
          <p className="mb-4">Something went wrong loading the micro-frontend.</p>
          <details className="text-sm">
            <summary className="cursor-pointer font-medium">Technical Details</summary>
            <p className="mt-2">This usually happens when:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>The micro-frontend server is not running</li>
              <li>The remoteEntry.js file is not accessible</li>
              <li>There's a module federation configuration issue</li>
            </ul>
            {this.state.error && (
              <div className="mt-3 p-2 bg-red-100 rounded text-xs font-mono">
                <strong>Error:</strong> {this.state.error.message}
              </div>
            )}
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-3 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;

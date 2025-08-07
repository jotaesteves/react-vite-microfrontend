import React from "react";
import ReactDOM from "react-dom/client";

const SharedLibraryApp: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🔗 Shared Library</h1>
      <p className="text-gray-600 mb-4">
        This is the shared library package that provides common components, hooks, and utilities to all microfrontends
        in the application.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
        <h2 className="font-semibold text-blue-800 mb-2">📦 Exports:</h2>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>EventBus - Cross-microfrontend communication</li>
          <li>GlobalStore - Shared state management</li>
          <li>ErrorBoundary - Error handling component</li>
          <li>MicroFrontendProvider - Context provider</li>
          <li>useMicroFrontend hooks - Various utility hooks</li>
        </ul>
      </div>

      <p className="text-sm text-gray-500">
        This library doesn't have a user interface - it only provides shared functionality. Visit the host application
        at{" "}
        <a href="http://localhost:3000" className="text-blue-600 hover:underline">
          http://localhost:3000
        </a>{" "}
        to see the integrated application.
      </p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SharedLibraryApp />
  </React.StrictMode>
);

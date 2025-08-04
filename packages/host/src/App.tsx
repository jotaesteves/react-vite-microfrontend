import React, { Suspense, lazy } from "react";
import "./App.css";

// Lazy load micro-frontends
const Header = lazy(() => import("mfHeader/Header"));
const Footer = lazy(() => import("mfFooter/Footer"));

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
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
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      <ErrorBoundary>
        <Suspense fallback={<div className="p-4 text-center">Loading Header...</div>}>
          <Header />
        </Suspense>
      </ErrorBoundary>

      <main className="flex-1 p-8 bg-neutral-800 text-gray-800">
        <h1 className="text-3xl font-bold text-slate-100 mb-4">Welcome to the 🐚 Host Application</h1>
        <p className="text-lg text-gray-300 mb-6">This is the main host application that loads micro-frontends.</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">Features:</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-lg text-green-700">
              <span className="mr-2">✅</span> Module Federation with Vite
            </li>
            <li className="flex items-center text-lg text-green-700">
              <span className="mr-2">✅</span> Dynamic micro-frontend loading
            </li>
            <li className="flex items-center text-lg text-green-700">
              <span className="mr-2">✅</span> Error boundaries
            </li>
            <li className="flex items-center text-lg text-green-700">
              <span className="mr-2">✅</span> Shared dependencies
            </li>
            <li className="flex items-center text-lg text-blue-200">
              <span className="mr-2">🎨</span> Tailwind CSS styling
            </li>
          </ul>
        </div>
      </main>

      <ErrorBoundary>
        <Suspense fallback={<div className="p-4 text-center">Loading Footer...</div>}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

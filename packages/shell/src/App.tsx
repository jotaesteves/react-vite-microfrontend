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
        <div
          style={{
            padding: "20px",
            border: "1px solid #ff6b6b",
            borderRadius: "4px",
            backgroundColor: "#ffe6e6",
            color: "#c92a2a",
            margin: "10px 0",
          }}
        >
          <h3>⚠️ Micro-frontend Error</h3>
          <p>Something went wrong loading the micro-frontend.</p>
          <details>
            <summary>Technical Details</summary>
            <p>This usually happens when:</p>
            <ul>
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
    <div className="app">
      <ErrorBoundary>
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header />
        </Suspense>
      </ErrorBoundary>

      <main className="main-content">
        <h1>Welcome to the Shell Application</h1>
        <p>This is the main host application that loads micro-frontends.</p>
        <div className="content-section">
          <h2>Features:</h2>
          <ul>
            <li>✅ Module Federation with Vite</li>
            <li>✅ Dynamic micro-frontend loading</li>
            <li>✅ Error boundaries</li>
            <li>✅ Shared dependencies</li>
          </ul>
        </div>
      </main>

      <ErrorBoundary>
        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

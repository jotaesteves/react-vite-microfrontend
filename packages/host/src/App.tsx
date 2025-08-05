import React, { Suspense, lazy, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useMicroFrontendNavigation, useMicroFrontendTheme } from "./hooks/useMicroFrontend";
import createMicroFrontendRouter from "./router/microFrontendRouter";
import ErrorBoundary from "./components/ErrorBoundary";
import MainContent from "./components/MainContent";

// Lazy load micro-frontends
const Header = lazy(() => import("mfHeader/Header"));
const Footer = lazy(() => import("mfFooter/Footer"));

// Create router instance
const router = createMicroFrontendRouter();

// Main layout component that wraps the router
const AppLayout: React.FC = () => {
  const { currentPage } = useMicroFrontendNavigation();
  const { theme } = useMicroFrontendTheme();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={`flex flex-col min-h-screen w-full ${theme === 'dark' ? 'bg-gray-100' : 'bg-gray-50'}`}>
      <ErrorBoundary>
        <Suspense fallback={<div className="p-4 text-center">Loading Header...</div>}>
          <Header />
        </Suspense>
      </ErrorBoundary>

      <main className="flex-1 p-8 bg-neutral-800 text-gray-800">
        <MainContent currentPage={currentPage as "home" | "about" | "services" | "contact"} />
      </main>

      <ErrorBoundary>
        <Suspense fallback={<div className="p-4 text-center">Loading Footer...</div>}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

function App() {
  return (
    <div>
      {/* For now, we'll use the existing layout structure */}
      {/* The router can be integrated gradually */}
      <AppLayout />
      
      {/* Future enhancement: Full router integration */}
      {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;

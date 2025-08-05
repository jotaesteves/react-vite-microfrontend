import { createBrowserRouter, createMemoryRouter } from "react-router-dom";
import React, { Suspense } from "react";
import MainContent from "../components/MainContent";
import ErrorBoundary from "../components/ErrorBoundary";

// Define route types
export interface MicroFrontendRoute {
  path: string;
  component: React.ComponentType<any>;
  title: string;
  description?: string;
  meta?: Record<string, any>;
}

// Default routes for the host application
const defaultRoutes: MicroFrontendRoute[] = [
  {
    path: "/",
    component: () => <MainContent currentPage="home" />,
    title: "Home",
    description: "Welcome to our microfrontend application",
  },
  {
    path: "/home",
    component: () => <MainContent currentPage="home" />,
    title: "Home",
    description: "Welcome to our microfrontend application",
  },
  {
    path: "/about",
    component: () => <MainContent currentPage="about" />,
    title: "About Us",
    description: "Learn more about our company",
  },
  {
    path: "/services",
    component: () => <MainContent currentPage="services" />,
    title: "Our Services",
    description: "Discover what we offer",
  },
  {
    path: "/contact",
    component: () => <MainContent currentPage="contact" />,
    title: "Contact Us",
    description: "Get in touch with us",
  },
];

// Route wrapper component
const RouteWrapper: React.FC<{
  component: React.ComponentType<any>;
  title: string;
  meta?: Record<string, any>;
}> = ({ component: Component, title, meta }) => {
  // Update document title
  React.useEffect(() => {
    document.title = `${title} | Microfrontend App`;

    // Update meta tags if provided
    if (meta) {
      Object.entries(meta).forEach(([name, content]) => {
        let metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = String(content);
      });
    }
  }, [title, meta]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

// Create router configuration
export const createMicroFrontendRouter = (routes: MicroFrontendRoute[] = defaultRoutes, isMemoryRouter = false) => {
  const routerConfig = routes.map((route) => ({
    path: route.path,
    element: <RouteWrapper component={route.component} title={route.title} meta={route.meta} />,
  }));

  // Add a catch-all route for 404
  routerConfig.push({
    path: "*",
    element: (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <button
            onClick={() => window.history.pushState({}, "", "/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    ),
  });

  return isMemoryRouter ? createMemoryRouter(routerConfig) : createBrowserRouter(routerConfig);
};

// Navigation helper functions
export const navigationHelpers = {
  // Navigate to a specific route
  navigateTo: (path: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  },

  // Go back in history
  goBack: () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  },

  // Go forward in history
  goForward: () => {
    if (typeof window !== "undefined") {
      window.history.forward();
    }
  },

  // Replace current route
  replaceTo: (path: string) => {
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  },

  // Get current pathname
  getCurrentPath: () => {
    return typeof window !== "undefined" ? window.location.pathname : "/";
  },

  // Check if a route is active
  isActiveRoute: (path: string) => {
    const currentPath = navigationHelpers.getCurrentPath();
    return currentPath === path || (path === "/" && currentPath === "/home");
  },
};

// Make navigation helpers globally available for microfrontends
declare global {
  interface Window {
    microFrontendNavigation: typeof navigationHelpers;
  }
}

if (typeof window !== "undefined") {
  window.microFrontendNavigation = navigationHelpers;
}

export default createMicroFrontendRouter;

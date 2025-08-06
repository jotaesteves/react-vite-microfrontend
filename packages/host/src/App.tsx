import React, { useEffect } from "react";
import { RouterProvider, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import createMicroFrontendRouter, { navigationHelpers } from "./router/microFrontendRouter";
import { useGlobalStore } from "./stores/globalStore";

// Create router instance
const router = createMicroFrontendRouter();

// Component to sync React Router with global store
const RouterSync: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage, currentPage } = useGlobalStore();

  // Update global store when route changes
  useEffect(() => {
    const tab = navigationHelpers.getTabFromRoute(location.pathname);
    if (tab !== currentPage) {
      setCurrentPage(tab);
    }
  }, [location.pathname, setCurrentPage, currentPage]);

  // Update navigation helpers with router's navigate function
  useEffect(() => {
    navigationHelpers.navigateTo = (path: string) => {
      navigate(path);
    };
    navigationHelpers.replaceTo = (path: string) => {
      navigate(path, { replace: true });
    };
  }, [navigate]);

  // Subscribe to global store changes and update route accordingly
  useEffect(() => {
    const unsubscribe = useGlobalStore.subscribe(
      (state) => state.currentPage,
      (newPage) => {
        const newRoute = navigationHelpers.getRouteFromTab(newPage);
        if (location.pathname !== newRoute) {
          navigate(newRoute, { replace: true });
        }
      }
    );

    return unsubscribe;
  }, [navigate, location.pathname]);

  return null;
};

function App() {
  return <RouterProvider router={router} />;
}

export default App;

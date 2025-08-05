import React, { useEffect } from 'react';
import { useGlobalStore } from '../stores/globalStore';
import eventBus, { MicroFrontendEvent } from '../shared/eventBus';

interface MicroFrontendProviderProps {
  children: React.ReactNode;
}

export const MicroFrontendProvider: React.FC<MicroFrontendProviderProps> = ({ children }) => {
  const { setCurrentPage, currentPage } = useGlobalStore();

  useEffect(() => {
    // Listen for navigation events from micro-frontends (backward compatibility)
    const handleNavigationEvent = (event: MicroFrontendEvent) => {
      if (event.type === "NAVIGATION_CHANGE") {
        setCurrentPage(event.payload.page);
      }
    };

    eventBus.on("NAVIGATION_CHANGE", handleNavigationEvent);

    // Cleanup event listener on unmount
    return () => {
      eventBus.off("NAVIGATION_CHANGE", handleNavigationEvent);
    };
  }, [setCurrentPage]);

  // Log current page changes for debugging
  useEffect(() => {
    console.log(`[MicroFrontend] Current page changed to: ${currentPage}`);
  }, [currentPage]);

  return <>{children}</>;
};

export default MicroFrontendProvider;

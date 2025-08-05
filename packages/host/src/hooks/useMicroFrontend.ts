import { useCallback, useEffect, useState } from 'react';
import { useGlobalStore } from '../stores/globalStore';

// Hook to access global store from any microfrontend
export const useMicroFrontendStore = () => {
  const store = useGlobalStore();
  
  return store;
};

// Hook for navigation with automatic store sync
export const useMicroFrontendNavigation = () => {
  const { currentPage, navigateTo, goBack, navigationHistory } = useGlobalStore();
  
  const navigate = useCallback((page: string) => {
    navigateTo(page);
  }, [navigateTo]);

  const back = useCallback(() => {
    goBack();
  }, [goBack]);

  const isCurrentPage = useCallback((page: string) => {
    return currentPage === page;
  }, [currentPage]);

  return {
    currentPage,
    navigate,
    back,
    isCurrentPage,
    navigationHistory,
  };
};

// Hook for user state management
export const useMicroFrontendUser = () => {
  const { user, setUser, login, logout } = useGlobalStore();
  
  return {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: user.isAuthenticated,
  };
};

// Hook for theme management
export const useMicroFrontendTheme = () => {
  const { theme, setTheme } = useGlobalStore();
  
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
};

// Hook for shared data management
export const useMicroFrontendSharedData = () => {
  const { sharedData, setSharedData, getSharedData, clearSharedData } = useGlobalStore();
  
  const setData = useCallback((key: string, value: any) => {
    setSharedData(key, value);
  }, [setSharedData]);

  const getData = useCallback((key: string) => {
    return getSharedData(key);
  }, [getSharedData]);

  const clearData = useCallback((key?: string) => {
    clearSharedData(key);
  }, [clearSharedData]);

  return {
    sharedData,
    setData,
    getData,
    clearData,
  };
};

// Hook for loading state management
export const useMicroFrontendLoading = () => {
  const { isLoading, loadingMessage, setLoading } = useGlobalStore();
  
  const startLoading = useCallback((message?: string) => {
    setLoading(true, message);
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    setLoading,
  };
};

// Hook to sync with global store for standalone microfrontends
export const useMicroFrontendSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Check if running inside host application
    const checkConnection = () => {
      if (typeof window !== 'undefined' && 'globalMicroFrontendStore' in window) {
        setIsConnected(true);
      } else {
        console.warn('MicroFrontend: Not connected to global store. Running in standalone mode.');
      }
    };
    
    checkConnection();
  }, []);

  return {
    isConnected,
    isStandalone: !isConnected,
  };
};

// Hook for cross-microfrontend communication
export const useMicroFrontendCommunication = () => {
  const { setSharedData, getSharedData } = useGlobalStore();
  
  const sendMessage = useCallback((targetMF: string, message: any) => {
    const messageKey = `message_${targetMF}_${Date.now()}`;
    setSharedData(messageKey, {
      from: 'current',
      to: targetMF,
      timestamp: new Date().toISOString(),
      data: message,
    });
  }, [setSharedData]);

  const getMessages = useCallback((targetMF: string) => {
    const messages = [];
    const allData = getSharedData('');
    
    for (const [key, value] of Object.entries(allData || {})) {
      if (key.startsWith(`message_${targetMF}_`)) {
        messages.push(value);
      }
    }
    
    return messages;
  }, [getSharedData]);

  return {
    sendMessage,
    getMessages,
  };
};

export default {
  useMicroFrontendStore,
  useMicroFrontendNavigation,
  useMicroFrontendUser,
  useMicroFrontendTheme,
  useMicroFrontendSharedData,
  useMicroFrontendLoading,
  useMicroFrontendSync,
  useMicroFrontendCommunication,
};

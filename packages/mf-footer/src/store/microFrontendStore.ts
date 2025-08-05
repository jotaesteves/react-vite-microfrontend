import { useState, useCallback, useEffect } from 'react';

// Global type declarations
declare global {
  interface Window {
    globalMicroFrontendStore?: any;
    microFrontendEventBus?: {
      emit: (event: { type: string; payload: any }) => void;
    };
  }
}

// This is a simplified version for the microfrontend
// It will use the global store when available, fallback to local when standalone
export interface MicroFrontendState {
  currentPage: string;
  user: {
    name?: string;
    email?: string;
    isAuthenticated: boolean;
  };
  theme: 'light' | 'dark';
  sharedData: Record<string, any>;
  isLoading: boolean;
}

// Simple local state management for standalone mode
const createLocalState = () => {
  let state: MicroFrontendState = {
    currentPage: 'home',
    user: { isAuthenticated: false },
    theme: 'dark',
    sharedData: {},
    isLoading: false,
  };
  
  const listeners: Array<() => void> = [];
  
  const setState = (newState: Partial<MicroFrontendState>) => {
    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };
  
  return {
    getState: () => state,
    setState,
    subscribe,
  };
};

// Global local store instance
const localStore = createLocalState();

// Smart hook that uses global store when available, local when standalone
export const useMicroFrontendStore = () => {
  const [, forceUpdate] = useState({});
  
  // Force re-render when store changes
  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);
  
  // Check if global store is available (running inside host)
  if (typeof window !== 'undefined' && 'globalMicroFrontendStore' in window) {
    return (window as any).globalMicroFrontendStore();
  }
  
  // Use local store for standalone mode
  const state = localStore.getState();
  
  // Subscribe to changes
  useEffect(() => {
    return localStore.subscribe(triggerUpdate);
  }, [triggerUpdate]);
  
  const actions = {
    setCurrentPage: (page: string) => {
      localStore.setState({ currentPage: page });
    },
    
    navigateTo: (page: string) => {
      localStore.setState({ currentPage: page });
      
      // Emit navigation event
      if (typeof window !== 'undefined' && window.microFrontendEventBus) {
        window.microFrontendEventBus.emit({
          type: 'NAVIGATION_CHANGE',
          payload: { page: page as any },
        });
      }
    },
    
    setUser: (userData: Partial<MicroFrontendState['user']>) => {
      const currentState = localStore.getState();
      localStore.setState({
        user: { ...currentState.user, ...userData },
      });
    },
    
    setTheme: (theme: MicroFrontendState['theme']) => {
      localStore.setState({ theme });
    },
    
    setSharedData: (key: string, value: any) => {
      const currentState = localStore.getState();
      localStore.setState({
        sharedData: { ...currentState.sharedData, [key]: value },
      });
    },
    
    getSharedData: (key: string) => {
      return localStore.getState().sharedData[key];
    },
    
    setLoading: (isLoading: boolean) => {
      localStore.setState({ isLoading });
    },
  };
  
  return { ...state, ...actions };
};

// Navigation hook
export const useNavigation = () => {
  const store = useMicroFrontendStore();
  
  return {
    currentPage: store.currentPage,
    navigateTo: store.navigateTo,
    isCurrentPage: (page: string) => store.currentPage === page,
  };
};

// Theme hook
export const useTheme = () => {
  const store = useMicroFrontendStore();
  
  return {
    theme: store.theme,
    setTheme: store.setTheme,
    isDark: store.theme === 'dark',
    isLight: store.theme === 'light',
  };
};

export default useMicroFrontendStore;

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Define the global state interface
export interface GlobalState {
  // Navigation state
  currentPage: string;
  navigationHistory: string[];

  // User state
  user: {
    name?: string;
    email?: string;
    isAuthenticated: boolean;
  };

  // App-wide settings
  theme: "light" | "dark";
  language: "en" | "es" | "fr";

  // Shared data between microfrontends
  sharedData: Record<string, any>;

  // Loading states
  isLoading: boolean;
  loadingMessage?: string;
}

// Define the store actions
export interface GlobalActions {
  // Navigation actions
  setCurrentPage: (page: string) => void;
  navigateTo: (page: string) => void;
  goBack: () => void;

  // User actions
  setUser: (user: Partial<GlobalState["user"]>) => void;
  login: (name: string, email: string) => void;
  logout: () => void;

  // App settings actions
  setTheme: (theme: GlobalState["theme"]) => void;
  setLanguage: (language: GlobalState["language"]) => void;

  // Shared data actions
  setSharedData: (key: string, value: any) => void;
  getSharedData: (key: string) => any;
  clearSharedData: (key?: string) => void;

  // Loading actions
  setLoading: (isLoading: boolean, message?: string) => void;

  // Reset store
  reset: () => void;
}

// Initial state
const initialState: GlobalState = {
  currentPage: "home",
  navigationHistory: [],
  user: {
    isAuthenticated: false,
  },
  theme: "dark",
  language: "en",
  sharedData: {},
  isLoading: false,
};

// Create the Zustand store
export const useGlobalStore = create<GlobalState & GlobalActions>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    // Navigation actions
    setCurrentPage: (page: string) => {
      set((state) => ({
        currentPage: page,
        navigationHistory: [...state.navigationHistory, page],
      }));
    },

    navigateTo: (page: string) => {
      const { setCurrentPage } = get();
      setCurrentPage(page);

      // Emit navigation event for backward compatibility
      if (typeof window !== "undefined" && window.microFrontendEventBus) {
        window.microFrontendEventBus.emit({
          type: "NAVIGATION_CHANGE",
          payload: { page: page as any },
        });
      }
    },

    goBack: () => {
      const { navigationHistory } = get();
      if (navigationHistory.length > 1) {
        const newHistory = [...navigationHistory];
        newHistory.pop(); // Remove current page
        const previousPage = newHistory[newHistory.length - 1] || "home";

        set({
          currentPage: previousPage,
          navigationHistory: newHistory,
        });
      }
    },

    // User actions
    setUser: (userData) => {
      set((state) => ({
        user: { ...state.user, ...userData },
      }));
    },

    login: (name: string, email: string) => {
      set({
        user: {
          name,
          email,
          isAuthenticated: true,
        },
      });
    },

    logout: () => {
      set({
        user: {
          isAuthenticated: false,
        },
      });
    },

    // App settings actions
    setTheme: (theme) => {
      set({ theme });

      // Apply theme to document
      if (typeof document !== "undefined") {
        document.documentElement.className = theme;
      }
    },

    setLanguage: (language) => {
      set({ language });
    },

    // Shared data actions
    setSharedData: (key: string, value: any) => {
      set((state) => ({
        sharedData: {
          ...state.sharedData,
          [key]: value,
        },
      }));
    },

    getSharedData: (key: string) => {
      return get().sharedData[key];
    },

    clearSharedData: (key?: string) => {
      if (key) {
        set((state) => {
          const newSharedData = { ...state.sharedData };
          delete newSharedData[key];
          return { sharedData: newSharedData };
        });
      } else {
        set({ sharedData: {} });
      }
    },

    // Loading actions
    setLoading: (isLoading: boolean, message?: string) => {
      set({ isLoading, loadingMessage: message });
    },

    // Reset store
    reset: () => {
      set(initialState);
    },
  }))
);

// Global store instance for cross-microfrontend access
declare global {
  interface Window {
    globalMicroFrontendStore: typeof useGlobalStore;
  }
}

// Make the store globally available
if (typeof window !== "undefined") {
  window.globalMicroFrontendStore = useGlobalStore;
}

// Subscribe to store changes and sync with eventBus for backward compatibility
useGlobalStore.subscribe(
  (state) => state.currentPage,
  (currentPage) => {
    if (typeof window !== "undefined" && window.microFrontendEventBus) {
      window.microFrontendEventBus.emit({
        type: "NAVIGATION_CHANGE",
        payload: { page: currentPage as any },
      });
    }
  }
);

export default useGlobalStore;

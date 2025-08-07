import { useState, useEffect } from "react";
import { FooterTag } from "../types";
import { getGlobalStore, historyToFooterTags } from "../utils/navigationUtils";

// Hook to get navigation history and convert to footer tags
export const useNavigationHistory = () => {
  const [historyTags, setHistoryTags] = useState<FooterTag[]>([]);

  useEffect(() => {
    // Get the shared global store
    const globalStore = getGlobalStore();

    if (globalStore) {
      const updateHistoryTags = () => {
        const state = globalStore.getState();
        const history = state.navigationHistory || [];

        // Convert history to footer tags using utility function
        const tags = historyToFooterTags(history, 5);
        setHistoryTags(tags);
      };

      // Initial load
      updateHistoryTags();

      // Subscribe to navigation changes using the shared store's subscribe method
      const unsubscribe = globalStore.subscribe((state: any) => state.navigationHistory, updateHistoryTags);

      return unsubscribe;
    } else {
      // Fallback: if not in host environment, provide empty array
      setHistoryTags([]);
    }
  }, []);

  return historyTags;
};

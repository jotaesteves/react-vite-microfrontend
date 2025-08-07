import { useState, useEffect } from "react";
import { FooterTag } from "../types";
import { getGlobalStore } from "../utils/navigationUtils";

// Helper function to get a user-friendly label for a page
const getPageLabel = (page: string): string => {
  const pageLabels: Record<string, string> = {
    "dados-pessoais": "Dados Pessoais",
    "canais-e-servicos": "Canais e Serviços",
    "historico-interacoes": "Histórico",
    "patrimonio-e-produtos": "Patrimônio",
    "visao-360": "Visão 360",
    "360vision": "Visão 360",
    personalData: "Dados Pessoais",
    assetsProducts: "Patrimônio e Produtos",
    channelsAndServices: "Canais e Serviços",
    historyInteractions: "Histórico",
    home: "Home",
    about: "Sobre",
    contact: "Contato",
    services: "Serviços",
  };
  return pageLabels[page] || page.charAt(0).toUpperCase() + page.slice(1);
};

/**
 * Hook to get navigation history and convert to footer tags
 * Returns historyTags array and excludePageFromHistory function
 */
export function useNavigationHistory() {
  const [historyTags, setHistoryTags] = useState<FooterTag[]>([]);
  const [excludedPages, setExcludedPages] = useState<Set<string>>(new Set());
  const [lastHistoryLength, setLastHistoryLength] = useState(0);

  // Function to exclude a page from showing in future history tags
  const excludePageFromHistory = (page: string) => {
    setExcludedPages((prev) => new Set([...prev, page]));
    // Also remove the tag immediately from the display
    setHistoryTags((currentTags) => currentTags.filter((tag) => tag.page !== page));
  };

  useEffect(() => {
    // Get the shared global store
    const globalStore = getGlobalStore();

    if (globalStore) {
      const updateHistoryTags = () => {
        const state = globalStore.getState();
        const currentHistory: string[] = state.navigationHistory || [];

        // If history has grown (new navigation), clear exclusions for new entries
        if (currentHistory.length > lastHistoryLength) {
          // Get the new pages that were added since last update
          const newPages = currentHistory.slice(lastHistoryLength);

          // Clear exclusions for any new pages that were just navigated to
          setExcludedPages((prev) => {
            const updated = new Set(prev);
            newPages.forEach((page: string) => {
              updated.delete(page); // Allow previously excluded pages to show up again
            });
            return updated;
          });
        }

        setLastHistoryLength(currentHistory.length);

        // Get the last 5 unique pages from history, excluding currently excluded pages
        const recentPages = [...new Set(currentHistory)] // Remove duplicates
          .filter((page: string) => !excludedPages.has(page)) // Filter out excluded pages
          .slice(-5); // Get last 5 pages

        // Convert to footer tags
        const newHistoryTags: FooterTag[] = recentPages.map((page: string) => ({
          id: `history-${page}`,
          label: getPageLabel(page),
          page: page,
          isFromHistory: true,
        }));

        setHistoryTags(newHistoryTags);
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
  }, [excludedPages, lastHistoryLength]); // Re-run when excluded pages or history length change

  return {
    historyTags,
    excludePageFromHistory,
  };
}

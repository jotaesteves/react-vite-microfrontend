import { FooterTag } from "../types";

/**
 * Utility functions for working with navigation history in the footer
 */

/**
 * Converts page names to user-friendly labels
 */
export const getPageLabel = (page: string): string => {
  const pageLabels: Record<string, string> = {
    "360vision": "Visão 360",
    personalData: "Dados Pessoais",
    assetsProducts: "Patrimônio e Produtos",
    channelsAndServices: "Canais e Serviços",
    historyInteractions: "Histórico",
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
  };

  return pageLabels[page] || page.charAt(0).toUpperCase() + page.slice(1);
};

/**
 * Filters unique pages from history while preserving order
 */
export const getUniqueHistory = (history: string[]): string[] => {
  return history.filter((page, index, arr) => arr.indexOf(page) === index);
};

/**
 * Converts history array to FooterTag array
 */
export const historyToFooterTags = (history: string[], maxTags: number = 5): FooterTag[] => {
  const uniqueHistory = getUniqueHistory(history);

  return uniqueHistory.slice(-maxTags).map((page) => ({
    id: page,
    label: getPageLabel(page),
    page: page,
    isFromHistory: true,
  }));
};

/**
 * Checks if the global store is available
 */
export const isGlobalStoreAvailable = (): boolean => {
  return typeof window !== "undefined" && "globalMicroFrontendStore" in window;
};

/**
 * Gets the global store instance safely
 */
export const getGlobalStore = () => {
  if (isGlobalStoreAvailable()) {
    return (window as any).globalMicroFrontendStore;
  }
  return null;
};

/**
 * Removes a page from the navigation history in the global store
 */
export const removePageFromHistory = (pageToRemove: string): void => {
  const globalStore = getGlobalStore();

  if (globalStore) {
    const state = globalStore.getState();
    // Use the new removeFromHistory action
    if (state.removeFromHistory) {
      state.removeFromHistory(pageToRemove);
    }
  }
};

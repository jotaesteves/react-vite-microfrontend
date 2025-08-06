import React, { useState, useEffect } from "react";

const tabs = [
  { value: "360vision", label: "Visao 360" },
  { value: "personalData", label: "Dados Pessoais" },
  { value: "assetsProducts", label: "Patrimonio e Productos" },
  { value: "channelsAndServices", label: "Canais e Serviços" },
  { value: "historyInteractions", label: "Historico Interacões" },
];

const HeaderTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  // Access the global store from the host app
  const globalStore = (window as any)?.globalMicroFrontendStore;

  // Sync with global store if available
  useEffect(() => {
    if (globalStore) {
      const currentPage = globalStore.getState().currentPage;
      // Only update if it's one of our tab values
      if (tabs.some((tab) => tab.value === currentPage)) {
        setActiveTab(currentPage);
      }

      // Subscribe to store changes
      const unsubscribe = globalStore.subscribe(
        (state: any) => state.currentPage,
        (currentPage: string) => {
          if (tabs.some((tab) => tab.value === currentPage)) {
            setActiveTab(currentPage);
          }
        }
      );

      return unsubscribe;
    }
  }, [globalStore]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);

    // Update the global store in the host app
    if (globalStore) {
      globalStore.getState().navigateTo(tabValue);
    }
  };

  return (
    <nav className="flex items-center bg-white border-b border-gray-200 px-4">
      <ul className="flex space-x-8">
        {tabs.map((tab) => (
          <li key={tab.value}>
            <button
              className={`py-4 px-2 text-sm font-medium transition-colors duration-200 border-b-4 ${
                activeTab === tab.value
                  ? "text-primary border-primary"
                  : "text-neutral-900 border-transparent hover:text-pink-500 hover:border-pink-300"
              }`}
              data-tab={tab.value}
              onClick={() => handleTabClick(tab.value)}
              type="button"
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderTabs;

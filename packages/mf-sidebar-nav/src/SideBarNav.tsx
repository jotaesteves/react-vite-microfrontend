import React, { useState } from "react";

// Declare global navigation helper interface
declare global {
  interface Window {
    microFrontendNavigation?: {
      navigateTo: (path: string) => void;
      getRouteFromTab?: (tab: string) => string;
      getTabFromRoute?: (route: string) => string;
    };
  }
}

const sidebarItems = [
  { icon: "🏠", label: "Início", path: "/inicio" },
  { icon: "📁", label: "Registos", path: "/registos" },
  { icon: "📞", label: "Outbounds", path: "/outbounds" },
  { icon: "🛍️", label: "Vendas", path: "/vendas" },
  { icon: "📃", label: "Scripts", path: "/scripts" },
  { icon: "📔", label: "Documentação", path: "/documentacao" },
  { icon: "📊", label: "KPI's", path: "/kpis" },
];

const bottomSidebarItems = [
  { icon: "⚙️", label: "Definições", path: "/definicoes" },
  { icon: "🔍", label: "Pesquisa", path: "/pesquisa" },
];

interface SideBarNavItemProps {
  icon: string;
  label: string;
  path: string;
  expanded: boolean;
}

function SideBarNavItem({ icon, label, path, expanded }: SideBarNavItemProps) {
  const handleClick = () => {
    console.log("SideBarNavItem clicked:", { path, expanded });
    console.log("window.microFrontendNavigation:", window.microFrontendNavigation);

    // Use global navigation helper to navigate
    if (typeof window !== "undefined" && window.microFrontendNavigation) {
      console.log("Attempting navigation to:", path);
      window.microFrontendNavigation.navigateTo(path);
    } else {
      console.error("Navigation helper not available");
      // Fallback to window.location
      if (typeof window !== "undefined") {
        window.location.href = path;
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center text-gray-700 hover:text-blue-500 transition-all duration-300 relative w-full rounded-lg p-2 hover:bg-gray-50 text-left cursor-pointer`}
      style={{ zIndex: 1 }}
    >
      <span className="icon text-xl w-8 flex-shrink-0 flex items-center justify-center">{icon}</span>
      <span
        className={`ml-2 transition-all duration-300 whitespace-nowrap ${
          expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
        style={{
          pointerEvents: expanded ? "auto" : "none",
          width: expanded ? "auto" : "0",
          overflow: expanded ? "visible" : "hidden",
        }}
      >
        {label}
      </span>
    </button>
  );
}

const SideBarNav: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav
      className={`relative flex flex-col items-start p-4 space-y-2 bg-white h-full transition-all duration-300 shadow-lg border-r border-gray-200 ${
        expanded ? "w-56" : "w-16"
      }`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        minWidth: expanded ? "14rem" : "4rem",
        maxWidth: expanded ? "14rem" : "4rem",
      }}
    >
      {sidebarItems.map((item) => (
        <SideBarNavItem key={item.label} {...item} expanded={expanded} />
      ))}
      <div className="mt-auto flex flex-col items-start space-y-2 w-full">
        {bottomSidebarItems.map((item) => (
          <SideBarNavItem key={item.label} {...item} expanded={expanded} />
        ))}
      </div>
    </nav>
  );
};

export default SideBarNav;

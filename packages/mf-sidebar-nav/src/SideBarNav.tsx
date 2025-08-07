import React, { useState } from "react";

const sidebarItems = [
  { icon: "🏠", label: "Início", href: "#" },
  { icon: "📁", label: "Registos", href: "#" },
  { icon: "📞", label: "Outbounds", href: "#" },
  { icon: "🛍️", label: "Vendas", href: "#" },
  { icon: "📃", label: "Scripts", href: "#" },
  { icon: "📔", label: "Documentação", href: "#" },
  { icon: "📊", label: "KPI's", href: "#" },
];

const bottomSidebarItems = [
  { icon: "⚙️", label: "Definições", href: "#" },
  { icon: "🔍", label: "Pesquisa", href: "#" },
];

interface SideBarNavItemProps {
  icon: string;
  label: string;
  href: string;
  expanded: boolean;
}

function SideBarNavItem({ icon, label, href, expanded }: SideBarNavItemProps) {
  return (
    <a
      href={href}
      className={`flex items-center text-gray-700 hover:text-blue-500 transition-all duration-300 relative w-full rounded-lg p-2 hover:bg-gray-50`}
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
    </a>
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

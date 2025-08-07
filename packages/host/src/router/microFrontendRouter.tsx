import { createBrowserRouter, createMemoryRouter, Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { useMicroFrontendTheme } from "../hooks/useMicroFrontend";

// Lazy load micro-frontends
const Header = lazy(() => import("mfHeader/Header"));
const Footer = lazy(() => import("mfFooter/Footer"));
const SideBarNav = React.lazy(() =>
  import("mf-sidebar-nav/SideBarNav").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Sidebar Navigation microfrontend</div>,
  }))
);

// Import screen components
const Visao360 = React.lazy(() => import("mf-visao-360/Visao360"));
const DadosPessoais = React.lazy(() => import("mf-dados-pessoais/DadosPessoais"));
const PatrimonioEProdutos = React.lazy(() => import("mf-patrimonio-e-produtos/PatrimonioEProdutos"));
const CanaisEServicos = React.lazy(() => import("mf-canais-e-servicos/CanaisEServicos"));
const HistoricoInteracoes = React.lazy(() => import("mf-historico-interacoes/HistoricoInteracoes"));

// Import sidebar navigation screen components with error boundaries
const Inicio = React.lazy(() =>
  import("mf-inicio/Inicio").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Início microfrontend</div>,
  }))
);
const Registos = React.lazy(() =>
  import("mf-registos/Registos").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Registos microfrontend</div>,
  }))
);
const Outbounds = React.lazy(() =>
  import("mf-outbounds/Outbounds").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Outbounds microfrontend</div>,
  }))
);
const Vendas = React.lazy(() =>
  import("mf-vendas/Vendas").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Vendas microfrontend</div>,
  }))
);
const Scripts = React.lazy(() =>
  import("mf-scripts/Scripts").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Scripts microfrontend</div>,
  }))
);
const Documentacao = React.lazy(() =>
  import("mf-documentacao/Documentacao").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Documentação microfrontend</div>,
  }))
);
const KPIs = React.lazy(() =>
  import("mf-kpis/KPIs").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load KPIs microfrontend</div>,
  }))
);
const Definicoes = React.lazy(() =>
  import("mf-definicoes/Definicoes").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Definições microfrontend</div>,
  }))
);
const Pesquisa = React.lazy(() =>
  import("mf-pesquisa/Pesquisa").catch(() => ({
    default: () => <div className="p-4 text-red-600">Failed to load Pesquisa microfrontend</div>,
  }))
);

import MainContent from "../components/MainContent";

// Define route types
export interface MicroFrontendRoute {
  path: string;
  component: React.ComponentType<any>;
  title: string;
  description?: string;
  meta?: Record<string, any>;
}

// Component to sync React Router with global store
const RouterSync: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Import useGlobalStore dynamically to avoid circular dependencies
  const [useGlobalStore, setUseGlobalStore] = React.useState<any>(null);

  React.useEffect(() => {
    import("../stores/globalStore").then(({ useGlobalStore: store }) => {
      setUseGlobalStore(() => store);
    });
  }, []);

  // Update global store when route changes
  React.useEffect(() => {
    if (!useGlobalStore) return;

    const tab = navigationHelpers.getTabFromRoute(location.pathname);
    const currentPage = useGlobalStore.getState().currentPage;

    if (tab !== currentPage) {
      useGlobalStore.getState().setCurrentPage(tab);
    }
  }, [location.pathname, useGlobalStore]);

  // Update navigation helpers with router's navigate function
  React.useEffect(() => {
    navigationHelpers.navigateTo = (path: string) => {
      console.log("Global navigation called with path:", path);
      navigate(path);
    };
    navigationHelpers.replaceTo = (path: string) => {
      navigate(path, { replace: true });
    };

    // Update the global object with the new functions
    if (typeof window !== "undefined") {
      window.microFrontendNavigation = {
        ...navigationHelpers,
        getRouteFromTab: navigationHelpers.getRouteFromTab,
        getTabFromRoute: navigationHelpers.getTabFromRoute,
      };
      console.log("Updated global navigation helper:", window.microFrontendNavigation);
    }
  }, [navigate]);

  // Subscribe to global store changes and update route accordingly
  React.useEffect(() => {
    if (!useGlobalStore) return;

    const unsubscribe = useGlobalStore.subscribe(
      (state: any) => state.currentPage,
      (newPage: string) => {
        const newRoute = navigationHelpers.getRouteFromTab(newPage);
        if (location.pathname !== newRoute) {
          navigate(newRoute, { replace: true });
        }
      }
    );

    return unsubscribe;
  }, [navigate, location.pathname, useGlobalStore]);

  return null;
};

// Layout component that wraps all routes
const RootLayout: React.FC = () => {
  const { theme } = useMicroFrontendTheme();

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={`flex flex-col min-h-screen w-full ${theme === "dark" ? "bg-gray-100" : "bg-gray-50"}`}>
      <RouterSync />

      <ErrorBoundary>
        <Suspense fallback={<div className="p-4 text-center">Loading Header...</div>}>
          <Header />
        </Suspense>
      </ErrorBoundary>

      <div className="flex flex-1">
        <aside className="relative bg-gray-50">
          <ErrorBoundary>
            <Suspense fallback={<div className="p-4 text-center">Loading Sidebar...</div>}>
              <SideBarNav />
            </Suspense>
          </ErrorBoundary>
        </aside>
        <main className="flex-1 p-8 bg-gray-100 text-gray-800">
          <Outlet />
        </main>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<div className="p-4 text-center">Loading Footer...</div>}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

// Default routes for the host application - including both legacy and new routes
const defaultRoutes: MicroFrontendRoute[] = [
  // Sidebar navigation routes (main navigation)
  {
    path: "/",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Inicio {...props} />
      </Suspense>
    ),
    title: "Início",
    description: "Página inicial do sistema",
  },
  {
    path: "/inicio",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Inicio {...props} />
      </Suspense>
    ),
    title: "Início",
    description: "Página inicial do sistema",
  },
  {
    path: "/registos",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Registos {...props} />
      </Suspense>
    ),
    title: "Registos",
    description: "Gestão de registos",
  },
  {
    path: "/outbounds",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Outbounds {...props} />
      </Suspense>
    ),
    title: "Outbounds",
    description: "Gestão de chamadas de saída",
  },
  {
    path: "/vendas",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Vendas {...props} />
      </Suspense>
    ),
    title: "Vendas",
    description: "Gestão de vendas",
  },
  {
    path: "/scripts",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Scripts {...props} />
      </Suspense>
    ),
    title: "Scripts",
    description: "Gestão de scripts",
  },
  {
    path: "/documentacao",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Documentacao {...props} />
      </Suspense>
    ),
    title: "Documentação",
    description: "Documentação do sistema",
  },
  {
    path: "/kpis",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <KPIs {...props} />
      </Suspense>
    ),
    title: "KPI's",
    description: "Indicadores de performance",
  },
  {
    path: "/definicoes",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Definicoes {...props} />
      </Suspense>
    ),
    title: "Definições",
    description: "Configurações do sistema",
  },
  {
    path: "/pesquisa",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Pesquisa {...props} />
      </Suspense>
    ),
    title: "Pesquisa",
    description: "Pesquisa no sistema",
  },

  // Tab-based routes (legacy header navigation)
  {
    path: "/360vision",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Visao360 {...props} />
      </Suspense>
    ),
    title: "Visão 360",
    description: "Visão completa do cliente",
  },
  {
    path: "/personal-data",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <DadosPessoais {...props} />
      </Suspense>
    ),
    title: "Dados Pessoais",
    description: "Informações pessoais do cliente",
  },
  {
    path: "/assets-products",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <PatrimonioEProdutos {...props} />
      </Suspense>
    ),
    title: "Patrimônio e Produtos",
    description: "Produtos e patrimônio do cliente",
  },
  {
    path: "/channels-services",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <CanaisEServicos {...props} />
      </Suspense>
    ),
    title: "Canais e Serviços",
    description: "Canais de atendimento e serviços",
  },
  {
    path: "/history-interactions",
    component: (props: any) => (
      <Suspense fallback={<div>Loading...</div>}>
        <HistoricoInteracoes {...props} />
      </Suspense>
    ),
    title: "Histórico de Interações",
    description: "Histórico de interações com o cliente",
  },

  // Legacy routes for backward compatibility
  {
    path: "/home",
    component: () => <MainContent currentPage="home" />,
    title: "Home",
    description: "Welcome to our microfrontend application",
  },
  {
    path: "/about",
    component: () => <MainContent currentPage="about" />,
    title: "About Us",
    description: "Learn more about our company",
  },
  {
    path: "/services",
    component: () => <MainContent currentPage="services" />,
    title: "Our Services",
    description: "Discover what we offer",
  },
  {
    path: "/contact",
    component: () => <MainContent currentPage="contact" />,
    title: "Contact Us",
    description: "Get in touch with us",
  },
];

// Route wrapper component
const RouteWrapper: React.FC<{
  component: React.ComponentType<any>;
  title: string;
  meta?: Record<string, any>;
}> = ({ component: Component, title, meta }) => {
  // Update document title
  React.useEffect(() => {
    document.title = `${title} | Microfrontend App`;

    // Update meta tags if provided
    if (meta) {
      Object.entries(meta).forEach(([name, content]) => {
        let metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = String(content);
      });
    }
  }, [title, meta]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

// Create router configuration
export const createMicroFrontendRouter = (routes: MicroFrontendRoute[] = defaultRoutes, isMemoryRouter = false) => {
  const routerConfig = [
    {
      path: "/",
      element: <RootLayout />,
      children: routes.map((route) => ({
        path: route.path === "/" ? "" : route.path, // Empty path for index route
        element: <RouteWrapper component={route.component} title={route.title} meta={route.meta} />,
      })),
      errorElement: (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page not found</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go Home
            </button>
          </div>
        </div>
      ),
    },
  ];

  return isMemoryRouter ? createMemoryRouter(routerConfig) : createBrowserRouter(routerConfig);
};

// Navigation helper functions (updated to work with React Router)
export const navigationHelpers = {
  // Navigate to a specific route - will be updated by RouterSync component with router navigation
  navigateTo: (_path: string) => {
    console.warn("Navigation helper not initialized. Use React Router's navigate function instead.");
  },

  // Go back in history
  goBack: () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  },

  // Go forward in history
  goForward: () => {
    if (typeof window !== "undefined") {
      window.history.forward();
    }
  },

  // Replace current route - will be updated by RouterSync component with router navigation
  replaceTo: (_path: string) => {
    console.warn("Navigation helper not initialized. Use React Router's navigate function instead.");
  },

  // Get current pathname
  getCurrentPath: () => {
    return typeof window !== "undefined" ? window.location.pathname : "/";
  },

  // Check if a route is active
  isActiveRoute: (path: string) => {
    const currentPath = navigationHelpers.getCurrentPath();
    return currentPath === path || (path === "/" && currentPath === "/360vision");
  },

  // Map tab names to routes for backward compatibility
  getRouteFromTab: (tab: string) => {
    const tabToRoute: Record<string, string> = {
      // Sidebar navigation routes (primary)
      inicio: "/inicio",
      registos: "/registos",
      outbounds: "/outbounds",
      vendas: "/vendas",
      scripts: "/scripts",
      documentacao: "/documentacao",
      kpis: "/kpis",
      definicoes: "/definicoes",
      pesquisa: "/pesquisa",
      // Header tab routes (secondary)
      "360vision": "/360vision",
      personalData: "/personal-data",
      assetsProducts: "/assets-products",
      channelsAndServices: "/channels-services",
      historyInteractions: "/history-interactions",
      // Legacy navigation routes for footer
      home: "/home",
      about: "/about",
      services: "/services",
      contact: "/contact",
    };
    return tabToRoute[tab] || "/inicio";
  },

  // Map routes to tab names for backward compatibility
  getTabFromRoute: (route: string) => {
    const routeToTab: Record<string, string> = {
      // Sidebar navigation routes (primary)
      "/": "inicio",
      "/inicio": "inicio",
      "/registos": "registos",
      "/outbounds": "outbounds",
      "/vendas": "vendas",
      "/scripts": "scripts",
      "/documentacao": "documentacao",
      "/kpis": "kpis",
      "/definicoes": "definicoes",
      "/pesquisa": "pesquisa",
      // Header tab routes (secondary)
      "/360vision": "360vision",
      "/personal-data": "personalData",
      "/assets-products": "assetsProducts",
      "/channels-services": "channelsAndServices",
      "/history-interactions": "historyInteractions",
      // Legacy navigation routes for footer
      "/home": "home",
      "/about": "about",
      "/services": "services",
      "/contact": "contact",
    };
    return routeToTab[route] || "inicio";
  },
};

// Make navigation helpers globally available for microfrontends
declare global {
  interface Window {
    microFrontendNavigation: typeof navigationHelpers & {
      getRouteFromTab?: (tab: string) => string;
      getTabFromRoute?: (route: string) => string;
    };
  }
}

if (typeof window !== "undefined") {
  // Create a dynamic navigation object that always uses the latest functions
  window.microFrontendNavigation = {
    navigateTo: (path: string) => {
      console.log("Global navigateTo called with:", path);
      return navigationHelpers.navigateTo(path);
    },
    replaceTo: (path: string) => {
      return navigationHelpers.replaceTo(path);
    },
    goBack: navigationHelpers.goBack,
    goForward: navigationHelpers.goForward,
    getCurrentPath: navigationHelpers.getCurrentPath,
    isActiveRoute: navigationHelpers.isActiveRoute,
    getRouteFromTab: navigationHelpers.getRouteFromTab,
    getTabFromRoute: navigationHelpers.getTabFromRoute,
  };
  console.log("Initial global navigation setup:", window.microFrontendNavigation);
}

export default createMicroFrontendRouter;

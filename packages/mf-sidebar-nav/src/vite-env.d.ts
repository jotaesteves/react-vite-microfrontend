/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Shared library declarations
declare module "shared/EventBus" {
  const eventBus: any;
  export default eventBus;
}

declare module "shared/GlobalStore" {
  export * from "../../shared/src/stores/globalStore";
}

declare module "shared/ErrorBoundary" {
  const ErrorBoundary: React.ComponentType<any>;
  export default ErrorBoundary;
}

declare module "shared/MicroFrontendProvider" {
  const MicroFrontendProvider: React.ComponentType<any>;
  export default MicroFrontendProvider;
}

declare module "shared/useMicroFrontend" {
  export * from "../../shared/src/hooks/useMicroFrontend";
}

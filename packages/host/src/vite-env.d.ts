/// <reference types="vite/client" />

// Shared library declarations
declare module "shared/EventBus" {
  const eventBus: any;
  export default eventBus;
  export * from "../../shared/src/shared/eventBus";
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

// Header and Footer microfrontends
declare module "mfHeader/Header" {
  const Header: React.ComponentType;
  export default Header;
}

declare module "mfFooter/Footer" {
  const Footer: React.ComponentType;
  export default Footer;
}

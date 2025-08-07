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

// Screen microfrontends
declare module "mf-canais-e-servicos/CanaisEServicos" {
  const CanaisEServicos: React.ComponentType;
  export default CanaisEServicos;
}

declare module "mf-dados-pessoais/DadosPessoais" {
  const DadosPessoais: React.ComponentType;
  export default DadosPessoais;
}

declare module "mf-historico-interacoes/HistoricoInteracoes" {
  const HistoricoInteracoes: React.ComponentType;
  export default HistoricoInteracoes;
}

declare module "mf-patrimonio-e-produtos/PatrimonioEProdutos" {
  const PatrimonioEProdutos: React.ComponentType;
  export default PatrimonioEProdutos;
}

declare module "mf-visao-360/Visao360" {
  const Visao360: React.ComponentType;
  export default Visao360;
}

declare module "mf-sidebar-nav/SideBarNav" {
  const SideBarNav: React.ComponentType;
  export default SideBarNav;
}

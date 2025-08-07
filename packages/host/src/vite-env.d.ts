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

// Sidebar navigation screen microfrontends
declare module "mf-inicio/Inicio" {
  const Inicio: React.ComponentType;
  export default Inicio;
}

declare module "mf-registos/Registos" {
  const Registos: React.ComponentType;
  export default Registos;
}

declare module "mf-outbounds/Outbounds" {
  const Outbounds: React.ComponentType;
  export default Outbounds;
}

declare module "mf-vendas/Vendas" {
  const Vendas: React.ComponentType;
  export default Vendas;
}

declare module "mf-scripts/Scripts" {
  const Scripts: React.ComponentType;
  export default Scripts;
}

declare module "mf-documentacao/Documentacao" {
  const Documentacao: React.ComponentType;
  export default Documentacao;
}

declare module "mf-kpis/KPIs" {
  const KPIs: React.ComponentType;
  export default KPIs;
}

declare module "mf-definicoes/Definicoes" {
  const Definicoes: React.ComponentType;
  export default Definicoes;
}

declare module "mf-pesquisa/Pesquisa" {
  const Pesquisa: React.ComponentType;
  export default Pesquisa;
}

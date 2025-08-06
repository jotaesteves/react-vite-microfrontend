import React from "react";
import Visao360 from "../screens/Visao360";
import DadosPessoais from "../screens/DadosPessoais";
import PatrimonioEProdutos from "../screens/PatrimonioEProdutos";
import CanaisEServicos from "../screens/CanaisEServicos";
import HistoricoInteracoes from "../screens/HistoricoInteracoes";
import { useGlobalStore } from "../stores/globalStore";

/**
 * @deprecated This component is deprecated in favor of React Router.
 * It's kept for backward compatibility only.
 * Use React Router navigation instead.
 */
const tabToScreen: Record<string, React.ComponentType> = {
  "360vision": Visao360,
  personalData: DadosPessoais,
  assetsProducts: PatrimonioEProdutos,
  channelsAndServices: CanaisEServicos,
  historyInteractions: HistoricoInteracoes,
};

/**
 * @deprecated This component is deprecated in favor of React Router.
 * The screens are now handled by the router configuration.
 * This component is kept for backward compatibility only.
 */
const TabScreenRouter: React.FC = () => {
  const activeTab = useGlobalStore((state) => state.currentPage);
  const ScreenComponent = tabToScreen[activeTab] || Visao360;
  return <ScreenComponent />;
};

export default TabScreenRouter;

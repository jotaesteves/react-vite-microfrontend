import React from "react";

const Inicio: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">🏠</span>
        <h1 className="text-2xl font-bold text-gray-900">Início</h1>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Dashboard Geral</h3>
            <p className="text-blue-700 text-sm">Visão geral de todas as atividades e métricas principais.</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Atividades Recentes</h3>
            <p className="text-green-700 text-sm">Últimas interações e atualizações do sistema.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">Acesso Rápido</h3>
            <p className="text-purple-700 text-sm">Atalhos para as funcionalidades mais utilizadas.</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Bem-vindo ao Sistema</h2>
          <p className="text-gray-700 mb-4">
            Este é o painel principal onde pode aceder a todas as funcionalidades do sistema. Use a navegação lateral
            para aceder às diferentes secções.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Dashboard</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Início Rápido
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Navegação</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

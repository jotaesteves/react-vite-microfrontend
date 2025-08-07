import React from "react";

const Pesquisa: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">🔍</span>
        <h1 className="text-2xl font-bold text-gray-900">Pesquisa</h1>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Pesquisa</h2>
          <p className="text-gray-700 mb-4">
            Esta é a página de Pesquisa. Aqui pode gerir e visualizar todas as funcionalidades relacionadas com Pesquisa.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-1">Funcionalidade 1</h4>
              <p className="text-blue-700 text-sm">Descrição da primeira funcionalidade de Pesquisa.</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <h4 className="font-medium text-green-900 mb-1">Funcionalidade 2</h4>
              <p className="text-green-700 text-sm">Descrição da segunda funcionalidade de Pesquisa.</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Pesquisa
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Microfrontend
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            React
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pesquisa;

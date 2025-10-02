import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Bem-vindo ao Todo App
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Gerencie usuários e produtos de forma simples e eficiente
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Gerenciar Usuários
            </h2>
            <p className="text-gray-600 mb-6">
              Crie, edite e gerencie usuários do sistema com facilidade.
            </p>
            <Link
              to="/users"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Acessar Usuários
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Gerenciar Produtos
            </h2>
            <p className="text-gray-600 mb-6">
              Controle seu estoque e produtos com informações detalhadas.
            </p>
            <Link
              to="/products"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Acessar Produtos
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🚀 Funcionalidades
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Interface moderna e responsiva</li>
            <li>• CRUD completo para usuários e produtos</li>
            <li>• Busca e filtros avançados</li>
            <li>• Validação de formulários em tempo real</li>
            <li>• Integração com API REST</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

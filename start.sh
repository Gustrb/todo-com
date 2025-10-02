#!/bin/bash

echo "🚀 Iniciando Todo App - Frontend e Backend"
echo "=========================================="

# Verificar se pnpm está instalado
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm não está instalado. Instalando..."
    npm install -g pnpm
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o Node.js."
    exit 1
fi

echo "📦 Instalando dependências do backend..."
cd backend
pnpm install

echo "📦 Instalando dependências do frontend..."
cd ../frontend
npm install

echo "🔧 Configuração concluída!"
echo ""
echo "Para executar o projeto:"
echo "1. Terminal 1 - Backend:"
echo "   cd backend && pnpm start"
echo ""
echo "2. Terminal 2 - Frontend:"
echo "   cd frontend && npm start"
echo ""
echo "🌐 URLs:"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:3001"
echo ""
echo "✅ Pronto para usar!"

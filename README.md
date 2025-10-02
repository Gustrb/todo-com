# Todo App - Frontend e Backend

Este projeto consiste em um sistema completo de gerenciamento de usuários e produtos, com frontend em React/TypeScript e backend em Node.js/Express.

## 🚀 Funcionalidades

- **Gerenciamento de Usuários**: CRUD completo para usuários
- **Gerenciamento de Produtos**: CRUD completo para produtos com controle de estoque
- **Interface Moderna**: Design responsivo com Tailwind CSS
- **API REST**: Backend com Express.js e TypeScript
- **Integração**: Frontend conectado ao backend via axios

## 📁 Estrutura do Projeto

```
todo-com/
├── backend/           # API REST em Node.js/Express
│   ├── auth/         # Módulo de autenticação/usuários
│   ├── products/     # Módulo de produtos
│   └── server/       # Configuração do servidor
└── frontend/         # Interface React/TypeScript
    ├── src/
    │   ├── components/  # Componentes React
    │   ├── pages/       # Páginas da aplicação
    │   ├── services/    # Serviços de API
    │   └── types/       # Tipos TypeScript
```

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- TypeScript
- CORS

### Frontend
- React 18
- TypeScript
- Axios
- React Router DOM
- Tailwind CSS

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- pnpm (gerenciador de pacotes)

### 1. Instalar dependências do Backend

```bash
cd backend
pnpm install
```

### 2. Executar o Backend

```bash
cd backend
pnpm start
```

O backend estará rodando em `http://localhost:3000`

### 3. Instalar dependências do Frontend

```bash
cd frontend
npm install
```

### 4. Executar o Frontend

```bash
cd frontend
npm start
```

O frontend estará rodando em `http://localhost:3001`

## 📋 APIs Disponíveis

### Usuários (`/auth`)
- `POST /auth` - Criar usuário
- `GET /auth` - Listar usuários
- `GET /auth/:id` - Buscar usuário por ID
- `PUT /auth/:id` - Atualizar usuário
- `DELETE /auth/:id` - Deletar usuário

### Produtos (`/products`)
- `POST /products` - Criar produto
- `GET /products` - Listar produtos (com filtro por título)
- `GET /products/:id` - Buscar produto por ID
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

## 🎨 Interface do Usuário

### Página Inicial
- Dashboard com links para usuários e produtos
- Informações sobre funcionalidades

### Gerenciamento de Usuários
- Lista de usuários com status (ativo/inativo)
- Formulário para criar/editar usuários
- Validação de email e senha

### Gerenciamento de Produtos
- Lista de produtos com informações detalhadas
- Busca por título
- Formulário para criar/editar produtos
- Cálculo automático do valor total
- Validação de dados

## 🔧 Configuração

### CORS
O backend está configurado para aceitar requisições do frontend em `http://localhost:3001`.

### Tipos TypeScript
Todos os tipos são compartilhados entre frontend e backend para garantir consistência.

## 📝 Estrutura dos Dados

### Usuário
```typescript
{
  id: string;
  email: string;
  password_digest: string;
  is_active: boolean;
}
```

### Produto
```typescript
{
  id: string;
  title: string;
  unitaryCost: number;
  currency: "BRL";
  quantity: number;
  is_active: boolean;
}
```

## 🚀 Próximos Passos

- [ ] Implementar autenticação JWT
- [ ] Adicionar testes unitários
- [ ] Implementar paginação
- [ ] Adicionar upload de imagens para produtos
- [ ] Implementar relatórios
- [ ] Adicionar dashboard com estatísticas

## 📞 Suporte

Para dúvidas ou problemas, verifique os logs do console tanto no frontend quanto no backend.

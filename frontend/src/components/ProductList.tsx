import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { apiService } from '../services/api';
import ProductForm from './ProductForm';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTitle, setSearchTitle] = useState('');

  const loadProducts = async (title?: string) => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await apiService.getProducts(title);
      setProducts(productsData);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateProduct = async (productData: {
    title: string;
    unitaryCost: number;
    currency: 'BRL';
    quantity: number;
  }) => {
    try {
      await apiService.createProduct(productData);
      setShowForm(false);
      loadProducts();
    } catch (err) {
      setError('Erro ao criar produto');
      console.error('Error creating product:', err);
    }
  };

  const handleUpdateProduct = async (productData: {
    title: string;
    unitaryCost: number;
    currency: 'BRL';
    quantity: number;
  }) => {
    if (!editingProduct) return;
    
    try {
      await apiService.updateProduct(editingProduct.id, {
        updates: ['title', 'unitaryCost', 'currency', 'quantity'],
        updated: productData
      });
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      setError('Erro ao atualizar produto');
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) {
      return;
    }

    try {
      await apiService.deleteProduct(id);
      loadProducts();
    } catch (err) {
      setError('Erro ao deletar produto');
      console.error('Error deleting product:', err);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadProducts(searchTitle || undefined);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {showForm ? 'Cancelar' : 'Novo Produto'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Buscar por título..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchTitle('');
            loadProducts();
          }}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Limpar
        </button>
      </form>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Criar Novo Produto</h3>
          <ProductForm
            onSubmit={handleCreateProduct}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingProduct && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Editar Produto</h3>
          <ProductForm
            onSubmit={handleUpdateProduct}
            onCancel={handleCancelEdit}
            initialData={{
              title: editingProduct.title,
              unitaryCost: editingProduct.unitaryCost,
              currency: editingProduct.currency,
              quantity: editingProduct.quantity
            }}
            submitButtonText="Atualizar Produto"
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Custo Unitário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(product.unitaryCost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(product.unitaryCost * product.quantity)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum produto encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;

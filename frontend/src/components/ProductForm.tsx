import React, { useState } from 'react';
import { ProductPayload } from '../types';

interface ProductFormProps {
  onSubmit: (productData: ProductPayload) => void;
  onCancel?: () => void;
  initialData?: Partial<ProductPayload>;
  submitButtonText?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
  submitButtonText = 'Criar Produto'
}) => {
  const [formData, setFormData] = useState<ProductPayload>({
    title: initialData.title || '',
    unitaryCost: initialData.unitaryCost || 0,
    currency: initialData.currency || 'BRL',
    quantity: initialData.quantity || 0,
  });

  const [errors, setErrors] = useState<Partial<ProductPayload>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'unitaryCost' || name === 'quantity' 
        ? parseFloat(value) || 0 
        : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ProductPayload]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductPayload> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (formData.unitaryCost <= 0) {
      newErrors.unitaryCost = 'Custo unitário deve ser maior que zero';
    }

    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantidade não pode ser negativa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Digite o título do produto"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="unitaryCost" className="block text-sm font-medium text-gray-700">
          Custo Unitário (R$)
        </label>
        <input
          type="number"
          id="unitaryCost"
          name="unitaryCost"
          value={formData.unitaryCost}
          onChange={handleChange}
          step="0.01"
          min="0"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.unitaryCost ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="0.00"
        />
        {errors.unitaryCost && (
          <p className="mt-1 text-sm text-red-600">{errors.unitaryCost}</p>
        )}
      </div>

      <div>
        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
          Moeda
        </label>
        <select
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="BRL">BRL (Real Brasileiro)</option>
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantidade
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.quantity ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="0"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
        )}
      </div>

      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm text-gray-600">
          <strong>Valor Total:</strong> {formatCurrency(formData.unitaryCost * formData.quantity)}
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {submitButtonText}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;

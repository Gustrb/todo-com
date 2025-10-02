import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';
import UserForm from './UserForm';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await apiService.getUsers();
      setUsers(usersData);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (userData: { email: string; password: string }) => {
    try {
      await apiService.createUser(userData);
      setShowForm(false);
      loadUsers();
    } catch (err) {
      setError('Erro ao criar usuário');
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async (userData: { email: string; password: string }) => {
    if (!editingUser) return;
    
    try {
      await apiService.updateUser(editingUser.id, {
        updates: ['email', 'password'],
        updated: userData
      });
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      setError('Erro ao atualizar usuário');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) {
      return;
    }

    try {
      await apiService.deleteUser(id);
      loadUsers();
    } catch (err) {
      setError('Erro ao deletar usuário');
      console.error('Error deleting user:', err);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Usuários</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {showForm ? 'Cancelar' : 'Novo Usuário'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Criar Novo Usuário</h3>
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingUser && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Editar Usuário</h3>
          <UserForm
            onSubmit={handleUpdateUser}
            onCancel={handleCancelEdit}
            initialData={{
              email: editingUser.email,
              password: ''
            }}
            submitButtonText="Atualizar Usuário"
          />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
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
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum usuário encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;

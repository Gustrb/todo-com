import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User, UserPayload, UserUpdatePayload, Product, ProductPayload, ProductUpdatePayload, ApiError } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log('Making request to:', config.url);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // User API methods
  async createUser(userData: UserPayload): Promise<User> {
    const response: AxiosResponse<User> = await this.api.post('/auth', userData);
    return response.data;
  }

  async getUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await this.api.get('/auth');
    return response.data;
  }

  async getUser(id: string): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get(`/auth/${id}`);
    return response.data;
  }

  async updateUser(id: string, updateData: UserUpdatePayload): Promise<void> {
    await this.api.put(`/auth/${id}`, updateData);
  }

  async deleteUser(id: string): Promise<void> {
    await this.api.delete(`/auth/${id}`);
  }

  // Product API methods
  async createProduct(productData: ProductPayload): Promise<Product> {
    const response: AxiosResponse<Product> = await this.api.post('/products', productData);
    return response.data;
  }

  async getProducts(title?: string): Promise<Product[]> {
    const params = title ? { title } : {};
    const response: AxiosResponse<Product[]> = await this.api.get('/products', { params });
    return response.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response: AxiosResponse<Product> = await this.api.get(`/products/${id}`);
    return response.data;
  }

  async updateProduct(id: string, updateData: ProductUpdatePayload): Promise<void> {
    await this.api.put(`/products/${id}`, updateData);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.api.delete(`/products/${id}`);
  }
}

export const apiService = new ApiService();

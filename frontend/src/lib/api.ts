import axios from 'axios';
import { Toy, ToyType, CreateToyRequest, UpdateToyRequest } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const toyApi = {
  // 获取所有玩具
  getAllToys: async (): Promise<Toy[]> => {
    try {
      const response = await apiClient.get('/api/toys');
      // 后端返回格式: { success: true, data: [...] }
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('获取玩具列表失败:', error);
      return [];
    }
  },

  // 根据ID获取玩具
  getToyById: async (id: number): Promise<Toy> => {
    try {
      const response = await apiClient.get(`/api/toys/${id}`);
      // 后端直接返回data。如果找不到，则返回404
      return response.data.data;
    } catch (error) {
      console.error(`获取玩具(ID: ${id})失败:`, error);
      throw error;
    }
  },

  // 创建玩具
  createToy: async (toy: CreateToyRequest): Promise<Toy> => {
    const response = await apiClient.post('/api/toys', toy);
    return response.data;
  },

  // 更新玩具
  updateToy: async (id: number, toy: UpdateToyRequest): Promise<Toy> => {
    const response = await apiClient.put(`/api/toys/${id}`, toy);
    return response.data;
  },

  // 删除玩具
  deleteToy: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/toys/${id}`);
  },
};

export const toyTypeApi = {
  // 获取所有玩具类型
  getAllToyTypes: async (): Promise<ToyType[]> => {
    try {
      const response = await apiClient.get('/api/toy-types');
      // 后端返回格式: { success: true, data: [...] }
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('获取玩具类型列表失败:', error);
      return [];
    }
  },

  // 根据ID获取玩具类型
  getToyTypeById: async (id: number): Promise<ToyType> => {
    const response = await apiClient.get(`/api/toy-types/${id}`);
    return response.data;
  },
};

export default apiClient;

import { ToyType, CreateToyTypeRequest, UpdateToyTypeRequest } from '../types/toyType';
import { MemoryToyTypeRepository } from '../repositories/memoryToyTypeRepository';

export class ToyTypeService {
  /**
   * 获取所有玩具类型
   */
  static async getAllToyTypes(): Promise<ToyType[]> {
    try {
      return await MemoryToyTypeRepository.findAll();
    } catch (error) {
      console.error('获取玩具类型列表失败:', error);
      throw new Error('获取玩具类型列表失败');
    }
  }

  /**
   * 根据 ID 获取玩具类型
   */
  static async getToyTypeById(id: number): Promise<ToyType> {
    try {
      const toyType = await MemoryToyTypeRepository.findById(id);
      if (!toyType) {
        throw new Error('玩具类型不存在');
      }
      return toyType;
    } catch (error) {
      console.error('获取玩具类型失败:', error);
      if (error instanceof Error && error.message === '玩具类型不存在') {
        throw error;
      }
      throw new Error('获取玩具类型失败');
    }
  }

  /**
   * 创建新的玩具类型
   */
  static async createToyType(toyTypeData: CreateToyTypeRequest): Promise<ToyType> {
    try {
      // 验证输入数据
      if (!toyTypeData.name || !toyTypeData.description) {
        throw new Error('玩具类型名称和描述不能为空');
      }

      return await MemoryToyTypeRepository.create(toyTypeData);
    } catch (error) {
      console.error('创建玩具类型失败:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('创建玩具类型失败');
    }
  }

  /**
   * 更新玩具类型
   */
  static async updateToyType(id: number, toyTypeData: UpdateToyTypeRequest): Promise<ToyType> {
    try {
      const toyType = await MemoryToyTypeRepository.update(id, toyTypeData);
      if (!toyType) {
        throw new Error('玩具类型不存在');
      }
      return toyType;
    } catch (error) {
      console.error('更新玩具类型失败:', error);
      if (error instanceof Error && error.message === '玩具类型不存在') {
        throw error;
      }
      throw new Error('更新玩具类型失败');
    }
  }

  /**
   * 删除玩具类型
   */
  static async deleteToyType(id: number): Promise<void> {
    try {
      const deleted = await MemoryToyTypeRepository.delete(id);
      if (!deleted) {
        throw new Error('玩具类型不存在');
      }
    } catch (error) {
      console.error('删除玩具类型失败:', error);
      if (error instanceof Error && error.message === '玩具类型不存在') {
        throw error;
      }
      throw new Error('删除玩具类型失败');
    }
  }
}

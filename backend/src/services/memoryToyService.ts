import { Toy, CreateToyRequest, UpdateToyRequest } from '../types/toy';
import { MemoryToyRepository } from '../repositories/memoryToyRepository';
import { MemoryToyTypeRepository } from '../repositories/memoryToyTypeRepository';

export class ToyService {
  /**
   * 根据玩具类型ID获取玩具列表
   * @param toyTypeId 玩具类型ID，如果为0则获取所有玩具
   */
  static async getToysByTypeId(toyTypeId: number): Promise<Toy[]> {
    try {
      let toys: Toy[];
      
      if (toyTypeId === 0) {
        // 获取所有玩具
        toys = await MemoryToyRepository.findAll();
      } else {
        // 获取指定类型的玩具
        toys = await MemoryToyRepository.findByToyTypeId(toyTypeId);
      }

      // 为每个玩具添加玩具类型信息
      const toysWithType = await Promise.all(
        toys.map(async (toy) => {
          const toyType = await MemoryToyTypeRepository.findById(toy.toyTypeId);
          return {
            ...toy,
            toyType: toyType ? {
              id: toyType.id,
              name: toyType.name,
              description: toyType.description,
              icon: toyType.icon
            } : undefined
          };
        })
      );

      return toysWithType;
    } catch (error) {
      console.error('获取玩具列表失败:', error);
      throw new Error('获取玩具列表失败');
    }
  }

  /**
   * 获取所有玩具
   */
  static async getAllToys(): Promise<Toy[]> {
    try {
      const toys = await MemoryToyRepository.findAll();
      
      // 为每个玩具添加玩具类型信息
      const toysWithType = await Promise.all(
        toys.map(async (toy) => {
          const toyType = await MemoryToyTypeRepository.findById(toy.toyTypeId);
          return {
            ...toy,
            toyType: toyType ? {
              id: toyType.id,
              name: toyType.name,
              description: toyType.description,
              icon: toyType.icon
            } : undefined
          };
        })
      );

      return toysWithType;
    } catch (error) {
      console.error('获取玩具列表失败:', error);
      throw new Error('获取玩具列表失败');
    }
  }

  /**
   * 根据 ID 获取玩具
   */
  static async getToyById(id: number): Promise<Toy> {
    try {
      const toy = await MemoryToyRepository.findById(id);
      if (!toy) {
        throw new Error('玩具不存在');
      }

      // 添加玩具类型信息
      const toyType = await MemoryToyTypeRepository.findById(toy.toyTypeId);
      return {
        ...toy,
        toyType: toyType ? {
          id: toyType.id,
          name: toyType.name,
          description: toyType.description,
          icon: toyType.icon
        } : undefined
      };
    } catch (error) {
      console.error('获取玩具失败:', error);
      if (error instanceof Error && error.message === '玩具不存在') {
        throw error;
      }
      throw new Error('获取玩具失败');
    }
  }

  /**
   * 创建新的玩具
   */
  static async createToy(toyData: CreateToyRequest): Promise<Toy> {
    try {
      // 验证玩具类型是否存在
      const toyType = await MemoryToyTypeRepository.findById(toyData.toyTypeId);
      if (!toyType) {
        throw new Error('指定的玩具类型不存在');
      }

      // 验证输入数据
      if (!toyData.name || !toyData.description || toyData.price <= 0) {
        throw new Error('玩具名称、描述不能为空，价格必须大于0');
      }

      const newToy = await MemoryToyRepository.create(toyData);
      
      // 添加玩具类型信息
      return {
        ...newToy,
        toyType: {
          id: toyType.id,
          name: toyType.name,
          description: toyType.description,
          icon: toyType.icon
        }
      };
    } catch (error) {
      console.error('创建玩具失败:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('创建玩具失败');
    }
  }

  /**
   * 更新玩具
   */
  static async updateToy(id: number, toyData: UpdateToyRequest): Promise<Toy> {
    try {
      // 如果更新玩具类型，验证类型是否存在
      if (toyData.toyTypeId) {
        const toyType = await MemoryToyTypeRepository.findById(toyData.toyTypeId);
        if (!toyType) {
          throw new Error('指定的玩具类型不存在');
        }
      }

      const toy = await MemoryToyRepository.update(id, toyData);
      if (!toy) {
        throw new Error('玩具不存在');
      }

      // 添加玩具类型信息
      const toyType = await MemoryToyTypeRepository.findById(toy.toyTypeId);
      return {
        ...toy,
        toyType: toyType ? {
          id: toyType.id,
          name: toyType.name,
          description: toyType.description,
          icon: toyType.icon
        } : undefined
      };
    } catch (error) {
      console.error('更新玩具失败:', error);
      if (error instanceof Error && (error.message === '玩具不存在' || error.message === '指定的玩具类型不存在')) {
        throw error;
      }
      throw new Error('更新玩具失败');
    }
  }

  /**
   * 删除玩具
   */
  static async deleteToy(id: number): Promise<void> {
    try {
      const deleted = await MemoryToyRepository.delete(id);
      if (!deleted) {
        throw new Error('玩具不存在');
      }
    } catch (error) {
      console.error('删除玩具失败:', error);
      if (error instanceof Error && error.message === '玩具不存在') {
        throw error;
      }
      throw new Error('删除玩具失败');
    }
  }
}

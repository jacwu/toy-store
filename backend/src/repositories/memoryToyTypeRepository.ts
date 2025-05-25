import { ToyType, CreateToyTypeRequest, UpdateToyTypeRequest } from '../types/toyType';

// 内存中的玩具类型数据存储
let toyTypesData: ToyType[] = [
  {
    id: 1,
    name: '益智玩具',
    description: '如拼图、积木等，帮助开发逻辑思维和创造力',
    icon: '🧩'
  },
  {
    id: 2,
    name: '遥控玩具',
    description: '如遥控车、无人机等，提供互动娱乐体验',
    icon: '🚗'
  },
  {
    id: 3,
    name: '户外玩具',
    description: '如滑板车、秋千等，鼓励户外活动和运动',
    icon: '🛴'
  },
  {
    id: 4,
    name: '玩偶玩具',
    description: '布娃娃等，培养情感表达和照顾能力',
    icon: '🧸'
  }
];

let nextId = 5;

export class MemoryToyTypeRepository {
  /**
   * 获取所有玩具类型
   */
  static async findAll(): Promise<ToyType[]> {
    return [...toyTypesData];
  }

  /**
   * 根据 ID 获取玩具类型
   */
  static async findById(id: number): Promise<ToyType | null> {
    const toyType = toyTypesData.find(t => t.id === id);
    return toyType ? { ...toyType } : null;
  }
}

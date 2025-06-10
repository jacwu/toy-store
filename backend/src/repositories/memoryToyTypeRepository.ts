import { ToyType, CreateToyTypeRequest, UpdateToyTypeRequest } from '../types/toyType';

// In-memory toy type data storage
let toyTypesData: ToyType[] = [
  {
    id: 1,
    name: 'Educational Toys',
    description: 'Such as puzzles, building blocks, etc., help develop logical thinking and creativity',
    icon: '🧩'
  },
  {
    id: 2,
    name: 'Remote Control Toys',
    description: 'Such as RC cars, drones, etc., provide interactive entertainment experience',
    icon: '🚗'
  },
  {
    id: 3,
    name: 'Outdoor Toys',
    description: 'Such as scooters, swings, etc., encourage outdoor activities and sports',
    icon: '🛴'
  },
  {
    id: 4,
    name: 'Doll Toys',
    description: 'Dolls, etc., foster emotional expression and caring abilities',
    icon: '🧸'
  }
];

let nextId = 5;

export class MemoryToyTypeRepository {
  /**
   * Get all toy types
   */
  static async findAll(): Promise<ToyType[]> {
    return [...toyTypesData];
  }

  /**
   * Get toy type by ID
   */
  static async findById(id: number): Promise<ToyType | null> {
    const toyType = toyTypesData.find(t => t.id === id);
    return toyType ? { ...toyType } : null;
  }
}

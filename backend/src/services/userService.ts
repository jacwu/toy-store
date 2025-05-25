import { User } from '../types/user';
import { MemoryUserRepository } from '../repositories/memoryUserRepository';

export class UserService {
  static async register(userData: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
    try {
      const newUser = await MemoryUserRepository.save(userData);
      return newUser;
    } catch (error) {
      // Handle potential errors from the repository
      if (error instanceof Error) {
        throw new Error(`Error registering user: ${error.message}`);
      }
      throw new Error('An unknown error occurred during user registration.');
    }
  }
}

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

  static async login(userData: Pick<User, 'username' | 'password'>): Promise<Omit<User, 'password'>> {
    const user = await MemoryUserRepository.findByUsername(userData.username);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== userData.password) {
      throw new Error('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

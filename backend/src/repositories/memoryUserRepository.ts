import { User } from '../types/user';

export class MemoryUserRepository {
  private static users: User[] = [{ id: 0, username: 'jacwu', password: 'jacwu' }];
  private static nextId = 1;

  static async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  static async save(user: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
    const existingUser = await this.findByUsername(user.username);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const newUserWithPassword = { ...user, id: this.nextId++ };
    this.users.push(newUserWithPassword);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUserWithoutPassword } = newUserWithPassword;
    return newUserWithoutPassword;
  }

  static async getAll(): Promise<User[]> {
    return [...this.users];
  }

  public static clear(): void {
    MemoryUserRepository.users = [{ id: 0, username: 'jacwu', password: 'jacwu' }];
    MemoryUserRepository.nextId = 1;
  }
}

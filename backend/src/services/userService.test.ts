import { UserService } from './userService';
import { MemoryUserRepository } from '../repositories/memoryUserRepository';
import { User } from '../types/user';

describe('UserService.register', () => {
  beforeEach(() => {
    // Clear the users in MemoryUserRepository before each test
    MemoryUserRepository.clear();
  });

  it('should register a new user successfully', async () => {
    const userData: Omit<User, 'id'> = {
      username: 'testuser',
      password: 'password123',
    };

    const registeredUser = await UserService.register(userData);

    // Assert that the returned user object has an id and the correct username
    expect(registeredUser).toHaveProperty('id');
    expect(registeredUser.id).toEqual(expect.any(Number));
    expect(registeredUser.username).toBe(userData.username);
    // Assert that password is not returned
    expect(registeredUser).not.toHaveProperty('password');

    // Assert that MemoryUserRepository.findByUsername can now find this user
    // Note: MemoryUserRepository still stores the password, but it's not returned by the service.
    const foundUser = await MemoryUserRepository.findByUsername(userData.username);
    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(registeredUser.id);
    expect(foundUser?.username).toBe(userData.username);
  });

  it('should throw an error if the username already exists', async () => {
    const userData: Omit<User, 'id'> = {
      username: 'existinguser',
      password: 'password123',
    };

    // Register a user first
    await UserService.register(userData);

    // Attempt to register another user with the same username
    try {
      await UserService.register(userData);
      // If register doesn't throw, fail the test
      fail('UserService.register should have thrown an error for duplicate username');
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Error registering user: User already exists');
      } else {
        fail('Error was not an instance of Error');
      }
    }

    // Also test with expect().toThrowError for cleaner syntax if preferred
    // For this to work, the exact error message from UserService.register must be 'User already exists'
    // or the error message from MemoryUserRepository.save needs to be propagated.
    // Current UserService wraps the error: `Error registering user: ${error.message}`
    await expect(UserService.register(userData)).rejects.toThrowError('Error registering user: User already exists');
  });

  it('should throw an error if repository save method fails for other reasons', async () => {
    const userData: Omit<User, 'id'> = {
      username: 'failuser',
      password: 'password123',
    };

    // Mock MemoryUserRepository.save to throw a generic error
    const originalSave = MemoryUserRepository.save;
    MemoryUserRepository.save = jest.fn().mockRejectedValueOnce(new Error('Database connection failed'));
    
    await expect(UserService.register(userData)).rejects.toThrowError('Error registering user: Database connection failed');

    // Restore original save method
    MemoryUserRepository.save = originalSave;
  });
});

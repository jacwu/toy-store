import { Request, Response, NextFunction } from 'express';
import { UserController } from './userController';
import { UserService } from '../services/userService';

// Mock UserService
jest.mock('../services/userService');

describe('UserController.register', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    // Reset mocks before each test
    (UserService.register as jest.Mock).mockClear();

    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should register a user successfully and return 201', async () => {
    mockRequest.body = { username: 'testuser', password: 'password123' };
    const mockUser = { id: 1, username: 'testuser' };
    (UserService.register as jest.Mock).mockResolvedValueOnce(mockUser);

    await UserController.register(mockRequest as Request, mockResponse as Response, mockNext);

    expect(UserService.register).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: 'User registered successfully',
      data: { id: mockUser.id, username: mockUser.username },
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 400 if username is missing', async () => {
    mockRequest.body = { password: 'password123' }; // Missing username

    await UserController.register(mockRequest as Request, mockResponse as Response, mockNext);

    expect(UserService.register).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Username and password are required',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 400 if password is missing', async () => {
    mockRequest.body = { username: 'testuser' }; // Missing password

    await UserController.register(mockRequest as Request, mockResponse as Response, mockNext);

    expect(UserService.register).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Username and password are required',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 409 if user already exists', async () => {
    mockRequest.body = { username: 'existinguser', password: 'password123' };
    // Simulate UserService throwing an error that includes 'User already exists'
    // UserController specifically checks for this substring.
    (UserService.register as jest.Mock).mockRejectedValueOnce(new Error('Error registering user: User already exists'));

    await UserController.register(mockRequest as Request, mockResponse as Response, mockNext);

    expect(UserService.register).toHaveBeenCalledWith({ username: 'existinguser', password: 'password123' });
    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'User already exists',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
  
  it('should call next with the error for other service errors', async () => {
    mockRequest.body = { username: 'testuser', password: 'password123' };
    const serviceError = new Error('Some other service error');
    (UserService.register as jest.Mock).mockRejectedValueOnce(serviceError);

    await UserController.register(mockRequest as Request, mockResponse as Response, mockNext);

    expect(UserService.register).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(serviceError);
  });

  it('should call next with a generic error if a non-Error object is thrown by UserService', async () => {
    mockRequest.body = { username: 'testuser', password: 'password123' };
    const nonErrorObject = { message: 'This is not an Error instance' };
    (UserService.register as jest.Mock).mockRejectedValueOnce(nonErrorObject);

    await UserController.register(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(UserService.register).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    // Check that the error passed to next is an instance of Error
    const nextError = (mockNext as jest.Mock).mock.calls[0][0];
    expect(nextError).toBeInstanceOf(Error);
    expect(nextError.message).toBe('An unknown error occurred during user registration.');
  });
});

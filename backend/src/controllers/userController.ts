import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { User } from '../types/user';

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ success: false, message: 'Username and password are required' });
      return;
    }

    try {
      const newUser = await UserService.register({ username, password });
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { id: newUser.id, username: newUser.username },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('User already exists')) {
          res.status(409).json({ success: false, message: 'User already exists' });
        } else {
          next(error);
        }
      } else {
        next(new Error('An unknown error occurred during user registration.'));
      }
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ success: false, message: 'Username and password are required' });
      return;
    }

    try {
      const userWithoutPassword = await UserService.login({ username, password });
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: userWithoutPassword,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'User not found' || error.message === 'Invalid credentials') {
          res.status(401).json({ success: false, message: 'Invalid username or password' });
        } else {
          next(error);
        }
      } else {
        next(new Error('An unknown error occurred during login.'));
      }
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { MessageService } from '../services/messageService';

export class MessageController {
  static async getAllMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await MessageService.getAllMessages();
      res.status(200).json({
        success: true,
        data: result.messages,
        total: result.total
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error('An unknown error occurred while retrieving messages.'));
      }
    }
  }

  static async getMessageById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = parseInt(req.params.id || '');

    if (isNaN(id) || id < 1) {
      res.status(400).json({ success: false, message: 'Invalid message ID' });
      return;
    }

    try {
      const message = await MessageService.getMessageById(id);
      res.status(200).json({
        success: true,
        data: message
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Message not found')) {
          res.status(404).json({ success: false, message: 'Message not found' });
        } else {
          next(error);
        }
      } else {
        next(new Error('An unknown error occurred while retrieving the message.'));
      }
    }
  }

  static async createMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
      return;
    }

    const { title, content, userId } = req.body;

    try {
      const newMessage = await MessageService.createMessage({ title, content, userId });
      res.status(201).json({
        success: true,
        message: 'Message created successfully',
        data: newMessage
      });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(new Error('An unknown error occurred while creating the message.'));
      }
    }
  }

  static async deleteMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = parseInt(req.params.id || '');

    if (isNaN(id) || id < 1) {
      res.status(400).json({ success: false, message: 'Invalid message ID' });
      return;
    }

    try {
      await MessageService.deleteMessage(id);
      res.status(200).json({
        success: true,
        message: 'Message deleted successfully'
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Message not found')) {
          res.status(404).json({ success: false, message: 'Message not found' });
        } else {
          next(error);
        }
      } else {
        next(new Error('An unknown error occurred while deleting the message.'));
      }
    }
  }
}
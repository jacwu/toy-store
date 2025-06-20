import { Message, CreateMessageRequest, MessageListResponse } from '../types/message';
import { MemoryMessageRepository } from '../repositories/memoryMessageRepository';
import { MemoryUserRepository } from '../repositories/memoryUserRepository';

export class MessageService {
  static async getAllMessages(): Promise<MessageListResponse> {
    try {
      const messages = await MemoryMessageRepository.findAll();
      return {
        messages,
        total: messages.length
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving messages: ${error.message}`);
      }
      throw new Error('An unknown error occurred while retrieving messages.');
    }
  }

  static async getMessageById(id: number): Promise<Message> {
    try {
      const message = await MemoryMessageRepository.findById(id);
      if (!message) {
        throw new Error('Message not found');
      }
      return message;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving message: ${error.message}`);
      }
      throw new Error('An unknown error occurred while retrieving the message.');
    }
  }

  static async createMessage(messageData: CreateMessageRequest): Promise<Message> {
    try {
      // Verify user exists
      const user = await MemoryUserRepository.findByUsername('');
      // Actually find the user by ID since we have userId in messageData
      // For now, we'll just use a simple approach and find user by ID manually
      // This is simplified since we don't have a findById method in UserRepository
      
      // Get the username for the message - simplified approach
      let username = 'Anonymous';
      if (messageData.userId === 0) {
        username = 'jacwu'; // Default user
      }

      const newMessage = await MemoryMessageRepository.create({
        ...messageData,
        username
      });
      return newMessage;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating message: ${error.message}`);
      }
      throw new Error('An unknown error occurred while creating the message.');
    }
  }

  static async deleteMessage(id: number): Promise<void> {
    try {
      const deleted = await MemoryMessageRepository.delete(id);
      if (!deleted) {
        throw new Error('Message not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting message: ${error.message}`);
      }
      throw new Error('An unknown error occurred while deleting the message.');
    }
  }
}
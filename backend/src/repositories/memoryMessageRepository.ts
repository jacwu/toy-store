import { Message, CreateMessageRequest } from '../types/message';

export class MemoryMessageRepository {
  private static messages: Message[] = [];
  private static nextId = 1;

  static async findAll(): Promise<Message[]> {
    return [...this.messages].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  static async findById(id: number): Promise<Message | undefined> {
    return this.messages.find(message => message.id === id);
  }

  static async create(messageData: CreateMessageRequest & { username: string }): Promise<Message> {
    const newMessage: Message = {
      ...messageData,
      id: this.nextId++,
      createdAt: new Date()
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  static async delete(id: number): Promise<boolean> {
    const index = this.messages.findIndex(message => message.id === id);
    if (index !== -1) {
      this.messages.splice(index, 1);
      return true;
    }
    return false;
  }

  public static clear(): void {
    MemoryMessageRepository.messages = [];
    MemoryMessageRepository.nextId = 1;
  }
}
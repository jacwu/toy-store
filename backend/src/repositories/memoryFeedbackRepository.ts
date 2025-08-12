import { Feedback, CreateFeedbackRequest } from '../types/feedback';

export class MemoryFeedbackRepository {
  private static feedbacks: Feedback[] = [];
  private static nextId = 1;

  static async findAll(): Promise<Feedback[]> {
    return this.feedbacks;
  }

  static async save(feedbackData: CreateFeedbackRequest): Promise<Feedback> {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: this.nextId++,
      createdAt: new Date()
    };
    this.feedbacks.push(newFeedback);
    return newFeedback;
  }

  public static clear(): void {
    MemoryFeedbackRepository.feedbacks = [];
    MemoryFeedbackRepository.nextId = 1;
  }
}
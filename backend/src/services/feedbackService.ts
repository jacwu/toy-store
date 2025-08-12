import { Feedback, CreateFeedbackRequest } from '../types/feedback';
import { MemoryFeedbackRepository } from '../repositories/memoryFeedbackRepository';

export class FeedbackService {
  static async submitFeedback(feedbackData: CreateFeedbackRequest): Promise<Feedback> {
    try {
      // Validate required fields
      if (!feedbackData.name || !feedbackData.email || !feedbackData.message) {
        throw new Error('所有字段都是必填的');
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(feedbackData.email)) {
        throw new Error('请提供有效的邮箱地址');
      }

      const newFeedback = await MemoryFeedbackRepository.save(feedbackData);
      return newFeedback;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`提交反馈失败: ${error.message}`);
      }
      throw new Error('提交反馈时发生未知错误');
    }
  }

  static async getAllFeedback(): Promise<Feedback[]> {
    try {
      return await MemoryFeedbackRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`获取反馈失败: ${error.message}`);
      }
      throw new Error('获取反馈时发生未知错误');
    }
  }
}
import { Request, Response, NextFunction } from 'express';
import { FeedbackService } from '../services/feedbackService';
import { CreateFeedbackRequest } from '../types/feedback';

export class FeedbackController {
  static async submitFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, message }: CreateFeedbackRequest = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ 
        success: false, 
        message: '姓名、邮箱和消息都是必填字段' 
      });
      return;
    }

    try {
      const feedback = await FeedbackService.submitFeedback({ name, email, message });
      res.status(201).json({
        success: true,
        message: '反馈提交成功',
        data: {
          id: feedback.id,
          name: feedback.name,
          email: feedback.email,
          message: feedback.message,
          createdAt: feedback.createdAt
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(new Error('提交反馈时发生未知错误'));
      }
    }
  }

  static async getAllFeedback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const feedbacks = await FeedbackService.getAllFeedback();
      res.status(200).json({
        success: true,
        message: '获取反馈列表成功',
        data: feedbacks,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        next(new Error('获取反馈时发生未知错误'));
      }
    }
  }
}
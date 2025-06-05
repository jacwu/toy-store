import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CommentService } from '../services/commentService';

export class CommentController {
  /**
   * 根据玩具 ID 获取评论列表
   * GET /api/toys/:toyId/comments
   */
  static async getCommentsByToyId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const toyIdParam = req.params.toyId;
      if (!toyIdParam) {
        res.status(400).json({
          success: false,
          message: '缺少玩具 ID 参数'
        });
        return;
      }
      
      const toyId = parseInt(toyIdParam);
      
      if (isNaN(toyId)) {
        res.status(400).json({
          success: false,
          message: '无效的玩具 ID'
        });
        return;
      }

      const comments = await CommentService.getCommentsByToyId(toyId);
      
      res.status(200).json({
        success: true,
        message: '获取评论列表成功',
        data: comments
      });
    } catch (error) {
      if (error instanceof Error && error.message === '玩具不存在') {
        res.status(404).json({
          success: false,
          message: '玩具不存在'
        });
        return;
      }
      next(error);
    }
  }

  /**
   * 根据 ID 获取评论
   * GET /api/comments/:id
   */
  static async getCommentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      if (!idParam) {
        res.status(400).json({
          success: false,
          message: '缺少评论 ID 参数'
        });
        return;
      }
      
      const id = parseInt(idParam);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: '无效的评论 ID'
        });
        return;
      }

      const comment = await CommentService.getCommentById(id);
      
      res.status(200).json({
        success: true,
        message: '获取评论成功',
        data: comment
      });
    } catch (error) {
      if (error instanceof Error && error.message === '评论不存在') {
        res.status(404).json({
          success: false,
          message: '评论不存在'
        });
        return;
      }
      next(error);
    }
  }

  /**
   * 创建新评论
   * POST /api/toys/:toyId/comments
   */
  static async createComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const toyIdParam = req.params.toyId;
      if (!toyIdParam) {
        res.status(400).json({
          success: false,
          message: '缺少玩具 ID 参数'
        });
        return;
      }
      
      const toyId = parseInt(toyIdParam);
      
      if (isNaN(toyId)) {
        res.status(400).json({
          success: false,
          message: '无效的玩具 ID'
        });
        return;
      }

      // 检查验证结果
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: '输入验证失败',
          errors: errors.array()
        });
        return;
      }

      const comment = await CommentService.createComment(toyId, req.body);
      
      res.status(201).json({
        success: true,
        message: '创建评论成功',
        data: comment
      });
    } catch (error) {
      if (error instanceof Error && error.message === '玩具不存在') {
        res.status(404).json({
          success: false,
          message: '玩具不存在'
        });
        return;
      }
      if (error instanceof Error && error.message === '评分必须在1-5之间') {
        res.status(400).json({
          success: false,
          message: '评分必须在1-5之间'
        });
        return;
      }
      next(error);
    }
  }

  /**
   * 更新评论
   * PUT /api/comments/:id
   */
  static async updateComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      if (!idParam) {
        res.status(400).json({
          success: false,
          message: '缺少评论 ID 参数'
        });
        return;
      }
      
      const id = parseInt(idParam);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: '无效的评论 ID'
        });
        return;
      }

      // 检查验证结果
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: '输入验证失败',
          errors: errors.array()
        });
        return;
      }

      const comment = await CommentService.updateComment(id, req.body);
      
      res.status(200).json({
        success: true,
        message: '更新评论成功',
        data: comment
      });
    } catch (error) {
      if (error instanceof Error && error.message === '评论不存在') {
        res.status(404).json({
          success: false,
          message: '评论不存在'
        });
        return;
      }
      if (error instanceof Error && error.message === '评分必须在1-5之间') {
        res.status(400).json({
          success: false,
          message: '评分必须在1-5之间'
        });
        return;
      }
      next(error);
    }
  }

  /**
   * 删除评论
   * DELETE /api/comments/:id
   */
  static async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      if (!idParam) {
        res.status(400).json({
          success: false,
          message: '缺少评论 ID 参数'
        });
        return;
      }
      
      const id = parseInt(idParam);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: '无效的评论 ID'
        });
        return;
      }

      await CommentService.deleteComment(id);
      
      res.status(200).json({
        success: true,
        message: '删除评论成功'
      });
    } catch (error) {
      if (error instanceof Error && error.message === '评论不存在') {
        res.status(404).json({
          success: false,
          message: '评论不存在'
        });
        return;
      }
      next(error);
    }
  }
}
import { Comment, CreateCommentRequest, UpdateCommentRequest } from '../types/comment';
import { MemoryCommentRepository } from '../repositories/memoryCommentRepository';
import { MemoryToyRepository } from '../repositories/memoryToyRepository';

export class CommentService {
  /**
   * 根据玩具 ID 获取评论列表
   */
  static async getCommentsByToyId(toyId: number): Promise<Comment[]> {
    try {
      // 验证玩具是否存在
      const toy = await MemoryToyRepository.findById(toyId);
      if (!toy) {
        throw new Error('玩具不存在');
      }

      return await MemoryCommentRepository.findByToyId(toyId);
    } catch (error) {
      console.error('获取评论列表失败:', error);
      if (error instanceof Error && error.message === '玩具不存在') {
        throw error;
      }
      throw new Error('获取评论列表失败');
    }
  }

  /**
   * 根据 ID 获取评论
   */
  static async getCommentById(id: number): Promise<Comment> {
    try {
      const comment = await MemoryCommentRepository.findById(id);
      if (!comment) {
        throw new Error('评论不存在');
      }
      return comment;
    } catch (error) {
      console.error('获取评论失败:', error);
      if (error instanceof Error && error.message === '评论不存在') {
        throw error;
      }
      throw new Error('获取评论失败');
    }
  }

  /**
   * 创建新评论
   */
  static async createComment(toyId: number, commentData: CreateCommentRequest): Promise<Comment> {
    try {
      // 验证玩具是否存在
      const toy = await MemoryToyRepository.findById(toyId);
      if (!toy) {
        throw new Error('玩具不存在');
      }

      // 验证评分范围
      if (commentData.rating < 1 || commentData.rating > 5) {
        throw new Error('评分必须在1-5之间');
      }

      return await MemoryCommentRepository.create(toyId, commentData);
    } catch (error) {
      console.error('创建评论失败:', error);
      if (error instanceof Error && (error.message === '玩具不存在' || error.message === '评分必须在1-5之间')) {
        throw error;
      }
      throw new Error('创建评论失败');
    }
  }

  /**
   * 更新评论
   */
  static async updateComment(id: number, commentData: UpdateCommentRequest): Promise<Comment> {
    try {
      // 验证评分范围（如果提供了评分）
      if (commentData.rating !== undefined && (commentData.rating < 1 || commentData.rating > 5)) {
        throw new Error('评分必须在1-5之间');
      }

      const comment = await MemoryCommentRepository.update(id, commentData);
      if (!comment) {
        throw new Error('评论不存在');
      }
      return comment;
    } catch (error) {
      console.error('更新评论失败:', error);
      if (error instanceof Error && (error.message === '评论不存在' || error.message === '评分必须在1-5之间')) {
        throw error;
      }
      throw new Error('更新评论失败');
    }
  }

  /**
   * 删除评论
   */
  static async deleteComment(id: number): Promise<void> {
    try {
      const deleted = await MemoryCommentRepository.delete(id);
      if (!deleted) {
        throw new Error('评论不存在');
      }
    } catch (error) {
      console.error('删除评论失败:', error);
      if (error instanceof Error && error.message === '评论不存在') {
        throw error;
      }
      throw new Error('删除评论失败');
    }
  }
}
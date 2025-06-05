import { Comment, CreateCommentRequest, UpdateCommentRequest } from '../types/comment';

// 内存中的评论数据存储
let commentsData: Comment[] = [
  {
    id: 1,
    toyId: 1,
    author: '李小明',
    content: '这款乐高积木盒质量很好，我家孩子非常喜欢，拼装过程很有趣，能够培养孩子的动手能力和想象力。',
    rating: 5,
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: 2,
    toyId: 1,
    author: '王妈妈',
    content: '积木的颜色很鲜艳，质量也不错，就是价格有点贵。',
    rating: 4,
    createdAt: new Date('2024-01-20T15:20:00')
  },
  {
    id: 3,
    toyId: 2,
    author: '张爸爸',
    content: '拼图的图案很漂亮，难度适中，完成后很有成就感。推荐给喜欢拼图的朋友。',
    rating: 5,
    createdAt: new Date('2024-01-18T09:45:00')
  },
  {
    id: 4,
    toyId: 3,
    author: '刘叔叔',
    content: '遥控车的速度很快，操控灵敏，孩子玩得很开心。就是电池续航时间短了一点。',
    rating: 4,
    createdAt: new Date('2024-01-22T14:10:00')
  }
];

let nextId = 5;

export class MemoryCommentRepository {
  /**
   * 根据玩具 ID 获取评论列表
   */
  static async findByToyId(toyId: number): Promise<Comment[]> {
    return commentsData
      .filter(comment => comment.toyId === toyId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // 按时间倒序
  }

  /**
   * 根据 ID 获取评论
   */
  static async findById(id: number): Promise<Comment | null> {
    const comment = commentsData.find(c => c.id === id);
    return comment ? { ...comment } : null;
  }

  /**
   * 创建新评论
   */
  static async create(toyId: number, commentData: CreateCommentRequest): Promise<Comment> {
    const newComment: Comment = {
      id: nextId++,
      toyId,
      author: commentData.author,
      content: commentData.content,
      rating: commentData.rating,
      createdAt: new Date()
    };
    commentsData.push(newComment);
    return { ...newComment };
  }

  /**
   * 更新评论
   */
  static async update(id: number, commentData: UpdateCommentRequest): Promise<Comment | null> {
    const index = commentsData.findIndex(c => c.id === id);
    if (index === -1) {
      return null;
    }
    
    const existingComment = commentsData[index]!;
    const updatedComment: Comment = {
      id: existingComment.id,
      toyId: existingComment.toyId,
      author: commentData.author ?? existingComment.author,
      content: commentData.content ?? existingComment.content,
      rating: commentData.rating ?? existingComment.rating,
      createdAt: existingComment.createdAt
    };
    commentsData[index] = updatedComment;
    return { ...updatedComment };
  }

  /**
   * 删除评论
   */
  static async delete(id: number): Promise<boolean> {
    const index = commentsData.findIndex(c => c.id === id);
    if (index === -1) {
      return false;
    }
    commentsData.splice(index, 1);
    return true;
  }
}
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ToyService } from '../services/memoryToyService';

export class ToyController {
  /**
   * 根据玩具类型ID获取玩具列表
   * GET /api/toys/by-type/:toyTypeId
   */
  static async getToysByTypeId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const toyTypeId = parseInt(req.params.toyTypeId);
      
      if (isNaN(toyTypeId) || toyTypeId < 0) {
        res.status(400).json({
          success: false,
          message: '无效的玩具类型 ID，必须是大于等于0的数字'
        });
        return;
      }

      const toys = await ToyService.getToysByTypeId(toyTypeId);
      
      res.status(200).json({
        success: true,
        message: toyTypeId === 0 ? '获取所有玩具列表成功' : '根据玩具类型获取玩具列表成功',
        data: toys,
        count: toys.length,
        toyTypeId: toyTypeId
      });
    } catch (error) {
      next(error);
    }
  }
  /**
   * 获取所有玩具
   * GET /api/toys
   */
  static async getAllToys(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const toys = await ToyService.getAllToys();
      
      res.status(200).json(toys);
    } catch (error) {
      next(error);
    }
  }

  /**
   * 根据 ID 获取玩具
   * GET /api/toys/:id
   */
  static async getToyById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: '无效的玩具 ID'
        });
        return;
      }

      const toy = await ToyService.getToyById(id);
      
      res.status(200).json({
        success: true,
        message: '获取玩具成功',
        data: toy
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
   * 创建新的玩具
   * POST /api/toys
   */
  static async createToy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
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

      const toy = await ToyService.createToy(req.body);
      
      res.status(201).json({
        success: true,
        message: '创建玩具成功',
        data: toy
      });
    } catch (error) {
      if (error instanceof Error && error.message === '指定的玩具类型不存在') {
        res.status(400).json({
          success: false,
          message: '指定的玩具类型不存在'
        });
        return;
      }
      next(error);
    }
  }

  /**
   * 更新玩具
   * PUT /api/toys/:id
   */
  static async updateToy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
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

      const toy = await ToyService.updateToy(id, req.body);
      
      res.status(200).json({
        success: true,
        message: '更新玩具成功',
        data: toy
      });
    } catch (error) {
      if (error instanceof Error && error.message === '玩具不存在') {
        res.status(404).json({
          success: false,
          message: '玩具不存在'
        });
        return;
      }
      if (error instanceof Error && error.message === '指定的玩具类型不存在') {
        res.status(400).json({
          success: false,
          message: '指定的玩具类型不存在'
        });
        return;
      }
      next(error);
    }
  }

  /**
   * 删除玩具
   * DELETE /api/toys/:id
   */
  static async deleteToy(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: '无效的玩具 ID'
        });
        return;
      }

      await ToyService.deleteToy(id);
      
      res.status(200).json({
        success: true,
        message: '删除玩具成功'
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
}

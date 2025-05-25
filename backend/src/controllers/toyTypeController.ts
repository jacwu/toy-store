import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ToyTypeService } from '../services/memoryToyTypeService';

export class ToyTypeController {  /**
   * 获取所有玩具类型
   * GET /api/toy-types
   */
  static async getAllToyTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const toyTypes = await ToyTypeService.getAllToyTypes();
      
      res.status(200).json(toyTypes);
    } catch (error) {
      next(error);
    }
  }

  /**
   * 根据 ID 获取玩具类型
   * GET /api/toy-types/:id
   */
  static async getToyTypeById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: '无效的玩具类型 ID'
        });
        return;
      }

      const toyType = await ToyTypeService.getToyTypeById(id);
      
      res.status(200).json({
        success: true,
        message: '获取玩具类型成功',
        data: toyType
      });
    } catch (error) {
      if (error instanceof Error && error.message === '玩具类型不存在') {
        res.status(404).json({
          success: false,
          message: '玩具类型不存在'
        });
        return;
      }
      next(error);
    }
  }

  /**
   * 创建新的玩具类型
   * POST /api/toy-types
   */
  static async createToyType(req: Request, res: Response, next: NextFunction): Promise<void> {
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

      const toyType = await ToyTypeService.createToyType(req.body);
      
      res.status(201).json({
        success: true,
        message: '创建玩具类型成功',
        data: toyType
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * 更新玩具类型
   * PUT /api/toy-types/:id
   */
  static async updateToyType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: '无效的玩具类型 ID'
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

      const toyType = await ToyTypeService.updateToyType(id, req.body);
      
      res.status(200).json({
        success: true,
        message: '更新玩具类型成功',
        data: toyType
      });
    } catch (error) {
      if (error instanceof Error && error.message === '玩具类型不存在') {
        res.status(404).json({
          success: false,
          message: '玩具类型不存在'
        });
        return;
      }
      next(error);
    }
  }

  /**
   * 删除玩具类型
   * DELETE /api/toy-types/:id
   */
  static async deleteToyType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: '无效的玩具类型 ID'
        });
        return;
      }

      await ToyTypeService.deleteToyType(id);
      
      res.status(200).json({
        success: true,
        message: '删除玩具类型成功'
      });
    } catch (error) {
      if (error instanceof Error && error.message === '玩具类型不存在') {
        res.status(404).json({
          success: false,
          message: '玩具类型不存在'
        });
        return;
      }
      next(error);
    }
  }
}

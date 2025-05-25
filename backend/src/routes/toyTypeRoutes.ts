import express from 'express';
import { ToyTypeController } from '../controllers/toyTypeController';
import { validateCreateToyType, validateUpdateToyType } from '../validators/toyTypeValidator';

const router = express.Router();

/**
 * @route   GET /api/toy-types
 * @desc    获取所有玩具类型
 * @access  Public
 */
router.get('/', ToyTypeController.getAllToyTypes);

/**
 * @route   GET /api/toy-types/:id
 * @desc    根据 ID 获取玩具类型
 * @access  Public
 */
router.get('/:id', ToyTypeController.getToyTypeById);

/**
 * @route   POST /api/toy-types
 * @desc    创建新的玩具类型
 * @access  Private (管理员)
 */
router.post('/', validateCreateToyType, ToyTypeController.createToyType);

/**
 * @route   PUT /api/toy-types/:id
 * @desc    更新玩具类型
 * @access  Private (管理员)
 */
router.put('/:id', validateUpdateToyType, ToyTypeController.updateToyType);

/**
 * @route   DELETE /api/toy-types/:id
 * @desc    删除玩具类型
 * @access  Private (管理员)
 */
router.delete('/:id', ToyTypeController.deleteToyType);

export default router;

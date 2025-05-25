import express from 'express';
import { ToyController } from '../controllers/toyController';
import { validateCreateToy, validateUpdateToy } from '../validators/toyValidator';

const router = express.Router();

/**
 * @route   GET /api/toys/by-type/:toyTypeId
 * @desc    根据玩具类型ID获取玩具列表 (toyTypeId=0 获取所有玩具)
 * @access  Public
 */
router.get('/by-type/:toyTypeId', ToyController.getToysByTypeId);

/**
 * @route   GET /api/toys
 * @desc    获取所有玩具
 * @access  Public
 */
router.get('/', ToyController.getAllToys);

/**
 * @route   GET /api/toys/:id
 * @desc    根据 ID 获取玩具
 * @access  Public
 */
router.get('/:id', ToyController.getToyById);

/**
 * @route   POST /api/toys
 * @desc    创建新的玩具
 * @access  Private (管理员)
 */
router.post('/', validateCreateToy, ToyController.createToy);

/**
 * @route   PUT /api/toys/:id
 * @desc    更新玩具
 * @access  Private (管理员)
 */
router.put('/:id', validateUpdateToy, ToyController.updateToy);

/**
 * @route   DELETE /api/toys/:id
 * @desc    删除玩具
 * @access  Private (管理员)
 */
router.delete('/:id', ToyController.deleteToy);

export default router;

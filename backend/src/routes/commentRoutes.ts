import express from 'express';
import { CommentController } from '../controllers/commentController';
import { validateCreateComment, validateUpdateComment } from '../validators/commentValidator';

const router = express.Router();

/**
 * @route   GET /api/toys/:toyId/comments
 * @desc    根据玩具 ID 获取评论列表
 * @access  Public
 */
router.get('/toys/:toyId/comments', CommentController.getCommentsByToyId);

/**
 * @route   POST /api/toys/:toyId/comments
 * @desc    为指定玩具创建新评论
 * @access  Public
 */
router.post('/toys/:toyId/comments', validateCreateComment, CommentController.createComment);

/**
 * @route   GET /api/comments/:id
 * @desc    根据 ID 获取评论
 * @access  Public
 */
router.get('/comments/:id', CommentController.getCommentById);

/**
 * @route   PUT /api/comments/:id
 * @desc    更新评论
 * @access  Public
 */
router.put('/comments/:id', validateUpdateComment, CommentController.updateComment);

/**
 * @route   DELETE /api/comments/:id
 * @desc    删除评论
 * @access  Public
 */
router.delete('/comments/:id', CommentController.deleteComment);

export default router;
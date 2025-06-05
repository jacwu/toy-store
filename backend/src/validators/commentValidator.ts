import { body } from 'express-validator';

export const validateCreateComment = [
  body('author')
    .trim()
    .notEmpty()
    .withMessage('评论作者不能为空')
    .isLength({ min: 1, max: 50 })
    .withMessage('评论作者长度必须在 1-50 个字符之间'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('评论内容不能为空')
    .isLength({ min: 1, max: 1000 })
    .withMessage('评论内容长度必须在 1-1000 个字符之间'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('评分必须是1-5之间的整数')
];

export const validateUpdateComment = [
  body('author')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('评论作者不能为空')
    .isLength({ min: 1, max: 50 })
    .withMessage('评论作者长度必须在 1-50 个字符之间'),
  
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('评论内容不能为空')
    .isLength({ min: 1, max: 1000 })
    .withMessage('评论内容长度必须在 1-1000 个字符之间'),
  
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('评分必须是1-5之间的整数')
];
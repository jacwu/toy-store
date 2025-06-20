import { body } from 'express-validator';

export const validateCreateMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('留言标题不能为空')
    .isLength({ min: 2, max: 100 })
    .withMessage('留言标题长度必须在 2-100 个字符之间'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('留言内容不能为空')
    .isLength({ min: 5, max: 1000 })
    .withMessage('留言内容长度必须在 5-1000 个字符之间'),
  
  body('userId')
    .isInt({ min: 0 })
    .withMessage('用户ID必须是有效的数字')
];
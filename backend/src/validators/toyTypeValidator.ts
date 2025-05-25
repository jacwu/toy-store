import { body } from 'express-validator';

export const validateCreateToyType = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('玩具类型名称不能为空')
    .isLength({ min: 2, max: 50 })
    .withMessage('玩具类型名称长度必须在 2-50 个字符之间'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('玩具类型描述不能为空')
    .isLength({ min: 5, max: 200 })
    .withMessage('玩具类型描述长度必须在 5-200 个字符之间'),
  
  body('icon')
    .optional()
    .trim()
    .isLength({ max: 10 })
    .withMessage('图标长度不能超过 10 个字符')
];

export const validateUpdateToyType = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('玩具类型名称不能为空')
    .isLength({ min: 2, max: 50 })
    .withMessage('玩具类型名称长度必须在 2-50 个字符之间'),
  
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('玩具类型描述不能为空')
    .isLength({ min: 5, max: 200 })
    .withMessage('玩具类型描述长度必须在 5-200 个字符之间'),
  
  body('icon')
    .optional()
    .trim()
    .isLength({ max: 10 })
    .withMessage('图标长度不能超过 10 个字符')
];

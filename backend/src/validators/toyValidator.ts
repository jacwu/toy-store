import { body } from 'express-validator';

export const validateCreateToy = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('玩具名称不能为空')
    .isLength({ min: 2, max: 100 })
    .withMessage('玩具名称长度必须在 2-100 个字符之间'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('玩具描述不能为空')
    .isLength({ min: 5, max: 500 })
    .withMessage('玩具描述长度必须在 5-500 个字符之间'),
  
  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('价格必须是大于0的数字'),
  
  body('toyTypeId')
    .isInt({ min: 1 })
    .withMessage('玩具类型ID必须是大于0的整数')
];

export const validateUpdateToy = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('玩具名称不能为空')
    .isLength({ min: 2, max: 100 })
    .withMessage('玩具名称长度必须在 2-100 个字符之间'),
  
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('玩具描述不能为空')
    .isLength({ min: 5, max: 500 })
    .withMessage('玩具描述长度必须在 5-500 个字符之间'),
  
  body('price')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('价格必须是大于0的数字'),
  
  body('toyTypeId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('玩具类型ID必须是大于0的整数')
];

import express from 'express';
import { MessageController } from '../controllers/messageController';
import { validateCreateMessage } from '../validators/messageValidator';

const router = express.Router();

router.get('/', MessageController.getAllMessages);
router.get('/:id', MessageController.getMessageById);
router.post('/', validateCreateMessage, MessageController.createMessage);
router.delete('/:id', MessageController.deleteMessage);

export default router;
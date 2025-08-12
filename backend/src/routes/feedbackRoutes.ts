import express from 'express';
import { FeedbackController } from '../controllers/feedbackController';

const router = express.Router();

router.post('/', FeedbackController.submitFeedback);
router.get('/', FeedbackController.getAllFeedback);

export default router;
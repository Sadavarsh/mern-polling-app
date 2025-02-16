import express from 'express';
import { createPoll, votePoll, getPolls } from '../controller/poll.controller.js';

const router = express.Router();

router.post('/create', createPoll);
router.post('/vote', votePoll);
router.get('/', getPolls);

export default router;

import express from 'express';
import {
    createTicket,
    getUserTickets,
    getTicketById,
    updateTicketStatus,
    getTicketReplies,
    createTicketReply
} from '../controllers/ticketController.js';
import { authenticate } from '../middleware/authenticate.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = express.Router();
const submitLimiter = rateLimit({ windowMs: 60_000, max: 5, scope: 'ticket-submit' });

router.use(authenticate);

router.post('/', submitLimiter, createTicket);
router.get('/', getUserTickets);
router.get('/:id', getTicketById);
router.put('/:id/status', updateTicketStatus);
router.get('/:id/replies', getTicketReplies);
router.post('/:id/replies', submitLimiter, createTicketReply);

export default router;

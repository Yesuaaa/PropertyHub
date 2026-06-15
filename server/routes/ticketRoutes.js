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

const router = express.Router();

router.use(authenticate);

router.post('/', createTicket);
router.get('/', getUserTickets);
router.get('/:id', getTicketById);
router.put('/:id/status', updateTicketStatus);
router.get('/:id/replies', getTicketReplies);
router.post('/:id/replies', createTicketReply);

export default router;
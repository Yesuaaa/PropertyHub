import express from 'express';
import {
    createTicket,
    getUserTickets,
    getTicketById,
    updateTicketStatus
} from '../controllers/ticketController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// All ticket routes require authentication
router.use(authenticate);

router.post('/', createTicket);
router.get('/', getUserTickets);
router.get('/:id', getTicketById);
router.put('/:id/status', updateTicketStatus);   // matches controller's PUT

export default router;
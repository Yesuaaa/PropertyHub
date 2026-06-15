import express from 'express';
import { getStats, getAllUsers, getAllTickets, updateTicketStatus } from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/authenticate.js';

const router = express.Router();

// All admin routes require authentication + admin role
router.use(authenticate);
router.use(authorize('admin', 'superadmin'));

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/tickets', getAllTickets);
router.put('/tickets/:id/status', updateTicketStatus);

export default router;
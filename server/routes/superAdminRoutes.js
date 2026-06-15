import express from 'express';
import {
    getAllUsers,
    createUser,
    deleteUser,
    toggleUserActive,
    updateUserRole
} from '../controllers/superAdminController.js';
import { getAllTickets, updateTicketStatus } from '../controllers/adminController.js';
import { deleteTicket } from '../controllers/ticketController.js';
import { authenticate, authorize } from '../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize('superadmin'));

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/active', toggleUserActive);
router.patch('/users/:id/role', updateUserRole);

router.get('/tickets', getAllTickets);
router.put('/tickets/:id/status', updateTicketStatus);
router.delete('/tickets/:id', deleteTicket);

export default router;

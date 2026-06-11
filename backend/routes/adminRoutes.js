const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { getAllTickets, updateTicketStatus } = require('../controllers/adminController');

router.get('/tickets', auth, admin, getAllTickets);
router.put('/tickets/:id/status', auth, admin, updateTicketStatus);

module.exports = router;

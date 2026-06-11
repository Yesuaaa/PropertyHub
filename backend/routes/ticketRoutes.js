const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTicket, getUserTickets, getTicketById } = require('../controllers/ticketController');

router.post('/', auth, createTicket);
router.get('/', auth, getUserTickets);
router.get('/:id', auth, getTicketById);

module.exports = router;

const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  try {
    const { type, category, description, priority } = req.body;
    const ticket = await Ticket.create({
      user_id: req.user.id,
      type,
      category,
      description,
      priority,
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findByUser(req.user.id);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    if (ticket.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

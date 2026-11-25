const express = require('express')

const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

const {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController')

const router = express.Router()

// Public Routes
router.get('/', getAllEvents)
router.get('/:id', getSingleEvent)

// Admin Protected Routes
router.post('/', protect, admin, createEvent)
router.put('/:id', protect, admin, updateEvent)
router.delete('/:id', protect, admin, deleteEvent)

module.exports = router
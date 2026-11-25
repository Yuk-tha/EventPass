const express = require('express')

const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getMyTickets,
  confirmDemoPayment,
  verifyTicket,
} = require('../controllers/bookingController')

const router = express.Router()

// Create Booking
router.post('/', protect, createBooking)

// Get My Bookings
router.get('/my-bookings', protect, getMyBookings)

// Get My Tickets
router.get('/my-tickets', protect, getMyTickets)

// Confirm Demo Payment
router.post('/:id/confirm-payment', protect, confirmDemoPayment)

// Cancel Booking
router.put('/:id/cancel', protect, cancelBooking)

// Verify QR Ticket (Admin Only)
router.post('/verify', protect, admin, verifyTicket)

module.exports = router
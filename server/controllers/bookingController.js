
const Booking = require('../models/Booking')
const Event = require('../models/Event')
const crypto = require('crypto')

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { eventId, quantity, paymentMethod } = req.body

    if (!eventId || !quantity || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all booking details',
      })
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return res.status(400).json({
        success: false,
        message: 'Ticket quantity must be between 1 and 10',
      })
    }

    const allowedMethods = ['upi', 'card', 'netbanking']

    if (!allowedMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method',
      })
    }

    // Atomically reserve available seats
    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        status: 'upcoming',
        availableSeats: { $gte: quantity },
      },
      {
        $inc: {
          availableSeats: -quantity,
        },
      },
      {
        new: true,
      },
    )

    if (!event) {
      const existingEvent = await Event.findById(eventId)

      if (!existingEvent) {
        return res.status(404).json({
          success: false,
          message: 'Event not found',
        })
      }

      if (existingEvent.status !== 'upcoming') {
        return res.status(400).json({
          success: false,
          message: 'This event is not available for booking',
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Not enough seats available',
      })
    }

    const totalAmount = event.price * quantity

    try {
      const booking = await Booking.create({
        bookingId: `EP-${crypto.randomUUID()}`,
        user: req.user._id,
        event: event._id,
        quantity,
        totalAmount,
        bookingStatus: 'confirmed',
        paymentStatus: 'pending',
        paymentMethod,
        ticketStatus: 'active',
      })

      return res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        booking,
      })
    } catch (error) {
      // Restore seats if booking creation fails
      await Event.findByIdAndUpdate(event._id, {
        $inc: {
          availableSeats: quantity,
        },
      })

      throw error
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
    })
  }
}

// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate('event')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
    })
  }
}

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const existingBooking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
      bookingStatus: 'confirmed',
      ticketStatus: 'active',
    })

    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found, already cancelled, or ticket already used',
      })
    }

    const newPaymentStatus =
      existingBooking.paymentStatus === 'completed'
        ? 'refunded'
        : existingBooking.paymentStatus

    const booking = await Booking.findOneAndUpdate(
      {
        _id: existingBooking._id,
        user: req.user._id,
        bookingStatus: 'confirmed',
        ticketStatus: 'active',
        paymentStatus: existingBooking.paymentStatus,
      },
      {
        $set: {
          bookingStatus: 'cancelled',
          paymentStatus: newPaymentStatus,
        },
      },
      {
        new: true,
      },
    )

    if (!booking) {
      return res.status(409).json({
        success: false,
        message: 'Booking status changed. Please try again.',
      })
    }

    await Event.findByIdAndUpdate(
      booking.event,
      {
        $inc: {
          availableSeats: booking.quantity,
        },
      },
    )

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
    })
  }
}

// Get My Tickets
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Booking.find({
      user: req.user._id,
      bookingStatus: 'confirmed',
    })
      .populate('event')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tickets',
    })
  }
}

// Demo Payment Confirmation
const confirmDemoPayment = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
        bookingStatus: 'confirmed',
        paymentStatus: 'pending',
      },
      {
        $set: {
          paymentStatus: 'completed',
          paymentReference: `DEMO-${crypto.randomUUID()}`,
        },
      },
      {
        new: true,
      },
    )

    if (!booking) {
      const existingBooking = await Booking.findOne({
        _id: req.params.id,
        user: req.user._id,
      })

      if (!existingBooking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found',
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Payment cannot be completed. Check booking or payment status.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Demo payment completed successfully',
      booking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Demo payment confirmation failed',
    })
  }
}

// Verify QR Ticket
const verifyTicket = async (req, res) => {
  try {
    const { bookingId } = req.body

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required',
      })
    }

    const booking = await Booking.findOne({ bookingId })
      .populate('event')
      .populate('user', 'name email')

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Invalid ticket. Booking not found.',
      })
    }

    if (booking.bookingStatus !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Ticket is cancelled.',
      })
    }

    if (booking.paymentStatus !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Payment is not completed.',
      })
    }

    if (booking.ticketStatus === 'used') {
      return res.status(409).json({
        success: false,
        message: 'Ticket has already been used.',
        scannedAt: booking.scannedAt,
      })
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      {
        _id: booking._id,
        bookingStatus: 'confirmed',
        paymentStatus: 'completed',
        ticketStatus: 'active',
      },
      {
        $set: {
          ticketStatus: 'used',
          scannedAt: new Date(),
        },
      },
      {
        new: true,
      },
    )
      .populate('event')
      .populate('user', 'name email')

    if (!updatedBooking) {
      return res.status(409).json({
        success: false,
        message: 'Ticket was already verified.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Ticket verified successfully.',
      booking: updatedBooking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ticket verification failed.',
    })
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getMyTickets,
  confirmDemoPayment,
  verifyTicket,
}

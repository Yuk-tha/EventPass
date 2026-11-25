const Event = require('../models/Event')

// Create New Event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      venue,
      location,
      image,
      price,
      totalSeats,
    } = req.body

    if (
      !title ||
      !description ||
      !category ||
      !date ||
      !time ||
      !venue ||
      !location ||
      price === undefined ||
      totalSeats === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required event details',
      })
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      venue,
      location,
      image,
      price,
      totalSeats,
      availableSeats: totalSeats,
      createdBy: req.user._id,
    })

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message,
    })
  }
}

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
    })
  }
}

// Get Single Event
const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    res.status(200).json({
      success: true,
      event,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
    })
  }
}

// Update Event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update event',
    })
  }
}

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    await Event.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
    })
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
}
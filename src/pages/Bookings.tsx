
import {
  CalendarDays,
  MapPin,
  Ticket,
  Trash2,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react'

import type { Booking } from '../types'

type BookingsProps = {
  bookings: Booking[]
  onCancel: (id: string) => void
  onExplore: () => void
}

function Bookings({ bookings, onCancel, onExplore }: BookingsProps) {
  return (
    <main className="bookings-page">
      <section className="bookings-header">
        <span className="section-label">YOUR EXPERIENCES</span>
        <h1>My Bookings</h1>
        <p>Manage your event reservations and booking details.</p>
      </section>

      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <article className="booking-card" key={booking.id}>
              <div className="booking-card-icon">
                <Ticket size={28} />
              </div>

              <div className="booking-card-content">
                <div className="booking-card-title">
                  <h3>{booking.event}</h3>
                  <span className="booking-status">Confirmed</span>
                </div>

                <div className="booking-card-details">
                  <span>
                    <CalendarDays size={15} />
                    {booking.eventDate}
                  </span>

                  <span>
                    <MapPin size={15} />
                    {booking.location || 'Location unavailable'}
                  </span>

                  <span>
                    <Ticket size={15} />
                    {booking.tickets} ticket(s)
                  </span>
                </div>

                <div className="booking-card-footer">
                  <div>
                    <small>Booking date</small>
                    <p>{booking.bookedAt}</p>
                  </div>

                  <div>
                    <small>Total amount</small>
                    <strong>
                      ₹{booking.total.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              </div>

              <button
                className="cancel-booking-btn"
                onClick={() => onCancel(booking.id)}
              >
                <Trash2 size={16} />
                Cancel
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-bookings">
          <div className="empty-bookings-icon">
            <CalendarCheck size={42} />
          </div>

          <h2>No bookings yet</h2>

          <p>
            Your booked events will appear here.
            Start exploring and find your next experience.
          </p>

          <button onClick={onExplore}>
            Explore Events <ArrowRight size={17} />
          </button>
        </div>
      )}
    </main>
  )
}

export default Bookings

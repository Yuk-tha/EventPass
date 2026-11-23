
import { QRCodeSVG } from 'qrcode.react'
import {
  Ticket,
  CalendarDays,
  MapPin,
  UserRound,
  ArrowRight,
} from 'lucide-react'

import type { Booking } from '../types'
import './Tickets.css'

type TicketsProps = {
  bookings: Booking[]
  onExplore: () => void
}

function Tickets({ bookings, onExplore }: TicketsProps) {
  return (
    <main className="digital-tickets-page">
      <section className="tickets-header">
        <span className="section-label">YOUR EVENT PASSES</span>
        <h1>My Tickets</h1>
        <p>Your digital tickets are ready. Show the QR code at the event entrance.</p>
      </section>

      {bookings.length > 0 ? (
        <div className="digital-tickets-grid">
          {bookings.map((booking) => (
            <article className="digital-ticket-card" key={booking.id}>
              <div className="digital-ticket-top">
                <div className="digital-ticket-brand">
                  <Ticket size={19} />
                  <span>EVENTPASS</span>
                </div>

                <span className="ticket-confirmed">Confirmed</span>
              </div>

              <div className="digital-ticket-body">
                <div className="digital-ticket-details">
                  <span className="section-label">EVENT TICKET</span>
                  <h2>{booking.event}</h2>

                  <p>
                    <CalendarDays size={16} />
                    {booking.eventDate}
                  </p>

                  <p>
                    <MapPin size={16} />
                    {booking.location || 'Location unavailable'}
                  </p>

                  <p>
                    <UserRound size={16} />
                    {booking.name}
                  </p>
                </div>

                <div className="digital-ticket-qr">
                  <QRCodeSVG
                    value={JSON.stringify({
  bookingId: booking.id,
  event: booking.event,
  attendee: booking.name,
  email: booking.email,
})}
                    size={150}
                    level="H"
                    includeMargin
                  />
                  <span>SCAN AT ENTRY</span>
                </div>
              </div>

              <div className="digital-ticket-divider">
                <span />
                <span />
              </div>

              <div className="digital-ticket-footer">
                <div>
                  <small>Booking ID</small>
                  <strong>{booking.id}</strong>
                </div>

                <div>
                  <small>Tickets</small>
                  <strong>{booking.tickets}</strong>
                </div>

                <div>
                  <small>Total Paid</small>
                  <strong>
                    ₹{booking.total.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-tickets">
          <Ticket size={45} />
          <h2>No tickets available</h2>
          <p>Once you book an event, your digital tickets will appear here.</p>

          <button onClick={onExplore}>
            Explore Events <ArrowRight size={17} />
          </button>
        </div>
      )}
    </main>
  )
}

export default Tickets

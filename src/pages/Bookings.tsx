
import { useMemo, useState } from 'react'

import {
  CalendarDays,
  MapPin,
  Ticket,
  Trash2,
  CalendarCheck,
  ArrowRight,
  Search,
} from 'lucide-react'

import type { Booking } from '../types'

type BookingsProps = {
  bookings: Booking[]
  usedTicketIds: string[]
  onCancel: (id: string) => void
  onExplore: () => void
}

type BookingFilter = 'all' | 'confirmed' | 'used'

function Bookings({
  bookings,
  usedTicketIds,
  onCancel,
  onExplore,
}: BookingsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<BookingFilter>('all')

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const isUsed = usedTicketIds.includes(booking.id)

      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'used' && isUsed) ||
        (activeFilter === 'confirmed' && !isUsed)

      const search = searchTerm.trim().toLowerCase()

      const matchesSearch =
        booking.event.toLowerCase().includes(search) ||
        booking.id.toLowerCase().includes(search)

      return matchesFilter && matchesSearch
    })
  }, [bookings, usedTicketIds, activeFilter, searchTerm])

  return (
    <main className="bookings-page">
      <section className="bookings-header">
        <span className="section-label">YOUR EXPERIENCES</span>
        <h1>My Bookings</h1>
        <p>Manage your event reservations and booking details.</p>
      </section>

      {bookings.length > 0 ? (
        <>
          <section className="bookings-toolbar">
            <div className="bookings-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by event name or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="booking-filters">
              {(['all', 'confirmed', 'used'] as BookingFilter[]).map(
                (filter) => (
                  <button
                    key={filter}
                    className={
                      activeFilter === filter ? 'active' : ''
                    }
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                )
              )}
            </div>
          </section>

          {filteredBookings.length > 0 ? (
            <div className="bookings-list">
              {filteredBookings.map((booking) => {
                const isUsed = usedTicketIds.includes(booking.id)

                return (
                  <article className="booking-card" key={booking.id}>
                    <div className="booking-card-icon">
                      <Ticket size={28} />
                    </div>

                    <div className="booking-card-content">
                      <div className="booking-card-title">
                        <h3>{booking.event}</h3>

                        <span
                          className={`booking-status ${
                            isUsed ? 'used' : 'confirmed'
                          }`}
                        >
                          {isUsed ? 'Used' : 'Confirmed'}
                        </span>
                      </div>

                      <div className="booking-id">
                        Booking ID: <strong>{booking.id}</strong>
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
                )
              })}
            </div>
          ) : (
            <div className="empty-bookings">
              <div className="empty-bookings-icon">
                <Search size={38} />
              </div>

              <h2>No matching bookings</h2>
              <p>
                Try another search term or change the booking filter.
              </p>

              <button
                onClick={() => {
                  setSearchTerm('')
                  setActiveFilter('all')
                }}
              >
                Clear Search <ArrowRight size={17} />
              </button>
            </div>
          )}
        </>
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

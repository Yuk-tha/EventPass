
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from 'lucide-react'

import type { EventItem } from '../data/events'

type EventCardProps = {
  event: EventItem
  onView: () => void
  onBook: () => void
}

function EventCard({ event, onView, onBook }: EventCardProps) {
  return (
    <article className="event-card">
      <div
        className="event-poster"
        onClick={onView}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onView()
          }
        }}
      >
        <img
          src={`https://images.unsplash.com/${event.image}?w=700&auto=format&fit=crop`}
          alt={event.title}
        />

        <span className={`event-category ${event.color}`}>
          {event.category}
        </span>

        <button
          className="event-arrow"
          aria-label={`View ${event.title}`}
          onClick={(e) => {
            e.stopPropagation()
            onView()
          }}
        >
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="event-info">
        <span className="event-date">
          <CalendarDays size={14} /> {event.date}
        </span>

        <h3 onClick={onView}>{event.title}</h3>

        <div className="event-location">
          <MapPin size={14} /> {event.location}
        </div>

        <div className="event-card-bottom">
          <div>
            <span>Starting from</span>
            <strong>₹{event.price.toLocaleString('en-IN')}</strong>
          </div>

          <button className="book-btn" onClick={onBook}>
            Book now <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default EventCard

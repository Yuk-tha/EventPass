
import {
  Search,
  ArrowRight,
  Mail,
  MapPin,
  Ticket,
} from 'lucide-react'

import EventCard from '../components/EventCard'
import type { EventItem } from '../data/events'

type Category = {
  name: string
  emoji: string
  description: string
}

type HomeProps = {
  events: EventItem[]
  categories: Category[]
  searchTerm: string
  activeFilter: string
  onSearchChange: (value: string) => void
  onFilterChange: (value: string) => void
  onSelectCategory: (category: string) => void
  onViewEvent: (event: EventItem) => void
  onBookEvent: (event: EventItem) => void
}

function Home({
  events,
  categories,
  searchTerm,
  activeFilter,
  onSearchChange,
  onFilterChange,
  onSelectCategory,
  onViewEvent,
  onBookEvent,
}: HomeProps) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      activeFilter === 'All events' ||
      event.category === activeFilter

    const matchesSearch =
      event.title.toLowerCase().includes(normalizedSearch) ||
      event.location.toLowerCase().includes(normalizedSearch) ||
      event.category.toLowerCase().includes(normalizedSearch)

    return matchesCategory && matchesSearch
  })

  const suggestions = normalizedSearch
    ? events
        .filter(
          (event) =>
            event.title.toLowerCase().includes(normalizedSearch) ||
            event.location.toLowerCase().includes(normalizedSearch) ||
            event.category.toLowerCase().includes(normalizedSearch),
        )
        .slice(0, 5)
    : []

  const selectSuggestion = (event: EventItem) => {
    onSearchChange(event.title)
    onFilterChange('All events')

    document.getElementById('events')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            YOUR NEXT EXPERIENCE STARTS HERE
          </span>

          <h1>
            Discover events.
            <br />
            <span>Make memories.</span>
          </h1>

          <p>
            Find experiences, connect with people and book
            tickets for events worth remembering.
          </p>

          <div className="hero-search-wrapper">
            <div className="hero-search">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search events or locations..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            {normalizedSearch && (
              <div className="search-dropdown">
                {suggestions.length > 0 ? (
                  suggestions.map((event) => (
                    <button
                      type="button"
                      className="search-suggestion"
                      key={event.id}
                      onClick={() => selectSuggestion(event)}
                    >
                      <div>
                        <strong>{event.title}</strong>
                        <span>
                          {event.category} · {event.location}
                        </span>
                      </div>

                      <ArrowRight size={18} />
                    </button>
                  ))
                ) : (
                  <div className="search-no-result">
                    No matching events found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="hero-image">
          <img src="/banner.png" alt="Live event experience" />
        </div>
      </section>

      <section className="categories-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>Browse by category</h2>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              className="category-card"
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
            >
              <span className="category-emoji">
                {category.emoji}
              </span>

              <h3>{category.name}</h3>

              <p className="category-description">
                {category.description}
              </p>

              <ArrowRight size={18} />
            </button>
          ))}
        </div>
      </section>

      <section className="events-section" id="events">
        <div className="section-heading">
          <div>
            <span className="section-label">
              FIND YOUR EXPERIENCE
            </span>
            <h2>Upcoming events</h2>
          </div>
        </div>

        <div className="event-filters">
          {[
            'All events',
            'Music',
            'Workshops',
            'Nightlife',
            'Arts & Culture',
            'Technology',
            'Sports',
          ].map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? 'filter-btn active'
                  : 'filter-btn'
              }
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="event-grid" id="event-carousel">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onView={() => onViewEvent(event)}
                onBook={() => onBookEvent(event)}
              />
            ))
          ) : (
            <div className="no-events">
              <h3>No events found</h3>
              <p>
                Try another search or select a different category.
              </p>

              <button
                onClick={() => {
                  onSearchChange('')
                  onFilterChange('All events')
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <Ticket size={25} />
              <span>
                EVENT<span>PASS</span>
              </span>
            </div>

            <p>
              Discover amazing experiences, explore exciting events
              and create unforgettable memories with EventPass.
            </p>

            <div className="footer-socials">
              <a
                href="mailto:support@eventpass.com"
                aria-label="Email"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="#events">Explore Events</a>
            <a href="#events">Upcoming Events</a>
            <a href="#events">Browse Categories</a>
          </div>

          <div className="footer-links">
            <h3>Categories</h3>
            <a href="#events">Music</a>
            <a href="#events">Workshops</a>
            <a href="#events">Technology</a>
            <a href="#events">Sports</a>
          </div>

          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <p>
              <Mail size={17} />
              support@eventpass.com
            </p>
            <p>
              <MapPin size={17} />
              India
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} EventPass. All rights reserved.
          </p>
          <span>Made for memorable experiences.</span>
        </div>
      </footer>
    </main>
  )
}

export default Home

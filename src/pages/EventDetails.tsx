import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

import type { EventItem } from '../data/events'

import './EventDetails.css'

type EventDetailsProps = {
  event: EventItem
  onBack: () => void
  onBook: () => void
}

const eventExtraDetails: Record<
  number,
  {
    time: string
    venue: string
    address: string
    about: string
    activities: string[]
    schedule: { time: string; activity: string }[]
    performers: string[]
    rules: string[]
  }
> = {
  1: {
    time: '6:00 PM – 10:00 PM',
    venue: 'Grand Music Arena',
    address: 'Chennai, Tamil Nadu, India',
    about: 'Beyond The Sound is a live music experience featuring energetic performances, amazing sound and an unforgettable atmosphere.',
    activities: ['Live music performances', 'DJ sessions', 'Audience interaction', 'Food and refreshment stalls'],
    schedule: [
      { time: '5:00 PM', activity: 'Entry and registration' },
      { time: '6:00 PM', activity: 'Opening performance' },
      { time: '7:30 PM', activity: 'Main music performance' },
      { time: '9:30 PM', activity: 'Closing DJ session' },
    ],
    performers: ['Main Artist', 'Live Music Band', 'Special DJ'],
    rules: [
      'Carry a valid ticket for entry.',
      'Follow the event staff instructions.',
      'Outside food and beverages are not permitted.',
      'Tickets are subject to availability.',
    ],
  },

  2: {
    time: '10:00 AM – 4:00 PM',
    venue: 'Creative Studio Hall',
    address: 'Coimbatore, Tamil Nadu, India',
    about: 'Creative Minds is a learning and creativity workshop designed to encourage new ideas, practical learning and collaboration.',
    activities: ['Hands-on learning sessions', 'Creative group activities', 'Expert discussions', 'Networking opportunities'],
    schedule: [
      { time: '9:30 AM', activity: 'Registration' },
      { time: '10:00 AM', activity: 'Welcome session' },
      { time: '11:30 AM', activity: 'Practical workshop' },
      { time: '2:00 PM', activity: 'Group activities' },
    ],
    performers: ['Workshop Mentor', 'Guest Speaker'],
    rules: [
      'Bring your registration confirmation.',
      'Arrive before the session begins.',
      'Respect other participants.',
      'Follow workshop instructions.',
    ],
  },

  3: {
    time: '7:00 PM – 12:00 AM',
    venue: 'Neon Event Lounge',
    address: 'Bangalore, Karnataka, India',
    about: 'Neon Nights is a themed nightlife experience with music, lighting and entertainment.',
    activities: ['Live DJ performances', 'Dance floor', 'Theme-based lighting', 'Entertainment sessions'],
    schedule: [
      { time: '6:30 PM', activity: 'Guest entry' },
      { time: '7:00 PM', activity: 'Opening DJ session' },
      { time: '9:00 PM', activity: 'Main DJ performance' },
      { time: '11:00 PM', activity: 'Final music session' },
    ],
    performers: ['Resident DJ', 'Guest DJ'],
    rules: [
      'Valid event ticket is required.',
      'Follow venue entry requirements.',
      'Respect venue staff and other guests.',
      'Follow all safety guidelines.',
    ],
  },

  4: {
    time: '11:00 AM – 5:00 PM',
    venue: 'Art and Culture Centre',
    address: 'Chennai, Tamil Nadu, India',
    about: 'Canvas & Culture brings together art, creativity and cultural expression through interactive experiences.',
    activities: ['Art exhibitions', 'Creative demonstrations', 'Cultural performances', 'Interactive art sessions'],
    schedule: [
      { time: '10:30 AM', activity: 'Visitor registration' },
      { time: '11:00 AM', activity: 'Art exhibition opening' },
      { time: '1:00 PM', activity: 'Creative demonstrations' },
      { time: '3:00 PM', activity: 'Cultural performances' },
    ],
    performers: ['Local Artists', 'Cultural Performers'],
    rules: [
      'Keep the exhibition space clean.',
      'Follow photography instructions.',
      'Do not touch restricted artworks.',
      'Respect other visitors.',
    ],
  },

  5: {
    time: '9:00 AM – 5:00 PM',
    venue: 'Innovation Convention Centre',
    address: 'Coimbatore, Tamil Nadu, India',
    about: 'FutureTech Summit is a technology-focused event exploring innovation, digital transformation and emerging technologies.',
    activities: ['Technology presentations', 'Expert talks', 'Innovation discussions', 'Networking sessions'],
    schedule: [
      { time: '8:30 AM', activity: 'Registration' },
      { time: '9:30 AM', activity: 'Opening keynote' },
      { time: '11:30 AM', activity: 'Technology sessions' },
      { time: '2:30 PM', activity: 'Innovation discussions' },
    ],
    performers: ['Technology Speakers', 'Industry Experts'],
    rules: [
      'Carry your event pass.',
      'Maintain silence during presentations.',
      'Follow venue instructions.',
      'Respect all participants.',
    ],
  },

  6: {
    time: '8:00 AM – 6:00 PM',
    venue: 'City Sports Ground',
    address: 'Bangalore, Karnataka, India',
    about: 'City Sports Fest brings together sports enthusiasts for an exciting day of games, activities and friendly competition.',
    activities: ['Team sports', 'Individual competitions', 'Fun games', 'Award ceremony'],
    schedule: [
      { time: '7:30 AM', activity: 'Participant registration' },
      { time: '8:30 AM', activity: 'Opening ceremony' },
      { time: '10:00 AM', activity: 'Sports competitions' },
      { time: '4:30 PM', activity: 'Award ceremony' },
    ],
    performers: ['Sports Hosts', 'Guest Participants'],
    rules: [
      'Follow the sports ground safety rules.',
      'Wear appropriate sports clothing.',
      'Respect players and officials.',
      'Follow organizer instructions.',
    ],
  },
}

function EventDetails({ event, onBack, onBook }: EventDetailsProps) {
  const details = eventExtraDetails[event.id] || eventExtraDetails[1]

  return (
    <main className="event-details-page">
      <div className="details-topbar">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          Back to events
        </button>
      </div>

      <section className="details-hero">
        <img
          src="/banner.png"
          alt={event.title}
        />

        <div className="details-hero-overlay">
          <span className={`event-category ${event.color}`}>
            {event.category}
          </span>

          <h1>{event.title}</h1>

          <p>
            <CalendarDays size={17} />
            {event.date}
          </p>

          <p>
            <MapPin size={17} />
            {event.location}
          </p>
        </div>
      </section>

      <div className="details-layout">
        <div className="details-main">
          <section className="details-section">
            <span className="section-label">ABOUT THE EVENT</span>
            <h2>About this experience</h2>
            <p>{details.about}</p>
          </section>

          <section className="details-section">
            <span className="section-label">WHAT TO EXPECT</span>
            <h2>Event activities</h2>
            <div className="details-activity-grid">
              {details.activities.map((activity) => (
                <div className="details-activity" key={activity}>
                  <CheckCircle2 size={18} />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="details-section">
            <span className="section-label">EVENT PLAN</span>
            <h2>Schedule</h2>
            <div className="details-schedule">
              {details.schedule.map((item) => (
                <div className="schedule-item" key={item.time}>
                  <span>{item.time}</span>
                  <div>
                    <h4>{item.activity}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="details-section">
            <span className="section-label">SPECIAL GUESTS</span>
            <h2>Artists & Performers</h2>
            <div className="details-performers">
              {details.performers.map((performer) => (
                <div className="performer-card" key={performer}>
                  <Users size={22} />
                  <h4>{performer}</h4>
                </div>
              ))}
            </div>
          </section>

          <section className="details-section">
            <span className="section-label">PLEASE NOTE</span>
            <h2>Rules & Guidelines</h2>
            <div className="details-rules">
              {details.rules.map((rule) => (
                <p key={rule}>
                  <ShieldCheck size={17} />
                  {rule}
                </p>
              ))}
            </div>
          </section>
        </div>

        <aside className="details-sidebar">
          <div className="details-ticket-card">
            <span className="section-label">EVENT INFORMATION</span>

            <div className="details-info-row">
              <CalendarDays size={20} />
              <div>
                <span>Date</span>
                <strong>{event.date}</strong>
              </div>
            </div>

            <div className="details-info-row">
              <Clock3 size={20} />
              <div>
                <span>Time</span>
                <strong>{details.time}</strong>
              </div>
            </div>

            <div className="details-info-row">
              <MapPin size={20} />
              <div>
                <span>Venue</span>
                <strong>{details.venue}</strong>
                <small>{details.address}</small>
              </div>
            </div>

            <div className="details-info-row">
              <Ticket size={20} />
              <div>
                <span>Starting from</span>
                <strong>₹{event.price.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <button className="details-book-btn" onClick={onBook}>
              Book Now <ArrowRight size={18} />
            </button>

            <p className="details-demo-note">
              Sample event information for this demo website.
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default EventDetails
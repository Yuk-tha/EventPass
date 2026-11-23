import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import './CategoryPage.css'

type CategoryPageProps = {
  category: string
  onBack: () => void
}

function CategoryPage({ category, onBack }: CategoryPageProps) {
  const isMusic = category === 'Music'

  return (
    <main className="category-page">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <section className="category-detail-hero">
        <div className="category-detail-content">
          <span className="section-label">{category.toUpperCase()} EVENT</span>
          <span className="category-detail-tag">{category}</span>

          <h1>{isMusic ? 'Beyond The Sound' : category}</h1>

          <p>
            {isMusic
              ? 'A live music experience featuring energetic performances, amazing sound and an unforgettable atmosphere.'
              : `Explore exciting ${category} experiences and discover something memorable.`}
          </p>

          <div className="category-detail-meta">
            <span><CalendarDays size={17} /> DEC 18, 2026</span>
            <span><MapPin size={17} /> Chennai, India</span>
          </div>
        </div>

        <div className="category-detail-image">
          <img src="/banner.png" alt="Beyond The Sound event" />
        </div>
      </section>

      {isMusic && (
        <div className="category-detail-sections">
          <section>
            <span className="section-label">ABOUT THE EVENT</span>
            <h2>About this experience</h2>
            <p>
              Beyond The Sound is a live music experience featuring energetic
              performances, amazing sound and an unforgettable atmosphere.
            </p>
          </section>

          <section>
            <span className="section-label">WHAT TO EXPECT</span>
            <h2>Event activities</h2>
            <ul>
              <li>Live music performances</li>
              <li>DJ sessions</li>
              <li>Audience interaction</li>
              <li>Food and refreshment stalls</li>
            </ul>
          </section>

          <section>
            <span className="section-label">EVENT PLAN</span>
            <h2>Schedule</h2>
            <div className="category-schedule">
              <p><strong>5:00 PM</strong> Entry and registration</p>
              <p><strong>6:00 PM</strong> Opening performance</p>
              <p><strong>7:30 PM</strong> Main music performance</p>
              <p><strong>9:30 PM</strong> Closing DJ session</p>
            </div>
          </section>

          <section>
            <span className="section-label">SPECIAL GUESTS</span>
            <h2>Artists & Performers</h2>
            <ul>
              <li>Main Artist</li>
              <li>Live Music Band</li>
              <li>Special DJ</li>
            </ul>
          </section>

          <section>
            <span className="section-label">PLEASE NOTE</span>
            <h2>Rules & Guidelines</h2>
            <ul>
              <li>Carry a valid ticket for entry.</li>
              <li>Follow the event staff instructions.</li>
              <li>Outside food and beverages are not permitted.</li>
              <li>Tickets are subject to availability.</li>
            </ul>
          </section>
        </div>
      )}
    </main>
  )
}

export default CategoryPage

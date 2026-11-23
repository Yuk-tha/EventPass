
import { useState } from 'react'
import {
  UserRound,
  Mail,
  Pencil,
  Save,
  X,
  CalendarCheck,
  Ticket,
} from 'lucide-react'

import type { Profile as ProfileType, Booking } from '../types'
import './Profile.css'

type ProfileProps = {
  profile: ProfileType
  bookings: Booking[]
  onSave: (profile: ProfileType) => void
}

function Profile({ profile, bookings, onSave }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)

  const totalTickets = bookings.reduce(
    (total, booking) => total + booking.tickets,
    0
  )

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      return
    }

    onSave({
      name: name.trim(),
      email: email.trim(),
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    setName(profile.name)
    setEmail(profile.email)
    setIsEditing(false)
  }

  return (
    <main className="profile-page">
      <section className="profile-header">
        <span className="section-label">YOUR ACCOUNT</span>
        <h1>My Profile</h1>
        <p>Manage your personal information and account details.</p>
      </section>

      <div className="profile-layout">
        <section className="profile-card">
          <div className="profile-cover">
            <div className="profile-avatar">
              <UserRound size={45} />
            </div>
          </div>

          <div className="profile-card-content">
            {!isEditing ? (
              <>
                <div className="profile-name-row">
                  <div>
                    <h2>{profile.name || 'EventPass User'}</h2>
                    <p>EventPass Member</p>
                  </div>

                  <button
                    className="profile-edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil size={16} />
                    Edit Profile
                  </button>
                </div>

                <div className="profile-information">
                  <div>
                    <Mail size={19} />
                    <div>
                      <span>Email Address</span>
                      <strong>{profile.email || 'Not provided'}</strong>
                    </div>
                  </div>

                  <div>
                    <UserRound size={19} />
                    <div>
                      <span>Full Name</span>
                      <strong>{profile.name || 'Not provided'}</strong>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="profile-edit-form">
                <h2>Edit Your Profile</h2>

                <label htmlFor="profile-name">Full Name</label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />

                <label htmlFor="profile-email">Email Address</label>
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />

                <div className="profile-form-actions">
                  <button
                    className="profile-save-btn"
                    onClick={handleSave}
                    disabled={!name.trim() || !email.trim()}
                  >
                    <Save size={16} />
                    Save Changes
                  </button>

                  <button
                    className="profile-cancel-btn"
                    onClick={handleCancel}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="profile-stats">
          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <CalendarCheck size={23} />
            </div>
            <div>
              <span>Total Bookings</span>
              <strong>{bookings.length}</strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <Ticket size={23} />
            </div>
            <div>
              <span>Total Tickets</span>
              <strong>{totalTickets}</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Profile

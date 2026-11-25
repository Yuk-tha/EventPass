
import { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { ArrowLeft } from 'lucide-react'

import './App.css'

import { events, type EventItem } from './data/events'
import { categories } from './data/categories'

import type {
  Booking,
  Profile,
  Notification,
  AuthResponse,
  User,
} from './types'

import Navbar, { type PageName } from './components/Navbar'
import BookingModal from './components/BookingModal'

import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import EventDetails from './pages/EventDetails'
import Bookings from './pages/Bookings'
import Tickets from './pages/Tickets'
import Scanner, { type ScannerResult } from './pages/Scanner'
import ProfilePage from './pages/Profile'
import Auth from './pages/Auth'

function App() {
  const [currentPage, setCurrentPage] = useState<PageName | 'auth'>('home')

  const [selectedCategory, setSelectedCategory] = useState('')
  const [viewingEvent, setViewingEvent] = useState<EventItem | null>(null)

  const [activeFilter, setActiveFilter] = useState('All events')
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Authentication State
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem('eventpass-token') || '',
  )

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('eventpass-user')
      return savedUser ? JSON.parse(savedUser) as User : null
    } catch {
      return null
    }
  })

  const [postAuthPage, setPostAuthPage] = useState<PageName>('home')

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('eventpass-bookings')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [usedTicketIds, setUsedTicketIds] = useState<string[]>(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem('eventpass-used-tickets') || '[]',
      )

      return Array.isArray(saved) ? saved : []
    } catch {
      return []
    }
  })

  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const savedProfile = localStorage.getItem('eventpass-profile')

      if (savedProfile) {
        return JSON.parse(savedProfile) as Profile
      }

      const savedBookings = JSON.parse(
        localStorage.getItem('eventpass-bookings') || '[]',
      ) as Booking[]

      const latestBooking = savedBookings[savedBookings.length - 1]

      return {
        name: latestBooking?.name || '',
        email: latestBooking?.email || '',
      }
    } catch {
      return { name: '', email: '' }
    }
  })

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem('eventpass-notifications')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [scannerResult, setScannerResult] = useState<ScannerResult>(null)

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length

  const saveBookings = (updatedBookings: Booking[]) => {
    setBookings(updatedBookings)
    localStorage.setItem(
      'eventpass-bookings',
      JSON.stringify(updatedBookings),
    )
  }

  const addNotification = (title: string, message: string) => {
    const notification: Notification = {
      id: `NT${Date.now()}`,
      title,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    }

    setNotifications((previous) => {
      const updated = [notification, ...previous]
      localStorage.setItem(
        'eventpass-notifications',
        JSON.stringify(updated),
      )
      return updated
    })
  }

  const markNotificationRead = (id: string) => {
    setNotifications((previous) => {
      const updated = previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      )

      localStorage.setItem(
        'eventpass-notifications',
        JSON.stringify(updated),
      )

      return updated
    })
  }

  const markAllNotificationsRead = () => {
    setNotifications((previous) => {
      const updated = previous.map((notification) => ({
        ...notification,
        read: true,
      }))

      localStorage.setItem(
        'eventpass-notifications',
        JSON.stringify(updated),
      )

      return updated
    })
  }

  const clearNotifications = () => {
    setNotifications([])
    localStorage.setItem('eventpass-notifications', '[]')
  }

  // Navigation handlers
  const navigateTo = (page: PageName) => {
    const protectedPages: PageName[] = [
      'bookings',
      'tickets',
      'scanner',
      'profile',
    ]

    if (protectedPages.includes(page) && !authToken) {
      setPostAuthPage(page)
      setCurrentPage('auth')
      return
    }

    if (page === 'scanner' && currentUser?.role !== 'admin') {
      window.alert('Access denied. Admin permission required.')
      return
    }

    setCurrentPage(page)

    if (page !== 'event-details') {
      setViewingEvent(null)
    }
  }

  const selectCategory = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage('category')
  }

  const viewEvent = (event: EventItem) => {
    setViewingEvent(event)
    setCurrentPage('event-details')
  }

  // Open Login / Register
  const handleAuthClick = () => {
    setPostAuthPage('home')
    setCurrentPage('auth')
  }

  // Authentication Success
  const handleAuthSuccess = (data: AuthResponse) => {
    localStorage.setItem('eventpass-token', data.token)
    localStorage.setItem('eventpass-user', JSON.stringify(data.user))

    setAuthToken(data.token)
    setCurrentUser(data.user)

    const updatedProfile = {
      name: data.user.name,
      email: data.user.email,
    }

    setProfile(updatedProfile)

    localStorage.setItem(
      'eventpass-profile',
      JSON.stringify(updatedProfile),
    )

    if (postAuthPage === 'scanner' && data.user.role !== 'admin') {
      setCurrentPage('home')
      window.alert('Access denied. Admin permission required.')
      return
    }

    setCurrentPage(postAuthPage)
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('eventpass-token')
    localStorage.removeItem('eventpass-user')
    localStorage.removeItem('eventpass-profile')

    setAuthToken('')
    setCurrentUser(null)
    setProfile({ name: '', email: '' })

    setSelectedEvent(null)
    setBookingSuccess(false)
    setViewingEvent(null)
    setScannerResult(null)
    setPostAuthPage('home')
    setCurrentPage('home')

    window.alert('Logged out successfully!')
  }

  // Back from Authentication
  const handleAuthBack = () => {
    setSelectedEvent(null)
    setBookingSuccess(false)
    setPostAuthPage('home')
    setCurrentPage('home')
  }

  // Profile save
  const saveProfile = (updatedProfile: Profile) => {
    const cleanedProfile = {
      name: updatedProfile.name.trim(),
      email: updatedProfile.email.trim(),
    }

    setProfile(cleanedProfile)

    localStorage.setItem(
      'eventpass-profile',
      JSON.stringify(cleanedProfile),
    )
  }

  // Booking handlers
  const openBooking = (event: EventItem) => {
    setSelectedEvent(event)
    setCustomerName(profile.name || '')
    setCustomerEmail(profile.email || '')
    setBookingSuccess(false)

    if (!authToken) {
      setPostAuthPage('home')
      setCurrentPage('auth')
    }
  }

  const closeBooking = () => {
    setSelectedEvent(null)
    setBookingSuccess(false)
  }

  const confirmBooking = (quantity: number) => {
    if (!selectedEvent) return

    const booking: Booking = {
      id: `EP${Date.now()}`,
      event: selectedEvent.title,
      eventDate: selectedEvent.date,
      location: selectedEvent.location,
      name: customerName.trim(),
      email: customerEmail.trim(),
      tickets: quantity,
      total: selectedEvent.price * quantity,
      bookedAt: new Date().toISOString(),
    }

    saveBookings([...bookings, booking])

    if (!profile.name && !profile.email) {
      const firstProfile = {
        name: booking.name,
        email: booking.email,
      }

      setProfile(firstProfile)
      localStorage.setItem(
        'eventpass-profile',
        JSON.stringify(firstProfile),
      )
    }

    addNotification(
      'Payment Successful!',
      `Your payment of ₹${booking.total.toLocaleString('en-IN')} for ${booking.event} was successful. ${booking.tickets} ticket(s) confirmed. Your QR ticket is ready in My Tickets.`,
    )

    setBookingSuccess(true)
  }

  const cancelBooking = (bookingId: string) => {
    const cancelledBooking = bookings.find(
      (booking) => booking.id === bookingId,
    )

    const updatedBookings = bookings.filter(
      (booking) => booking.id !== bookingId,
    )

    saveBookings(updatedBookings)

    if (cancelledBooking) {
      addNotification(
        'Booking cancelled',
        `${cancelledBooking.event} booking was cancelled.`,
      )
    }
  }

  // QR Scanner
  useEffect(() => {
    if (currentPage !== 'scanner') return

    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false,
    )

    let hasProcessedScan = false

    scanner.render(
      (decodedText) => {
        if (hasProcessedScan) return

        hasProcessedScan = true

        try {
          const payload = JSON.parse(decodedText) as {
            bookingId?: string
            event?: string
            attendee?: string
            email?: string
          }

          const matchedBooking = bookings.find(
            (booking) =>
              booking.id === payload.bookingId &&
              booking.event === payload.event &&
              booking.name === payload.attendee &&
              booking.email === payload.email,
          )

          if (!matchedBooking) {
            setScannerResult({ status: 'invalid' })
            return
          }

          let savedUsedIds: string[] = []

          try {
            savedUsedIds = JSON.parse(
              localStorage.getItem('eventpass-used-tickets') || '[]',
            )
          } catch {
            savedUsedIds = []
          }

          if (savedUsedIds.includes(matchedBooking.id)) {
            setUsedTicketIds(savedUsedIds)

            setScannerResult({
              status: 'used',
              booking: matchedBooking,
            })
            return
          }

          const updatedUsedIds = [
            ...savedUsedIds,
            matchedBooking.id,
          ]

          localStorage.setItem(
            'eventpass-used-tickets',
            JSON.stringify(updatedUsedIds),
          )

          setUsedTicketIds(updatedUsedIds)

          setScannerResult({
            status: 'valid',
            booking: matchedBooking,
          })
        } catch {
          setScannerResult({ status: 'invalid' })
        }
      },
      () => {
        // Ignore continuous camera scan messages.
      },
    )

    return () => {
      scanner.clear().catch(() => undefined)
    }
  }, [currentPage, bookings])

  // Back to Home handler
  const goToHome = () => {
    setCurrentPage('home')
    setViewingEvent(null)
  }

  return (
    <main className="app">
      {currentPage !== 'auth' && (
        <Navbar
          currentPage={currentPage}
          currentUser={currentUser}
          notifications={notifications}
          unreadCount={unreadCount}
          onNavigate={navigateTo}
          onMarkRead={markNotificationRead}
          onMarkAllRead={markAllNotificationsRead}
          onClearNotifications={clearNotifications}
          onAuthClick={handleAuthClick}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'auth' && (
        <Auth
          onAuthSuccess={handleAuthSuccess}
          onBack={handleAuthBack}
        />
      )}

      {['bookings', 'tickets', 'scanner', 'profile'].includes(currentPage) && (
        <button
          className="back-home-btn"
          onClick={goToHome}
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>
      )}

      {currentPage === 'home' && (
        <Home
          events={events}
          categories={categories}
          searchTerm={searchTerm}
          activeFilter={activeFilter}
          onSearchChange={setSearchTerm}
          onFilterChange={setActiveFilter}
          onSelectCategory={selectCategory}
          onViewEvent={viewEvent}
          onBookEvent={openBooking}
        />
      )}

      {currentPage === 'category' && (
        <CategoryPage
          category={selectedCategory}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'event-details' && viewingEvent && (
        <EventDetails
          event={viewingEvent}
          onBack={() => setCurrentPage('home')}
          onBook={() => openBooking(viewingEvent)}
        />
      )}

      {currentPage === 'bookings' && (
        <Bookings
          bookings={bookings}
          usedTicketIds={usedTicketIds}
          onCancel={cancelBooking}
          onExplore={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'tickets' && (
        <Tickets
          bookings={bookings}
          onExplore={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'scanner' && (
        <Scanner result={scannerResult} />
      )}

      {currentPage === 'profile' && (
        <ProfilePage
          profile={profile}
          bookings={bookings}
          onSave={saveProfile}
        />
      )}

      {selectedEvent && currentPage !== 'auth' && (
        <BookingModal
          event={selectedEvent}
          customerName={customerName}
          customerEmail={customerEmail}
          onNameChange={setCustomerName}
          onEmailChange={setCustomerEmail}
          onConfirm={confirmBooking}
          onClose={closeBooking}
          bookingSuccess={bookingSuccess}
        />
      )}
    </main>
  )
}

export default App


import { useState } from 'react'
import {
  Menu,
  X,
  Ticket,
  Home,
  CalendarCheck,
  QrCode,
  UserRound,
  Bell,
  CheckCheck,
  Trash2,
  LogIn,
  LogOut,
} from 'lucide-react'

import type { Notification, User } from '../types'

export type PageName =
  | 'home'
  | 'bookings'
  | 'tickets'
  | 'scanner'
  | 'profile'
  | 'category'
  | 'event-details'

type NavbarProps = {
  currentPage: PageName
  currentUser: User | null
  notifications: Notification[]
  unreadCount: number
  onNavigate: (page: PageName) => void
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
  onClearNotifications: () => void
  onAuthClick: () => void
  onLogout: () => void
}

function Navbar({
  currentPage,
  currentUser,
  notifications,
  unreadCount,
  onNavigate,
  onMarkRead,
  onMarkAllRead,
  onClearNotifications,
  onAuthClick,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const navItems = [
    { label: 'Home', page: 'home' as PageName, icon: Home },
    { label: 'My Bookings', page: 'bookings' as PageName, icon: CalendarCheck },
    { label: 'My Tickets', page: 'tickets' as PageName, icon: Ticket },
    { label: 'QR Scanner', page: 'scanner' as PageName, icon: QrCode },
    { label: 'My Profile', page: 'profile' as PageName, icon: UserRound },
  ]

  const navigateTo = (page: PageName) => {
    onNavigate(page)
    setMobileMenuOpen(false)
    setNotificationsOpen(false)
  }

  const handleAuthClick = () => {
    onAuthClick()
    setMobileMenuOpen(false)
    setNotificationsOpen(false)
  }

  const handleLogout = () => {
    onLogout()
    setMobileMenuOpen(false)
    setNotificationsOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <button
          className="navbar-logo"
          onClick={() => navigateTo('home')}
        >
          <span className="navbar-logo-icon">
            <Ticket size={23} />
          </span>
          <span>EventPass</span>
        </button>

        <nav className="navbar-links">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={
                currentPage === item.page
                  ? 'navbar-link active'
                  : 'navbar-link'
              }
              onClick={() => navigateTo(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="navbar-actions">
          <div className="navbar-notification-wrapper">
            <button
              className="navbar-notification-btn"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={21} />
              {unreadCount > 0 && (
                <span className="notification-count">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="navbar-notification-panel">
                <div className="notification-panel-header">
                  <div>
                    <h3>Notifications</h3>
                    <span>{unreadCount} unread</span>
                  </div>

                  <button
                    aria-label="Close notifications"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                {notifications.length > 0 ? (
                  <>
                    <div className="notification-panel-actions">
                      <button onClick={onMarkAllRead}>
                        <CheckCheck size={14} />
                        Mark all read
                      </button>

                      <button onClick={onClearNotifications}>
                        <Trash2 size={14} />
                        Clear all
                      </button>
                    </div>

                    <div className="notification-list">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          className={
                            notification.read
                              ? 'notification-item'
                              : 'notification-item unread'
                          }
                          onClick={() => onMarkRead(notification.id)}
                        >
                          <span className="notification-dot" />

                          <span className="notification-item-content">
                            <strong>{notification.title}</strong>
                            <span>{notification.message}</span>
                            <small>{notification.createdAt}</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="notification-empty">
                    <Bell size={28} />
                    <p>No notifications yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="navbar-profile-btn"
            onClick={() => navigateTo('profile')}
            aria-label="Open profile"
          >
            <UserRound size={19} />
          </button>

          {currentUser ? (
            <button
              className="navbar-auth-btn"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <button
              className="navbar-auth-btn"
              onClick={handleAuthClick}
            >
              <LogIn size={17} />
              Login / Register
            </button>
          )}

          <button
            className="navbar-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="navbar-mobile-menu">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.page}
                className={
                  currentPage === item.page
                    ? 'navbar-mobile-link active'
                    : 'navbar-mobile-link'
                }
                onClick={() => navigateTo(item.page)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            )
          })}

          {currentUser ? (
            <button
              className="navbar-mobile-link"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button
              className="navbar-mobile-link"
              onClick={handleAuthClick}
            >
              <LogIn size={18} />
              Login / Register
            </button>
          )}
        </nav>
      )}
    </header>
  )
}

export default Navbar

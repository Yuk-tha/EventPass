
import { useEffect, useState } from 'react'
import {
  X,
  CalendarDays,
  MapPin,
  Ticket,
  Minus,
  Plus,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Landmark,
  ArrowLeft,
} from 'lucide-react'

import type { EventItem } from '../data/events'
import './BookingModal.css'

type BookingModalProps = {
  event: EventItem
  customerName: string
  customerEmail: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onConfirm: (quantity: number) => void
  onClose: () => void
  bookingSuccess: boolean
}

type PaymentMethod = 'upi' | 'card' | 'netbanking'

function BookingModal({
  event,
  customerName,
  customerEmail,
  onNameChange,
  onEmailChange,
  onConfirm,
  onClose,
  bookingSuccess,
}: BookingModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [paymentStep, setPaymentStep] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi')

  const total = event.price * quantity

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleContinue = () => {
    if (
      customerName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
    ) {
      setPaymentStep(true)
    }
  }

  return (
    <div
      className="booking-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <button
          className="booking-modal-close"
          onClick={onClose}
          aria-label="Close booking"
        >
          <X size={21} />
        </button>

        {bookingSuccess ? (
          <div className="booking-success-content">
            <CheckCircle2 size={58} />
            <h2>Payment Successful!</h2>
            <p>Your demo payment is complete and your booking is confirmed.</p>

            <button className="booking-confirm-btn" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            {paymentStep && (
              <button
                className="payment-back-btn"
                onClick={() => setPaymentStep(false)}
              >
                <ArrowLeft size={17} />
                Back
              </button>
            )}

            <div className="booking-modal-header">
              <span className="section-label">
                {paymentStep ? 'SECURE CHECKOUT' : 'RESERVE YOUR SPOT'}
              </span>
              <h2 id="booking-modal-title">
                {paymentStep ? 'Complete Your Payment' : 'Book Your Tickets'}
              </h2>
            </div>

            <div className="booking-event-summary">
              <img
                src={`https://images.unsplash.com/${event.image}?w=300&auto=format&fit=crop`}
                alt={event.title}
              />

              <div>
                <span className={`event-category ${event.color}`}>
                  {event.category}
                </span>

                <h3>{event.title}</h3>

                <p>
                  <CalendarDays size={14} />
                  {event.date}
                </p>

                <p>
                  <MapPin size={14} />
                  {event.location}
                </p>
              </div>
            </div>

            {!paymentStep ? (
              <div className="booking-form">
                <label htmlFor="booking-name">Full Name</label>
                <input
                  id="booking-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="Enter your full name"
                />

                <label htmlFor="booking-email">Email Address</label>
                <input
                  id="booking-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="Enter your email address"
                />

                <label>Number of Tickets</label>

                <div className="booking-quantity-control">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease tickets"
                  >
                    <Minus size={17} />
                  </button>

                  <strong>{quantity}</strong>

                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    aria-label="Increase tickets"
                  >
                    <Plus size={17} />
                  </button>
                </div>

                <div className="booking-total">
                  <div>
                    <span>
                      <Ticket size={16} />
                      {quantity} ticket(s)
                    </span>
                    <strong>₹{total.toLocaleString('en-IN')}</strong>
                  </div>
                  <small>
                    ₹{event.price.toLocaleString('en-IN')} per ticket
                  </small>
                </div>

                <button
                  className="booking-confirm-btn"
                  disabled={
                    !customerName.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
                  }
                  onClick={handleContinue}
                >
                  Continue to Payment
                </button>
              </div>
            ) : (
              <div className="demo-payment-section">
                <div className="payment-amount">
                  <span>Total Amount</span>
                  <strong>₹{total.toLocaleString('en-IN')}</strong>
                </div>

                <h3>Select Payment Method</h3>

                <div className="payment-method-list">
                  <button
                    className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <Smartphone size={22} />
                    <span>UPI</span>
                    <input type="radio" checked={paymentMethod === 'upi'} readOnly />
                  </button>

                  <button
                    className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={22} />
                    <span>Credit / Debit Card</span>
                    <input type="radio" checked={paymentMethod === 'card'} readOnly />
                  </button>

                  <button
                    className={`payment-method ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <Landmark size={22} />
                    <span>Net Banking</span>
                    <input type="radio" checked={paymentMethod === 'netbanking'} readOnly />
                  </button>
                </div>

                <button
                  className="booking-confirm-btn"
                  onClick={() => onConfirm(quantity)}
                >
                  Pay ₹{total.toLocaleString('en-IN')} Now
                </button>

                <p className="booking-demo-note">
                  Demo payment only. No actual money will be deducted.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default BookingModal


import { QRCodeSVG } from 'qrcode.react'
import {
  Ticket,
  CalendarDays,
  MapPin,
  UserRound,
  ArrowRight,
  Download,
} from 'lucide-react'

import type { Booking } from '../types'
import './Tickets.css'

type TicketsProps = {
  bookings: Booking[]
  onExplore: () => void
}

function Tickets({ bookings, onExplore }: TicketsProps) {
  const downloadTicket = (bookingId: string) => {
    const printContent = document.getElementById(`ticket-${bookingId}`)

    if (!printContent) return

    const printWindow = window.open('', '_blank', 'width=900,height=700')

    if (!printWindow) {
      alert('Please allow pop-ups to download your ticket.')
      return
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>EventPass Ticket - ${bookingId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #171f36;
            }
            .ticket {
              max-width: 700px;
              margin: auto;
              padding: 25px;
              border: 2px dashed #7952a3;
              border-radius: 15px;
            }
            .ticket-header {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #ddd;
              padding-bottom: 15px;
            }
            .ticket-body {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 20px;
              padding: 25px 0;
            }
            .ticket-details h2 {
              margin-bottom: 20px;
            }
            .ticket-details p {
              margin: 12px 0;
            }
            .qr {
              text-align: center;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 10px;
            }
            .qr svg {
              width: 150px;
              height: 150px;
            }
            .ticket-footer {
              display: flex;
              justify-content: space-between;
              gap: 15px;
              border-top: 1px dashed #aaa;
              padding-top: 20px;
            }
            .ticket-footer div {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            small {
              color: #777;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            ${printContent.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `)

    printWindow.document.close()
  }

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
            <div className="digital-ticket-wrapper" key={booking.id}>
              <article
                className="digital-ticket-card"
                id={`ticket-${booking.id}`}
              >
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

              <button
                className="download-ticket-btn"
                onClick={() => downloadTicket(booking.id)}
              >
                <Download size={17} />
                Download Ticket
              </button>
            </div>
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

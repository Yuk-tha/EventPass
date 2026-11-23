
import {
  QrCode,
  Camera,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Ticket,
  UserRound,
  CalendarDays,
  MapPin,
} from 'lucide-react'

import type { Booking } from '../types'
import './Scanner.css'

export type ScannerResult =
  | {
      status: 'valid'
      booking: Booking
    }
  | {
      status: 'used'
      booking: Booking
    }
  | {
      status: 'invalid'
    }
  | null

type ScannerProps = {
  result: ScannerResult
}

function Scanner({ result }: ScannerProps) {
  return (
    <main className="scanner-page">
      <section className="scanner-header">
        <span className="section-label">EVENTPASS MANAGEMENT</span>
        <h1>QR Ticket Scanner</h1>
        <p>Scan attendee tickets to verify event entry.</p>
      </section>

      <div className="scanner-layout">
        <section className="scanner-panel">
          <div className="scanner-panel-heading">
            <div>
              <Camera size={21} />
              <h2>Scan Ticket</h2>
            </div>
            <span className="scanner-live-status">Scanner</span>
          </div>

          <div id="reader" className="qr-reader-container">
            <div className="scanner-placeholder">
              <QrCode size={65} />
              <h3>Camera Scanner</h3>
              <p>
                Allow camera access to scan a ticket QR code.
              </p>
            </div>
          </div>

          <p className="scanner-instruction">
            Position the ticket QR code inside the scanner frame.
          </p>
        </section>

        <section className="scanner-result-panel">
          <div className="scanner-result-heading">
            <span className="section-label">VERIFICATION</span>
            <h2>Scan Result</h2>
          </div>

          {!result && (
            <div className="scanner-empty-result">
              <QrCode size={48} />
              <h3>Waiting for scan</h3>
              <p>
                Scan an event ticket to see its verification details here.
              </p>
            </div>
          )}

          {result?.status === 'valid' && (
            <div className="scanner-status-card valid">
              <CheckCircle2 size={45} />
              <h3>Valid Ticket</h3>
              <p>Ticket verified successfully.</p>

              <div className="scanner-booking-details">
                <h4>Attendee Details</h4>

                <p>
                  <UserRound size={16} />
                  {result.booking.name}
                </p>

                <p>
                  <Ticket size={16} />
                  {result.booking.event}
                </p>

                <p>
                  <CalendarDays size={16} />
                  {result.booking.eventDate}
                </p>

                <p>
                  <MapPin size={16} />
                  {result.booking.location || 'Location unavailable'}
                </p>

                <p>
                  <Ticket size={16} />
                  {result.booking.tickets} ticket(s)
                </p>
              </div>
            </div>
          )}

          {result?.status === 'used' && (
            <div className="scanner-status-card used">
              <AlertTriangle size={45} />
              <h3>Ticket Already Used</h3>
              <p>This ticket has already been scanned.</p>

              <div className="scanner-booking-details">
                <h4>Ticket Details</h4>
                <p>
                  <UserRound size={16} />
                  {result.booking.name}
                </p>
                <p>
                  <Ticket size={16} />
                  {result.booking.event}
                </p>
              </div>
            </div>
          )}

          {result?.status === 'invalid' && (
            <div className="scanner-status-card invalid">
              <XCircle size={45} />
              <h3>Invalid Ticket</h3>
              <p>
                This QR code does not match any confirmed booking.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Scanner

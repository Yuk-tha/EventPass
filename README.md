# 🎟️ EventPass – Event Booking & Ticket Management Platform

EventPass is a modern and responsive event booking platform that allows users to explore events, browse categories, book tickets, make demo payments, and access digital tickets with QR codes.

The platform provides an easy-to-use interface for discovering experiences and managing event bookings.

## 🚀 Features

- **Explore Events:** Browse upcoming events across multiple categories.
- **Search Events:** Search events by title, category, or location with live suggestions.
- **Browse Categories:** Explore events based on Music, Workshops, Nightlife, Arts & Culture, Technology, and Sports.
- **Event Details:** View event descriptions, schedules, activities, artists, and guidelines.
- **Ticket Booking:** Select events, enter attendee details, and choose ticket quantities.
- **Demo Payment:** Simulated payment flow with UPI, Credit/Debit Card, and Net Banking options.
- **Digital QR Tickets:** Automatically generate QR codes for confirmed bookings.
- **QR Code Scanner:** Scan and validate tickets while preventing duplicate usage.
- **My Bookings:** View and manage booking information.
- **My Tickets:** Access digital tickets and booking details.
- **Notifications:** Receive booking confirmations and cancellation updates.
- **User Profile:** View and update profile information.
- **Responsive UI:** Designed for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend development |
| TypeScript | Type safety |
| Vite | Development and build tool |
| CSS3 | Styling and responsive design |
| Lucide React | Icons |
| html5-qrcode | QR code scanning |
| qrcode.react | QR code generation |
| LocalStorage | Local data persistence |
| Git & GitHub | Version control |

## 📂 Project Structure

```text
EventPass/
│
├── public/
│   └── banner.png
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── EventCard.tsx
│   │   └── BookingModal.tsx
│   │
│   ├── data/
│   │   ├── events.ts
│   │   └── categories.ts
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── EventDetails.tsx
│   │   ├── Bookings.tsx
│   │   ├── Tickets.tsx
│   │   ├── Scanner.tsx
│   │   └── Profile.tsx
│   │
│   ├── types/
│   ├── App.tsx
│   ├── App.css
│   └── index.css
│
├── index.html
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Yuk-tha/EventPass.git
```

### 2. Navigate to the Project Folder

```bash
cd EventPass
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Browser

Visit:

```text
http://localhost:5173/
```

## 💳 Payment Information

EventPass currently uses a simulated demo payment system.

- Supports UPI, Credit/Debit Card, and Net Banking selection.
- No actual money is deducted.
- Payment success is simulated.
- Confirmed bookings generate digital QR tickets.

Real payment gateway integration is planned for a future update.

## 🔐 Ticket Validation

Each confirmed booking generates a unique QR code containing booking information.

The QR scanner validates the booking details and checks whether the ticket has already been used.

## 🔮 Future Enhancements

- Real payment gateway integration using Razorpay.
- Backend development with Node.js and Express.
- MongoDB database integration.
- User authentication and authorization.
- Admin dashboard for event management.
- Email notifications and booking confirmations.
- Ticket PDF download functionality.

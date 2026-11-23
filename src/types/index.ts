export type Booking = {
  id: string
  event: string
  eventDate: string
  location?: string
  name: string
  email: string
  tickets: number
  total: number
  bookedAt: string
}

export type Profile = {
  name: string
  email: string
}

export type Notification = {
  id: string
  title: string
  message: string
  createdAt: string
  read: boolean
}
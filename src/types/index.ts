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

// Authentication Types
export type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export type AuthResponse = {
  success: boolean
  message: string
  token: string
  user: User
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  email: string
  password: string
}
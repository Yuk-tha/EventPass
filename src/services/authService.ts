import API from './api'

import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '../types'

// Register User
export const registerUser = async (
  userData: RegisterData,
): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>(
    '/auth/register',
    userData,
  )

  return response.data
}

// Login User
export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>(
    '/auth/login',
    credentials,
  )

  return response.data
}

// Get Logged-in User Profile
export const getUserProfile = async (token: string) => {
  const response = await API.get('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
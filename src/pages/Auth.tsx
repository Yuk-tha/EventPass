
import { useState } from 'react'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'

import {
  loginUser,
  registerUser,
} from '../services/authService'

import type { AuthResponse } from '../types'

import './Auth.css'

type AuthProps = {
  onAuthSuccess: (data: AuthResponse) => void
  onBack: () => void
}

function Auth({ onAuthSuccess, onBack }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please fill in all required fields')
      return
    }

    if (!isLogin && !name.trim()) {
      setError('Please enter your name')
      return
    }

    setLoading(true)

    try {
      let response: AuthResponse

      if (isLogin) {
        response = await loginUser({
          email: email.trim(),
          password,
        })
      } else {
        response = await registerUser({
          name: name.trim(),
          email: email.trim(),
          password,
        })
      }

      onAuthSuccess(response)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
          'Something went wrong. Please try again.',
        )
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <button
        type="button"
        className="auth-back-btn"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        Back to Home
      </button>

      <div className="auth-card">
        <div className="auth-heading">
          <h1>EventPass</h1>
          <p>
            {isLogin
              ? 'Welcome back! Login to continue.'
              : 'Create your account and explore events.'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? 'auth-tab active' : 'auth-tab'}
            onClick={() => {
              setIsLogin(true)
              setError('')
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? 'auth-tab active' : 'auth-tab'}
            onClick={() => {
              setIsLogin(false)
              setError('')
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Login'
                : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch-text">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth

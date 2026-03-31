import { createContext, useState, useEffect } from 'react'
import { authAPI } from '../api/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

 const login = async (email, password) => {
  const response = await authAPI.login({ email, password })
  const { token, id, email: userEmail, name, role } = response.data
  const userData = { id, email: userEmail, name, role }
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const register = async (data) => {
  const response = await authAPI.register(data)
  const { token, id, email: userEmail, name, role } = response.data
  const userData = { id, email: userEmail, name, role }
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const hasRole = (role) => {
    return user?.role === role
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

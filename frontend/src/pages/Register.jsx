import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff, UserPlus } from 'lucide-react'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dni: '',
    phone: '',
    address: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dni: formData.dni,
        phone: formData.phone,
        address: formData.address
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Dental App</h1>
            <p className="text-gray-500 mt-2">Crea tu cuenta</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI
                </label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="12345678"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="3511234567"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Av. Siempre Viva 123"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <UserPlus size={20} />
                  Crear Cuenta
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary hover:text-primaryDark font-medium">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

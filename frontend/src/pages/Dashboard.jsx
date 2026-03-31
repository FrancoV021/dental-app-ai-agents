import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user, hasRole } = useAuth()

  if (hasRole('ADMIN')) {
    return <Navigate to="/admin" replace />
  }
  if (hasRole('PATIENT')) {
    return <Navigate to="/patient" replace />
  }
  if (hasRole('PROFESSIONAL')) {
    return <Navigate to="/professional" replace />
  }

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800">Bienvenido a Dental App</h2>
      <p className="text-gray-600 mt-2">{user?.name}</p>
    </div>
  )
}

import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  Stethoscope, 
  CalendarDays,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const { user, logout, hasRole } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/admin/users', icon: Users, label: 'Usuarios' },
    { to: '/admin/patients', icon: UserRound, label: 'Pacientes' },
    { to: '/admin/professionals', icon: Stethoscope, label: 'Profesionales' },
    { to: '/admin/appointments', icon: CalendarDays, label: 'Turnos' },
  ]

  const patientLinks = [
    { to: '/patient', icon: LayoutDashboard, label: 'Mis Turnos', exact: true },
    { to: '/patient/create-appointment', icon: CalendarDays, label: 'Nuevo Turno' },
  ]

  const professionalLinks = [
    { to: '/professional', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/professional/today', icon: CalendarDays, label: 'Turnos de Hoy' },
  ]

  const getLinks = () => {
    if (hasRole('ADMIN')) return adminLinks
    if (hasRole('PATIENT')) return patientLinks
    if (hasRole('PROFESSIONAL')) return professionalLinks
    return []
  }

  const getDashboardPath = () => {
    if (hasRole('ADMIN')) return '/admin'
    if (hasRole('PATIENT')) return '/patient'
    if (hasRole('PROFESSIONAL')) return '/professional'
    return '/dashboard'
  }

  const links = getLinks()

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-primary">Dental App</h1>
          <p className="text-sm text-gray-500">Sistema de Gestión</p>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <link.icon size={20} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="mb-4 px-4">
            <p className="font-medium text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="lg:ml-64 min-h-screen">
        <header className="bg-white shadow-sm p-4 lg:p-6 lg:pl-72">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === getDashboardPath() 
                ? 'Dashboard' 
                : location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1)}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                Bienvenido, {user?.name}
              </span>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 lg:pl-72">
          <Outlet />
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

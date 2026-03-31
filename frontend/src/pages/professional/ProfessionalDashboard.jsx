import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { appointmentsAPI } from '../../api/api'
import { Calendar, Clock, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProfessionalDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentsAPI.getAll()
        setAppointments(response.data)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.id) {
      fetchAppointments()
    }
  }, [user])

  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter(apt => apt.appointmentDate === today)
  const upcomingAppointments = appointments.filter(apt => apt.appointmentDate > today)

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Profesional</h2>
        <Link
          to="/professional/today"
          className="flex items-center gap-2 bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg"
        >
          <Calendar size={20} />
          Turnos de Hoy ({todayAppointments.length})
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Turnos Hoy</p>
          <p className="text-3xl font-bold text-primary">{todayAppointments.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Próximos Turnos</p>
          <p className="text-3xl font-bold text-blue-600">{upcomingAppointments.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Turnos</p>
          <p className="text-3xl font-bold text-gray-800">{appointments.length}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximos Turnos</h3>
      {upcomingAppointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No hay turnos programados</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingAppointments.slice(0, 5).map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <User className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500">DNI: {appointment.patientDni}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>{appointment.appointmentDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>{appointment.appointmentTime}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

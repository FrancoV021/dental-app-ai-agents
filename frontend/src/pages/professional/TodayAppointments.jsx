import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { appointmentsAPI } from '../../api/api'
import { User, Calendar, Clock, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function TodayAppointments() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const response = await appointmentsAPI.getAll()
        const today = new Date().toISOString().split('T')[0]
        const professionalAppointments = response.data.filter(
          apt => apt.professionalId === user.id && apt.appointmentDate === today
        )
        setAppointments(professionalAppointments)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user?.id) {
      fetchTodayAppointments()
    }
  }, [user])

  const updateStatus = async (id, status) => {
    try {
      await appointmentsAPI.update(id, { status })
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status } : apt
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

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

  const today = new Date().toLocaleDateString('es-AR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Turnos de Hoy</h2>
        <p className="text-gray-500 capitalize">{today}</p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No hay turnos para hoy</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <User className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{appointment.patientName}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {appointment.appointmentDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {appointment.appointmentTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} />
                        DNI: {appointment.patientDni}
                      </span>
                    </div>
                    {appointment.notes && (
                      <p className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                        <AlertCircle size={14} className="inline mr-1" />
                        {appointment.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'PENDING' ? 'Pendiente' :
                     appointment.status === 'CONFIRMED' ? 'Confirmado' :
                     appointment.status === 'COMPLETED' ? 'Completado' : 'Cancelado'}
                  </span>
                  {appointment.status !== 'COMPLETED' && appointment.status !== 'CANCELLED' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(appointment.id, 'CONFIRMED')}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        <CheckCircle size={16} />
                        Confirmar
                      </button>
                      <button
                        onClick={() => updateStatus(appointment.id, 'COMPLETED')}
                        className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                      >
                        <CheckCircle size={16} />
                        Completar
                      </button>
                      <button
                        onClick={() => updateStatus(appointment.id, 'CANCELLED')}
                        className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        <XCircle size={16} />
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

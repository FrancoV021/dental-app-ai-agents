import { useState, useEffect } from 'react'
import { Users, UserRound, Stethoscope, CalendarDays } from 'lucide-react'
import { usersAPI, patientsAPI, professionalsAPI, appointmentsAPI } from '../../api/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    patients: 0,
    professionals: 0,
    appointments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, patientsRes, professionalsRes, appointmentsRes] = await Promise.all([
          usersAPI.getAll(),
          patientsAPI.getAll(),
          professionalsAPI.getAll(),
          appointmentsAPI.getAll()
        ])
        setStats({
          users: usersRes.data.length || 0,
          patients: patientsRes.data.length || 0,
          professionals: professionalsRes.data.length || 0,
          appointments: appointmentsRes.data.length || 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { title: 'Usuarios', value: stats.users, icon: Users, color: 'bg-blue-500' },
    { title: 'Pacientes', value: stats.patients, icon: UserRound, color: 'bg-green-500' },
    { title: 'Profesionales', value: stats.professionals, icon: Stethoscope, color: 'bg-purple-500' },
    { title: 'Turnos', value: stats.appointments, icon: CalendarDays, color: 'bg-orange-500' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel de Administración</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Bienvenido al Panel de Admin</h3>
        <p className="text-gray-600">
          Desde aquí puedes gestionar usuarios, pacientes, profesionales y turnos del sistema.
        </p>
      </div>
    </div>
  )
}

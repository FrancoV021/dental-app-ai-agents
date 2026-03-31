import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { appointmentsAPI, professionalsAPI, patientsAPI } from '../../api/api'
import { Calendar, Clock, CheckCircle } from 'lucide-react'

export default function CreateAppointment() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [professionals, setProfessionals] = useState([])
  const [patientId, setPatientId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    professionalId: '',
    date: '',
    time: '',
    notes: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [professionalsRes, patientRes] = await Promise.all([
          professionalsAPI.getAll(),
          patientsAPI.getMe()
        ])
        setProfessionals(professionalsRes.data)
        setPatientId(patientRes.data.id)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!patientId) {
      alert('Error: No se pudo obtener el ID del paciente')
      return
    }
    setSubmitting(true)
    try {
      await appointmentsAPI.create({
        patientId: patientId,
        professionalId: parseInt(formData.professionalId),
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        notes: formData.notes
      })
      setSuccess(true)
      setTimeout(() => {
        navigate('/patient')
      }, 2000)
    } catch (error) {
      console.error('Error creating appointment:', error)
      alert('Error al crear el turno')
    } finally {
      setSubmitting(false)
    }
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Turno Solicitado</h2>
          <p className="text-gray-600">Tu turno ha sido solicitado exitosamente</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Solicitar Turno</h2>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Profesional
            </label>
            <select
              value={formData.professionalId}
              onChange={(e) => setFormData({ ...formData, professionalId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Selecciona un profesional</option>
              {professionals.map((professional) => (
                <option key={professional.id} value={professional.id}>
                  {professional.name} - {professional.specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Fecha
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={getMinDate()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-2" />
                Hora
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas (opcional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              rows="4"
              placeholder="Describe tu consulta o motivo de la visita..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primaryDark text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                <Calendar size={20} />
                Solicitar Turno
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

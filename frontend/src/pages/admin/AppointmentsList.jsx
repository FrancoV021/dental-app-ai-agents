import { useState, useEffect } from 'react'
import { appointmentsAPI, professionalsAPI, patientsAPI } from '../../api/api'
import { Edit, Trash2, Plus, X } from 'lucide-react'

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([])
  const [professionals, setProfessionals] = useState([])
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [formData, setFormData] = useState({
    patientId: '',
    professionalId: '',
    date: '',
    time: '',
    status: 'PENDING',
    notes: ''
  })

  const fetchData = async () => {
    try {
      const [appointmentsRes, professionalsRes, patientsRes] = await Promise.all([
        appointmentsAPI.getAll(),
        professionalsAPI.getAll(),
        patientsAPI.getAll()
      ])
      setAppointments(appointmentsRes.data)
      setProfessionals(professionalsRes.data)
      setPatients(patientsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        patientId: parseInt(formData.patientId),
        professionalId: parseInt(formData.professionalId),
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        notes: formData.notes
      }
      if (editingAppointment) {
        await appointmentsAPI.update(editingAppointment.id, { status: formData.status })
      } else {
        await appointmentsAPI.create(data)
      }
      setShowModal(false)
      setEditingAppointment(null)
      setFormData({ patientId: '', professionalId: '', date: '', time: '', status: 'PENDING', notes: '' })
      fetchData()
    } catch (error) {
      console.error('Error saving appointment:', error)
    }
  }

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment)
    setFormData({
      patientId: appointment.patientId?.toString() || '',
      professionalId: appointment.professionalId?.toString() || '',
      date: appointment.appointmentDate || '',
      time: appointment.appointmentTime || '',
      status: appointment.status || 'PENDING',
      notes: appointment.notes || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este turno?')) {
      try {
        await appointmentsAPI.delete(id)
        fetchData()
      } catch (error) {
        console.error('Error deleting appointment:', error)
      }
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Turnos</h2>
        <button
          onClick={() => { setShowModal(true); setEditingAppointment(null); setFormData({ patientId: '', professionalId: '', date: '', time: '', status: 'PENDING', notes: '' }) }}
          className="flex items-center gap-2 bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg"
        >
          <Plus size={20} />
          Nuevo Turno
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profesional</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{appointment.patientName || 'N/A'}</td>
                <td className="px-6 py-4">{appointment.professionalName || 'N/A'}</td>
                <td className="px-6 py-4">{appointment.appointmentDate}</td>
                <td className="px-6 py-4">{appointment.appointmentTime}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(appointment)} className="text-blue-600 hover:text-blue-800 mr-3">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(appointment.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{editingAppointment ? 'Editar' : 'Nuevo'} Turno</h3>
              <button onClick={() => setShowModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                <select
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Seleccionar paciente</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profesional</label>
                <select
                  value={formData.professionalId}
                  onChange={(e) => setFormData({ ...formData, professionalId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Seleccionar profesional</option>
                  {professionals.map((professional) => (
                    <option key={professional.id} value={professional.id}>{professional.name} - {professional.specialty}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="PENDING">Pendiente</option>
                  <option value="CONFIRMED">Confirmado</option>
                  <option value="COMPLETED">Completado</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  rows="3"
                />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primaryDark text-white py-2 rounded-lg">
                {editingAppointment ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { patientsAPI } from '../../api/api'
import { Edit, Trash2, Plus, X } from 'lucide-react'

export default function PatientsList() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', dni: '', phone: '', address: '' })

  const fetchPatients = async () => {
    try {
      const response = await patientsAPI.getAll()
      setPatients(response.data)
    } catch (error) {
      console.error('Error fetching patients:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingPatient) {
        await patientsAPI.update(editingPatient.id, formData)
      } else {
        await patientsAPI.create(formData)
      }
      setShowModal(false)
      setEditingPatient(null)
      setFormData({ name: '', email: '', password: '', dni: '', phone: '', address: '' })
      fetchPatients()
    } catch (error) {
      console.error('Error saving patient:', error)
    }
  }

  const handleEdit = (patient) => {
    setEditingPatient(patient)
    setFormData({ name: patient.name, email: patient.email, password: '', dni: patient.dni, phone: patient.phone, address: patient.address || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      try {
        await patientsAPI.delete(id)
        fetchPatients()
      } catch (error) {
        console.error('Error deleting patient:', error)
      }
    }
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
        <h2 className="text-2xl font-bold text-gray-800">Pacientes</h2>
        <button
          onClick={() => { setShowModal(true); setEditingPatient(null); setFormData({ name: '', email: '', password: '', dni: '', phone: '', address: '' }) }}
          className="flex items-center gap-2 bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg"
        >
          <Plus size={20} />
          Nuevo Paciente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DNI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{patient.name}</td>
                <td className="px-6 py-4">{patient.email}</td>
                <td className="px-6 py-4">{patient.dni}</td>
                <td className="px-6 py-4">{patient.phone}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(patient)} className="text-blue-600 hover:text-blue-800 mr-3">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(patient.id)} className="text-red-600 hover:text-red-800">
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
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{editingPatient ? 'Editar' : 'Nuevo'} Paciente</h3>
              <button onClick={() => setShowModal(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                  disabled={editingPatient}
                />
              </div>
              {!editingPatient && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                <input
                  type="text"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primaryDark text-white py-2 rounded-lg">
                {editingPatient ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

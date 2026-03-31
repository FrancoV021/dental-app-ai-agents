import { useState, useEffect } from 'react'
import { professionalsAPI } from '../../api/api'
import { Edit, Trash2, Plus, X } from 'lucide-react'

export default function ProfessionalsList() {
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProfessional, setEditingProfessional] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', specialty: '', licenseNumber: '', phone: '' })

  const fetchProfessionals = async () => {
    try {
      const response = await professionalsAPI.getAll()
      setProfessionals(response.data)
    } catch (error) {
      console.error('Error fetching professionals:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessionals()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProfessional) {
        await professionalsAPI.update(editingProfessional.id, formData)
      } else {
        await professionalsAPI.create(formData)
      }
      setShowModal(false)
      setEditingProfessional(null)
      setFormData({ name: '', email: '', password: '', specialty: '', licenseNumber: '', phone: '' })
      fetchProfessionals()
    } catch (error) {
      console.error('Error saving professional:', error)
    }
  }

  const handleEdit = (professional) => {
    setEditingProfessional(professional)
    setFormData({ name: professional.name, email: professional.email, password: '', specialty: professional.specialty, licenseNumber: professional.licenseNumber, phone: professional.phone })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este profesional?')) {
      try {
        await professionalsAPI.delete(id)
        fetchProfessionals()
      } catch (error) {
        console.error('Error deleting professional:', error)
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
        <h2 className="text-2xl font-bold text-gray-800">Profesionales</h2>
        <button
          onClick={() => { setShowModal(true); setEditingProfessional(null); setFormData({ name: '', email: '', password: '', specialty: '', licenseNumber: '', phone: '' }) }}
          className="flex items-center gap-2 bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg"
        >
          <Plus size={20} />
          Nuevo Profesional
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especialidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {professionals.map((professional) => (
              <tr key={professional.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{professional.name}</td>
                <td className="px-6 py-4">{professional.email}</td>
                <td className="px-6 py-4">{professional.specialty}</td>
                <td className="px-6 py-4">{professional.phone}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(professional)} className="text-blue-600 hover:text-blue-800 mr-3">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(professional.id)} className="text-red-600 hover:text-red-800">
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
              <h3 className="text-xl font-bold">{editingProfessional ? 'Editar' : 'Nuevo'} Profesional</h3>
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
                  disabled={editingProfessional}
                />
              </div>
              {!editingProfessional && (
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Odontología General, Ortodoncia, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Licencia</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                  disabled={editingProfessional}
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
              <button type="submit" className="w-full bg-primary hover:bg-primaryDark text-white py-2 rounded-lg">
                {editingProfessional ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

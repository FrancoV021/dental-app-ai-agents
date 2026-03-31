import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data)
}

export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`)
}

export const patientsAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  getMe: () => api.get('/patients/me'),
  create: (data) => api.post('/patients', {
    email: data.email,
    password: data.password,
    name: data.name,
    dni: data.dni,
    phone: data.phone,
    address: data.address || ''
  }),
  update: (id, data) => api.put(`/patients/${id}`, {
    dni: data.dni,
    phone: data.phone,
    address: data.address
  }),
  delete: (id) => api.delete(`/patients/${id}`)
}

export const professionalsAPI = {
  getAll: () => api.get('/professionals'),
  getById: (id) => api.get(`/professionals/${id}`),
  getMe: () => api.get('/professionals/me'),
  create: (data) => api.post('/professionals', {
    email: data.email,
    password: data.password,
    name: data.name,
    specialty: data.specialty,
    licenseNumber: data.licenseNumber,
    phone: data.phone
  }),
  update: (id, data) => api.put(`/professionals/${id}`, {
    specialty: data.specialty,
    licenseNumber: data.licenseNumber,
    phone: data.phone
  }),
  delete: (id) => api.delete(`/professionals/${id}`)
}

export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`)
}

export default api

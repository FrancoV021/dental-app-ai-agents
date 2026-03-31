import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import UsersList from './pages/admin/UsersList'
import PatientsList from './pages/admin/PatientsList'
import ProfessionalsList from './pages/admin/ProfessionalsList'
import AppointmentsList from './pages/admin/AppointmentsList'
import PatientDashboard from './pages/patient/PatientDashboard'
import CreateAppointment from './pages/patient/CreateAppointment'
import ProfessionalDashboard from './pages/professional/ProfessionalDashboard'
import TodayAppointments from './pages/professional/TodayAppointments'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      
      <Route path="/" element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="admin" element={<PrivateRoute requiredRole="ADMIN" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersList />} />
            <Route path="patients" element={<PatientsList />} />
            <Route path="professionals" element={<ProfessionalsList />} />
            <Route path="appointments" element={<AppointmentsList />} />
          </Route>
          
          <Route path="patient" element={<PrivateRoute requiredRole="PATIENT" />}>
            <Route index element={<PatientDashboard />} />
            <Route path="create-appointment" element={<CreateAppointment />} />
          </Route>
          
          <Route path="professional" element={<PrivateRoute requiredRole="PROFESSIONAL" />}>
            <Route index element={<ProfessionalDashboard />} />
            <Route path="today" element={<TodayAppointments />} />
          </Route>
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default App

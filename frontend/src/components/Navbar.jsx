import { useAuth } from '../hooks/useAuth'
import { Bell, User } from 'lucide-react'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">Dental App</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

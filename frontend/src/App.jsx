import { useState } from 'react'

import AppHeader from './components/layout/AppHeader'
import ServicesPage from './pages/ServicesPage'
import AppointmentsPage from './pages/AppointmentsPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [role, setRole] = useState('client')
  const [page, setPage] = useState('services')

  function handleRoleChange(newRole) {
    setRole(newRole)

    if (newRole === 'admin') {
      setPage('admin')
      return
    }

    setPage('services')
  }

  function handleNavigate(newPage) {
    setPage(newPage)
  }

  return (
    <div className="min-h-screen bg-app-bg text-text-main">
      <AppHeader
        role={role}
        currentPage={page}
        onNavigate={handleNavigate}
        onRoleChange={handleRoleChange}
      />

      <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
        {role === 'client' && page === 'services' && (
          <ServicesPage />
        )}

        {role === 'client' && page === 'appointments' && (
          <AppointmentsPage
            onBack={() => setPage('services')}
          />
        )}

        {role === 'admin' && (
          <AdminPage />
        )}
      </main>
    </div>
  )
}

export default App
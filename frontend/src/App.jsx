import { useState } from 'react'

import AppHeader from './components/layout/AppHeader'
import ServicesPage from './pages/ServicesPage'
import AppointmentsPage from './pages/AppointmentsPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [page, setPage] = useState('services')

  return (
    <div className="min-h-screen bg-app-bg text-text-main">
      <AppHeader
        currentPage={page}
        onNavigate={setPage}
      />

      <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
        {page === 'services' && (
          <ServicesPage />
        )}

        {page === 'appointments' && (
          <AppointmentsPage
            onBack={() => setPage('services')}
          />
        )}

        {page === 'admin' && (
          <AdminPage />
        )}
      </main>
    </div>
  )
}

export default App
import { useEffect, useState } from 'react'
import {
  getAppointments,
  updateAppointmentStatus,
} from '../services/appointmentApi'
import { getServices } from '../services/serviceApi'

import AdminServices from '../components/AdminServices'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'

import { formatDate } from '../utils/dateUtils'

function AdminPage() {
  const [appointments, setAppointments] =
    useState([])
  const [services, setServices] = useState([])
  const [section, setSection] =
    useState('appointments')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setError('')

      const [
        appointmentsData,
        servicesData,
      ] = await Promise.all([
        getAppointments(),
        getServices(),
      ])

      setAppointments(appointmentsData)
      setServices(servicesData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(
    id,
    status
  ) {
    try {
      setError('')

      await updateAppointmentStatus(
        id,
        status
      )

      await loadData()
    } catch (error) {
      setError(error.message)
    }
  }

  function getServiceName(serviceId) {
    const service = services.find(
      (service) =>
        service.id === serviceId
    )

    return service?.name || 'Servicio'
  }

  if (loading) {
    return (
      <p className="py-20 text-center text-text-secondary">
        Cargando administración...
      </p>
    )
  }

  return (
    <section>
      <PageHeader
        eyebrow="Administración"
        title="Panel de administración"
        description="Administra las reservas del negocio y gestiona el catálogo de servicios."
      />

      <AdminTabs
        activeSection={section}
        onChange={setSection}
      />

      {error && (
        <ErrorMessage message={error} />
      )}

      {section === 'appointments' && (
        <AppointmentsManagement
          appointments={appointments}
          getServiceName={getServiceName}
          onStatusChange={
            handleStatusChange
          }
        />
      )}

      {section === 'services' && (
        <AdminServices
          services={services}
          onReload={loadData}
        />
      )}
    </section>
  )
}

function AdminTabs({
  activeSection,
  onChange,
}) {
  const tabs = [
    {
      id: 'appointments',
      label: 'Turnos',
    },
    {
      id: 'services',
      label: 'Servicios',
    },
  ]

  return (
    <div className="mb-9 border-b border-border">
      <div className="flex gap-8">
        {tabs.map((tab) => {
          const active =
            activeSection === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                onChange(tab.id)
              }
              className={`
                relative pb-4 text-sm
                font-medium transition
                ${
                  active
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-main'
                }
              `}
            >
              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function AppointmentsManagement({
  appointments,
  getServiceName,
  onStatusChange,
}) {
  if (appointments.length === 0) {
    return (
      <Card className="p-12 text-center">
        <h2 className="text-lg font-semibold">
          No hay turnos registrados
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          Los nuevos turnos aparecerán aquí.
        </p>
      </Card>
    )
  }

  return (
    <>
      <AppointmentsTable
        appointments={appointments}
        getServiceName={getServiceName}
        onStatusChange={onStatusChange}
      />

      <AppointmentsMobile
        appointments={appointments}
        getServiceName={getServiceName}
        onStatusChange={onStatusChange}
      />
    </>
  )
}

function AppointmentsTable({
  appointments,
  getServiceName,
  onStatusChange,
}) {
  return (
    <Card className="hidden overflow-hidden md:block">
      <table className="w-full text-left">
        <thead className="border-b border-border bg-surface-soft">
          <tr>
            <TableHeader>
              Servicio
            </TableHeader>

            <TableHeader>
              Fecha
            </TableHeader>

            <TableHeader>
              Hora
            </TableHeader>

            <TableHeader>
              Estado
            </TableHeader>

            <TableHeader alignRight>
              Acciones
            </TableHeader>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {appointments.map(
            (appointment) => (
              <tr
                key={appointment.id}
                className="transition hover:bg-surface-soft"
              >
                <td className="px-6 py-5 font-medium">
                  {getServiceName(
                    appointment.serviceId
                  )}
                </td>

                <td className="px-6 py-5 text-sm text-text-secondary">
                  {formatDate(
                    appointment.date
                  )}
                </td>

                <td className="px-6 py-5 text-sm text-text-secondary">
                  {appointment.startTime.substring(
                    0,
                    5
                  )}{' '}
                  hs
                </td>

                <td className="px-6 py-5">
                  <StatusBadge
                    status={
                      appointment.status
                    }
                  />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end">
                    <AppointmentActions
                      appointment={
                        appointment
                      }
                      onChange={
                        onStatusChange
                      }
                    />
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  )
}

function AppointmentsMobile({
  appointments,
  getServiceName,
  onStatusChange,
}) {
  return (
    <div className="space-y-4 md:hidden">
      {appointments.map(
        (appointment) => (
          <Card
            key={appointment.id}
            className="p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">
                  {getServiceName(
                    appointment.serviceId
                  )}
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  {formatDate(
                    appointment.date
                  )}
                </p>
              </div>

              <StatusBadge
                status={appointment.status}
              />
            </div>

            <div className="mt-4 rounded-xl bg-surface-soft px-4 py-3">
              <p className="text-xs text-text-muted">
                Horario
              </p>

              <p className="mt-1 font-semibold">
                {appointment.startTime.substring(
                  0,
                  5
                )}{' '}
                hs
              </p>
            </div>

            <div className="mt-4">
              <AppointmentActions
                appointment={appointment}
                onChange={onStatusChange}
              />
            </div>
          </Card>
        )
      )}
    </div>
  )
}

function AppointmentActions({
  appointment,
  onChange,
}) {
  if (appointment.status === 'PENDING') {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() =>
            onChange(
              appointment.id,
              'CONFIRMED'
            )
          }
        >
          Confirmar
        </Button>

        <Button
          size="sm"
          variant="danger"
          onClick={() =>
            onChange(
              appointment.id,
              'CANCELLED'
            )
          }
        >
          Cancelar
        </Button>
      </div>
    )
  }

  if (
    appointment.status === 'CONFIRMED'
  ) {
    return (
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          onChange(
            appointment.id,
            'COMPLETED'
          )
        }
      >
        Completar
      </Button>
    )
  }

  return (
    <span className="text-xs text-text-muted">
      Sin acciones
    </span>
  )
}

function TableHeader({
  children,
  alignRight = false,
}) {
  return (
    <th
      className={`
        px-6 py-5 text-xs
        font-semibold uppercase
        tracking-wide text-text-secondary
        ${alignRight ? 'text-right' : ''}
      `}
    >
      {children}
    </th>
  )
}

function ErrorMessage({ message }) {
  return (
    <div className="mb-6 rounded-xl border border-danger-border bg-danger-bg p-4 text-sm text-danger">
      {message}
    </div>
  )
}

export default AdminPage
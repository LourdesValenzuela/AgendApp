import { useEffect, useState } from 'react'
import {
  getAppointments,
  cancelAppointment,
} from '../services/appointmentApi'
import { getServices } from '../services/serviceApi'

import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'

import { formatGuarani } from '../utils/currencyUtils'
import { formatLongDate } from '../utils/dateUtils'

function AppointmentsPage({ onBack }) {
  const [appointments, setAppointments] = useState([])
  const [services, setServices] = useState([])
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

      const clientAppointments =
        appointmentsData.filter(
          (appointment) =>
            appointment.clientId === 1
        )

      setAppointments(clientAppointments)
      setServices(servicesData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel(id) {
    const confirmed = window.confirm(
      '¿Seguro que deseas cancelar este turno?'
    )

    if (!confirmed) {
      return
    }

    try {
      setError('')

      await cancelAppointment(id)
      await loadData()
    } catch (error) {
      setError(error.message)
    }
  }

  function findService(serviceId) {
    return services.find(
      (service) =>
        service.id === serviceId
    )
  }

  if (loading) {
    return (
      <p className="py-20 text-center text-text-secondary">
        Cargando turnos...
      </p>
    )
  }

  return (
    <section>
      <PageHeader
        eyebrow="Tus reservas"
        title="Mis turnos"
        description="Consulta el estado de tus reservas y administra tus próximos turnos."
      />

      {error && (
        <div className="mb-6 rounded-xl border border-danger-border bg-danger-bg p-4 text-sm text-danger">
          {error}
        </div>
      )}

      {appointments.length === 0 ? (
        <EmptyAppointments onBack={onBack} />
      ) : (
        <div className="max-w-5xl space-y-5">
          {appointments.map(
            (appointment) => {
              const service =
                findService(
                  appointment.serviceId
                )

              return (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  service={service}
                  onCancel={handleCancel}
                />
              )
            }
          )}
        </div>
      )}
    </section>
  )
}

function AppointmentCard({
  appointment,
  service,
  onCancel,
}) {
  const canCancel =
    appointment.status === 'PENDING' ||
    appointment.status === 'CONFIRMED'

  return (
    <Card className="p-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold">
              {service?.name || 'Servicio'}
            </h2>

            <StatusBadge
              status={appointment.status}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-text-secondary">
            <span>
              {formatLongDate(
                appointment.date
              )}
            </span>

            <span>
              {appointment.startTime.substring(
                0,
                5
              )}{' '}
              hs
            </span>

            {service && (
              <strong className="text-text-main">
                {formatGuarani(
                  service.price
                )}
              </strong>
            )}
          </div>
        </div>

        {canCancel && (
          <Button
            variant="danger"
            onClick={() =>
              onCancel(appointment.id)
            }
          >
            Cancelar turno
          </Button>
        )}
      </div>
    </Card>
  )
}

function EmptyAppointments({ onBack }) {
  return (
    <Card className="p-12 text-center">
      <h2 className="text-xl font-semibold">
        Todavía no tienes turnos
      </h2>

      <p className="mt-2 text-sm text-text-secondary">
        Explora nuestros servicios y reserva tu próximo turno.
      </p>

      <Button
        size="lg"
        className="mt-6"
        onClick={onBack}
      >
        Explorar servicios
      </Button>
    </Card>
  )
}

export default AppointmentsPage
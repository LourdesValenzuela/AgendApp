import { useEffect, useState } from 'react'
import { getServices } from '../services/serviceApi'
import BookingForm from '../components/BookingForm'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { formatGuarani } from '../utils/currencyUtils'

function ServicesPage() {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    try {
      setError('')

      const data = await getServices()

      setServices(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (selectedService) {
    return (
      <BookingForm
        service={selectedService}
        onCancel={() => setSelectedService(null)}
      />
    )
  }

  return (
    <section>
      <PageHeader
        eyebrow="Bienvenido a tu espacio"
        title="Reserva tu próximo turno"
        description="Explora nuestros servicios y encuentra el horario que mejor se adapte a ti."
      />

      {loading && (
        <EmptyState message="Cargando servicios..." />
      )}

      {!loading && error && (
        <ErrorMessage message={error} />
      )}

      {!loading &&
        !error &&
        services.length === 0 && (
          <EmptyState message="No hay servicios disponibles." />
        )}

      {!loading &&
        !error &&
        services.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onReserve={() =>
                  setSelectedService(service)
                }
              />
            ))}
          </div>
        )}
    </section>
  )
}

function ServiceCard({
  service,
  onReserve,
}) {
  return (
    <Card hover className="overflow-hidden">
      <div className="h-48 bg-primary-soft" />

      <div className="flex min-h-[270px] flex-col p-6">
        <h2 className="text-xl font-semibold">
          {service.name}
        </h2>

        <p className="mt-3 flex-1 text-sm leading-6 text-text-secondary">
          {service.description ||
            'Servicio disponible para reserva.'}
        </p>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <span className="text-xs text-text-muted">
              Precio
            </span>

            <p className="mt-1 text-xl font-bold">
              {formatGuarani(service.price)}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-text-muted">
              Duración
            </span>

            <p className="mt-1 text-sm font-medium">
              {service.duration} min
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="mt-6 w-full"
          onClick={onReserve}
        >
          Reservar turno
        </Button>
      </div>
    </Card>
  )
}

function EmptyState({ message }) {
  return (
    <Card className="p-12 text-center">
      <p className="text-sm text-text-secondary">
        {message}
      </p>
    </Card>
  )
}

function ErrorMessage({ message }) {
  return (
    <div className="rounded-xl border border-danger-border bg-danger-bg p-4 text-sm text-danger">
      {message}
    </div>
  )
}

export default ServicesPage
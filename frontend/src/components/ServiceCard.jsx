import Card from './ui/Card'
import Button from './ui/Button'
import { formatGuarani } from '../utils/currencyUtils'

function ServiceCard({
  service,
  onReserve,
}) {
  return (
    <Card
      hover
      className="group overflow-hidden"
    >
      <ServiceImage
        imageUrl={service.imageUrl}
        name={service.name}
      />

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

function ServiceImage({
  imageUrl,
  name,
}) {
  if (!imageUrl) {
    return (
      <div className="flex h-56 items-center justify-center bg-primary-soft">
        <div className="text-center">
          <ImagePlaceholderIcon />

          <p className="mt-2 text-xs font-medium text-primary">
            Imagen no disponible
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-56 overflow-hidden bg-primary-soft">
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    </div>
  )
}

function ImagePlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="mx-auto h-8 w-8 text-primary"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />

      <circle
        cx="8.5"
        cy="9"
        r="1.5"
      />

      <path d="m4 17 4.5-4.5 3.5 3 2.5-2.5 5.5 5" />
    </svg>
  )
}

export default ServiceCard
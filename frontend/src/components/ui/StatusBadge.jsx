const STATUS_CONFIG = {
  PENDING: {
    label: 'Pendiente',
    styles:
      'border-warning-border bg-warning-bg text-warning',
  },

  CONFIRMED: {
    label: 'Confirmado',
    styles:
      'border-success-border bg-success-bg text-success',
  },

  COMPLETED: {
    label: 'Completado',
    styles:
      'border-neutral-border bg-neutral-bg text-neutral-text',
  },

  CANCELLED: {
    label: 'Cancelado',
    styles:
      'border-danger-border bg-danger-bg text-danger',
  },
}

function StatusBadge({ status }) {
  const config =
    STATUS_CONFIG[status] ?? {
      label: status,
      styles:
        'border-neutral-border bg-neutral-bg text-neutral-text',
    }

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        ${config.styles}
      `}
    >
      {config.label}
    </span>
  )
}

export default StatusBadge
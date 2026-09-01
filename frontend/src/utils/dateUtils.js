export function formatDate(date) {
  if (!date) {
    return ''
  }

  return new Intl.DateTimeFormat('es-PY', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(
    new Date(`${date}T12:00:00`)
  )
}

export function formatLongDate(date) {
  if (!date) {
    return ''
  }

  return new Intl.DateTimeFormat('es-PY', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(
    new Date(`${date}T12:00:00`)
  )
}

export function getToday() {
  return new Date().toLocaleDateString('en-CA')
}
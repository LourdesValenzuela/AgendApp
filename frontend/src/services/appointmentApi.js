import { fetchWithRetry } from './fetchWithRetry'

const API_URL = `${import.meta.env.VITE_API_URL}/api/appointments`

export async function createAppointment(appointment) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointment),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'No se pudo crear el turno')
  }

  return response.json()
}

export async function getAppointments() {
  const response = await fetchWithRetry(API_URL)

  if (!response.ok) {
    throw new Error('No se pudieron obtener los turnos')
  }

  return response.json()
}

export async function cancelAppointment(id) {
  return updateAppointmentStatus(id, 'CANCELLED')
}

export async function getOccupiedAppointments(serviceId, date) {
  const response = await fetchWithRetry(
    `${API_URL}/availability?serviceId=${serviceId}&date=${date}`
  )

  if (!response.ok) {
    throw new Error('No se pudieron obtener los horarios disponibles')
  }

  return response.json()
}

export async function updateAppointmentStatus(id, status) {
  const response = await fetch(
    `${API_URL}/${id}/status?status=${status}`,
    {
      method: 'PATCH',
    }
  )

  if (!response.ok) {
    const message = await response.text()

    throw new Error(
      message || 'No se pudo actualizar el estado del turno'
    )
  }

  return response.json()
}
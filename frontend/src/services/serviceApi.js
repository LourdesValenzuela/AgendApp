const API_URL = `${import.meta.env.VITE_API_URL}/api/services`

export async function getServices() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('No se pudieron obtener los servicios')
  }

  return response.json()
}

export async function createService(service) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'No se pudo crear el servicio')
  }

  return response.json()
}

export async function updateService(id, service) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'No se pudo actualizar el servicio')
  }

  return response.json()
}

export async function deleteService(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'No se pudo eliminar el servicio')
  }
}
export async function fetchWithRetry(
  url,
  options = {},
  retries = 6,
  delay = 10000
) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options)

      // Errores temporales típicos mientras Render inicia.
      if (
        response.status !== 502 &&
        response.status !== 503 &&
        response.status !== 504
      ) {
        return response
      }

      if (attempt === retries) {
        return response
      }
    } catch (error) {
      if (attempt === retries) {
        throw error
      }
    }

    await new Promise((resolve) => setTimeout(resolve, delay))
  }
}
import { supabase } from '../config/supabase'

const BUCKET_NAME = 'service-images'

export async function uploadServiceImage(file) {
  if (!file) {
    throw new Error('Debes seleccionar una imagen')
  }

  const extension = file.name
    .split('.')
    .pop()
    ?.toLowerCase()

  const fileName = `${crypto.randomUUID()}.${extension}`
  const filePath = `services/${fileName}`

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(
      `No se pudo subir la imagen: ${error.message}`,
    )
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return data.publicUrl
}
import { useEffect, useState } from 'react'
import {
  createService,
  updateService,
  deleteService,
} from '../services/serviceApi'
import {
  uploadServiceImage,
} from '../services/storageService'

import Button from './ui/Button'
import Card from './ui/Card'
import FormField from './ui/FormField'

import { formatGuarani } from '../utils/currencyUtils'

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  duration: '',
  imageUrl: '',
}

const INPUT_STYLES =
  'w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary-soft'

function AdminServices({
  services,
  onReload,
}) {
  const [form, setForm] =
    useState(EMPTY_FORM)

  const [editingId, setEditingId] =
    useState(null)

  const [imageFile, setImageFile] =
    useState(null)

  const [imagePreview, setImagePreview] =
    useState('')

  const [error, setError] = useState('')
  const [message, setMessage] =
    useState('')

  const [saving, setSaving] =
    useState(false)

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith('blob:')
      ) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setError(
        'El archivo seleccionado debe ser una imagen.'
      )
      return
    }

    setImageFile(file)
    setImagePreview(
      URL.createObjectURL(file)
    )

    clearFeedback()
  }

  function handleEdit(service) {
    setEditingId(service.id)

    setForm({
      name: service.name,
      description:
        service.description ?? '',
      price: service.price,
      duration: service.duration,
      imageUrl: service.imageUrl ?? '',
    })

    setImageFile(null)
    setImagePreview(
      service.imageUrl ?? ''
    )

    clearFeedback()
  }

  function resetForm() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImageFile(null)
    setImagePreview('')
    setError('')
  }

  function clearFeedback() {
    setError('')
    setMessage('')
  }

  function buildServiceData(imageUrl) {
    return {
      businessId: 1,
      name: form.name.trim(),
      description:
        form.description.trim(),
      price: Number(form.price),
      duration: Number(form.duration),
      imageUrl,
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSaving(true)
      clearFeedback()

      let imageUrl = form.imageUrl

      if (imageFile) {
        imageUrl =
          await uploadServiceImage(
            imageFile
          )
      }

      const serviceData =
        buildServiceData(imageUrl)

      if (editingId) {
        await updateService(
          editingId,
          serviceData
        )

        setMessage(
          'Servicio actualizado correctamente.'
        )
      } else {
        await createService(serviceData)

        setMessage(
          'Servicio creado correctamente.'
        )
      }

      setEditingId(null)
      setForm(EMPTY_FORM)
      setImageFile(null)
      setImagePreview('')

      await onReload()
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(service) {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${service.name}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      clearFeedback()

      await deleteService(service.id)

      if (editingId === service.id) {
        resetForm()
      }

      setMessage(
        'Servicio eliminado correctamente.'
      )

      await onReload()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Gestión de servicios
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          Administra los servicios disponibles
          para los clientes.
        </p>
      </div>

      <Feedback
        error={error}
        message={message}
      />

      <div className="grid items-start gap-8 xl:grid-cols-[1fr_460px]">
        <ServiceList
          services={services}
          editingId={editingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ServiceForm
          form={form}
          editingId={editingId}
          saving={saving}
          imagePreview={imagePreview}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      </div>
    </section>
  )
}

function ServiceList({
  services,
  editingId,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="p-5 sm:p-7">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Servicios existentes
        </h3>

        <p className="mt-1 text-sm text-text-secondary">
          {services.length}{' '}
          {services.length === 1
            ? 'servicio registrado'
            : 'servicios registrados'}
        </p>
      </div>

      {services.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border-strong py-12 text-center">
          <p className="text-sm text-text-muted">
            No hay servicios registrados.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              editing={
                editingId === service.id
              }
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </Card>
  )
}

function ServiceItem({
  service,
  editing,
  onEdit,
  onDelete,
}) {
  return (
    <article
      className={`
        rounded-2xl border p-4 transition
        ${
          editing
            ? 'border-primary bg-surface-soft'
            : 'border-border bg-surface hover:border-border-strong'
        }
      `}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ServiceThumbnail
          imageUrl={service.imageUrl}
          name={service.name}
        />

        <div className="min-w-0 flex-1">
          <h4 className="font-semibold">
            {service.name}
          </h4>

          {service.description && (
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-secondary">
              {service.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-5 text-sm">
            <span className="text-text-secondary">
              {service.duration} min
            </span>

            <strong className="text-primary">
              {formatGuarani(
                service.price
              )}
            </strong>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onEdit(service)
            }
          >
            Editar
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() =>
              onDelete(service)
            }
          >
            Eliminar
          </Button>
        </div>
      </div>
    </article>
  )
}

function ServiceThumbnail({
  imageUrl,
  name,
}) {
  if (!imageUrl) {
    return (
      <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xs font-medium text-primary sm:w-24">
        Sin imagen
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className="h-20 w-full shrink-0 rounded-xl object-cover sm:w-24"
    />
  )
}

function ServiceForm({
  form,
  editingId,
  saving,
  imagePreview,
  onChange,
  onImageChange,
  onSubmit,
  onCancel,
}) {
  return (
    <Card className="p-6 sm:p-7 xl:sticky xl:top-28">
      <form onSubmit={onSubmit}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {editingId
            ? 'Edición'
            : 'Nuevo servicio'}
        </p>

        <h3 className="mt-2 text-2xl font-semibold">
          {editingId
            ? 'Editar servicio'
            : 'Crear servicio'}
        </h3>

        <p className="mt-2 text-sm text-text-secondary">
          {editingId
            ? 'Modifica los datos del servicio seleccionado.'
            : 'Completa los datos del nuevo servicio.'}
        </p>

        <div className="mt-7 space-y-5">
          <FormField
            label="Imagen"
            htmlFor="service-image"
            hint="JPG, PNG o WebP"
          >
            <ImageSelector
              imagePreview={imagePreview}
              onChange={onImageChange}
            />
          </FormField>

          <FormField
            label="Nombre del servicio"
            htmlFor="service-name"
          >
            <input
              id="service-name"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              placeholder="Ej. Corte de cabello"
              className={INPUT_STYLES}
            />
          </FormField>

          <FormField
            label="Descripción"
            htmlFor="service-description"
          >
            <textarea
              id="service-description"
              name="description"
              value={form.description}
              onChange={onChange}
              rows="4"
              placeholder="Describe brevemente el servicio"
              className={`${INPUT_STYLES} resize-none`}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="Precio (₲)"
              htmlFor="service-price"
            >
              <input
                id="service-price"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={onChange}
                required
                placeholder="65000"
                className={INPUT_STYLES}
              />
            </FormField>

            <FormField
              label="Duración (min)"
              htmlFor="service-duration"
            >
              <input
                id="service-duration"
                name="duration"
                type="number"
                min="1"
                value={form.duration}
                onChange={onChange}
                required
                placeholder="60"
                className={INPUT_STYLES}
              />
            </FormField>
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          {editingId && (
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={onCancel}
            >
              Cancelar edición
            </Button>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={saving}
            className="flex-1"
          >
            {saving
              ? 'Guardando...'
              : editingId
                ? 'Guardar cambios'
                : 'Crear servicio'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

function ImageSelector({
  imagePreview,
  onChange,
}) {
  return (
    <div>
      {imagePreview ? (
        <div className="mb-3 overflow-hidden rounded-2xl border border-border">
          <img
            src={imagePreview}
            alt="Vista previa del servicio"
            className="h-48 w-full object-cover"
          />
        </div>
      ) : (
        <div className="mb-3 flex h-36 items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface-soft">
          <div className="text-center">
            <p className="text-sm font-medium text-text-secondary">
              Sin imagen seleccionada
            </p>

            <p className="mt-1 text-xs text-text-muted">
              Agrega una foto representativa
              del servicio
            </p>
          </div>
        </div>
      )}

      <input
        id="service-image"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onChange}
        className="block w-full text-sm text-text-secondary file:mr-4 file:rounded-lg file:border-0 file:bg-primary-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-surface-hover"
      />
    </div>
  )
}

function Feedback({
  error,
  message,
}) {
  if (error) {
    return (
      <div className="mb-6 rounded-xl border border-danger-border bg-danger-bg p-4 text-sm text-danger">
        {error}
      </div>
    )
  }

  if (message) {
    return (
      <div className="mb-6 rounded-xl border border-success-border bg-success-bg p-4 text-sm text-success">
        ✓ {message}
      </div>
    )
  }

  return null
}

export default AdminServices
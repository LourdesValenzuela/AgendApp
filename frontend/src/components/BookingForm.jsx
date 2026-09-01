import { useEffect, useState } from 'react'
import {
  createAppointment,
  getOccupiedAppointments,
} from '../services/appointmentApi'

import Button from './ui/Button'
import Card from './ui/Card'

import { formatGuarani } from '../utils/currencyUtils'
import {
  formatDate,
  getToday,
} from '../utils/dateUtils'

const AVAILABLE_TIMES = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

function BookingForm({ service, onCancel }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [occupiedTimes, setOccupiedTimes] = useState([])
  const [loadingTimes, setLoadingTimes] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!date) {
      setOccupiedTimes([])
      return
    }

    loadOccupiedTimes()
  }, [date])

  async function loadOccupiedTimes() {
    try {
      setLoadingTimes(true)
      setError('')

      const appointments = await getOccupiedAppointments(
        service.id,
        date
      )

      const times = appointments.map((appointment) =>
        appointment.startTime.substring(0, 5)
      )

      setOccupiedTimes(times)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoadingTimes(false)
    }
  }

  function calculateEndTime(startTime) {
    const [hours, minutes] = startTime
      .split(':')
      .map(Number)

    const totalMinutes =
      hours * 60 +
      minutes +
      service.duration

    const endHours =
      Math.floor(totalMinutes / 60) % 24

    const endMinutes =
      totalMinutes % 60

    return `${String(endHours).padStart(2, '0')}:${String(
      endMinutes
    ).padStart(2, '0')}`
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setError('')

    if (!date || !time) {
      setError(
        'Selecciona una fecha y un horario.'
      )
      return
    }

    const appointment = {
      clientId: 1,
      serviceId: service.id,
      date,
      startTime: time,
      endTime: calculateEndTime(time),
    }

    try {
      setSaving(true)

      await createAppointment(appointment)

      setMessage(
        'Turno reservado correctamente.'
      )
      setTime('')

      await loadOccupiedTimes()
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  function handleDateChange(event) {
    setDate(event.target.value)
    setTime('')
    setMessage('')
  }

  function handleTimeChange(selectedTime) {
    setTime(selectedTime)
    setMessage('')
  }

  return (
    <section>
      <Button
        variant="ghost"
        className="mb-8"
        onClick={onCancel}
      >
        ← Volver a servicios
      </Button>

      <BookingSteps
        hasDate={Boolean(date)}
        hasTime={Boolean(time)}
        completed={Boolean(message)}
      />

      <SelectedService service={service} />

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-2"
      >
        <DateSelection
          date={date}
          onChange={handleDateChange}
        />

        <TimeSelection
          date={date}
          time={time}
          occupiedTimes={occupiedTimes}
          loading={loadingTimes}
          saving={saving}
          error={error}
          message={message}
          onTimeChange={handleTimeChange}
        />
      </form>
    </section>
  )
}

function BookingSteps({
  hasDate,
  hasTime,
  completed,
}) {
  return (
    <Card className="mb-10 px-6 py-5">
      <div className="grid gap-4 sm:grid-cols-4">
        <Step
          number="1"
          label="Servicio"
          active
        />

        <Step
          number="2"
          label="Fecha"
          active={hasDate}
        />

        <Step
          number="3"
          label="Horario"
          active={hasTime}
        />

        <Step
          number="4"
          label="Confirmar"
          active={completed}
        />
      </div>
    </Card>
  )
}

function Step({ number, label, active }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          flex h-8 w-8 items-center justify-center
          rounded-full text-xs font-semibold
          ${
            active
              ? 'bg-primary text-white'
              : 'border border-border-strong bg-surface text-text-muted'
          }
        `}
      >
        {number}
      </div>

      <span
        className={
          active
            ? 'text-sm font-medium text-text-main'
            : 'text-sm font-medium text-text-muted'
        }
      >
        {label}
      </span>
    </div>
  )
}

function SelectedService({ service }) {
  return (
    <Card className="mb-10 p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Servicio seleccionado
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {service.name}
          </h1>

          <p className="mt-3 leading-7 text-text-secondary">
            {service.description}
          </p>
        </div>

        <div className="flex gap-8 border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <ServiceDetail
            label="Duración"
            value={`${service.duration} min`}
          />

          <ServiceDetail
            label="Precio"
            value={formatGuarani(service.price)}
            highlight
          />
        </div>
      </div>
    </Card>
  )
}

function ServiceDetail({
  label,
  value,
  highlight = false,
}) {
  return (
    <div>
      <p className="text-xs text-text-muted">
        {label}
      </p>

      <p
        className={`mt-1 font-semibold ${
          highlight
            ? 'text-xl text-primary'
            : ''
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function DateSelection({ date, onChange }) {
  return (
    <Card className="p-6 sm:p-8">
      <SectionHeader
        step="Paso 1"
        title="Elige una fecha"
        description="Selecciona el día para consultar los horarios disponibles."
      />

      <label
        htmlFor="appointment-date"
        className="mb-2 block text-sm font-medium"
      >
        Fecha
      </label>

      <input
        id="appointment-date"
        type="date"
        min={getToday()}
        value={date}
        onChange={onChange}
        className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-soft"
      />

      {!date && (
        <div className="mt-6 rounded-xl bg-surface-soft p-4 text-sm leading-6 text-text-secondary">
          Selecciona una fecha para ver los
          horarios disponibles.
        </div>
      )}
    </Card>
  )
}

function TimeSelection({
  date,
  time,
  occupiedTimes,
  loading,
  saving,
  error,
  message,
  onTimeChange,
}) {
  return (
    <Card className="p-6 sm:p-8">
      <SectionHeader
        step="Paso 2"
        title="Horarios disponibles"
        description="Elige el horario que mejor se adapte a ti."
      />

      {!date ? (
        <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-border-strong text-sm text-text-muted">
          Primero selecciona una fecha
        </div>
      ) : loading ? (
        <div className="flex min-h-[180px] items-center justify-center text-sm text-text-secondary">
          Cargando horarios...
        </div>
      ) : (
        <TimeGrid
          selectedTime={time}
          occupiedTimes={occupiedTimes}
          onSelect={onTimeChange}
        />
      )}

      {date && time && (
        <div className="mt-7 border-t border-border pt-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-text-secondary">
              Turno seleccionado
            </span>

            <strong>
              {formatDate(date)} · {time}
            </strong>
          </div>
        </div>
      )}

      {error && (
        <FeedbackMessage
          type="error"
          message={error}
        />
      )}

      {message && (
        <FeedbackMessage
          type="success"
          message={`✓ ${message}`}
        />
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!date || !time || saving}
        className="mt-7 w-full"
      >
        {saving
          ? 'Reservando...'
          : 'Confirmar reserva'}
      </Button>
    </Card>
  )
}

function TimeGrid({
  selectedTime,
  occupiedTimes,
  onSelect,
}) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {AVAILABLE_TIMES.map(
        (availableTime) => {
          const occupied =
            occupiedTimes.includes(availableTime)

          const selected =
            selectedTime === availableTime

          return (
            <button
              key={availableTime}
              type="button"
              disabled={occupied}
              onClick={() =>
                onSelect(availableTime)
              }
              className={`
                rounded-xl border px-3 py-3
                text-sm font-medium transition
                ${
                  occupied
                    ? 'cursor-not-allowed border-border bg-surface-soft text-text-muted opacity-50 line-through'
                    : selected
                      ? 'border-primary bg-primary text-white'
                      : 'border-border-strong bg-surface text-text-main hover:border-primary hover:text-primary'
                }
              `}
            >
              {availableTime}
            </button>
          )
        }
      )}
    </div>
  )
}

function SectionHeader({
  step,
  title,
  description,
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {step}
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-sm text-text-secondary">
        {description}
      </p>
    </div>
  )
}

function FeedbackMessage({
  type,
  message,
}) {
  const styles =
    type === 'success'
      ? 'border-success-border bg-success-bg text-success'
      : 'border-danger-border bg-danger-bg text-danger'

  return (
    <div
      className={`mt-5 rounded-xl border p-4 text-sm ${styles}`}
    >
      {message}
    </div>
  )
}

export default BookingForm
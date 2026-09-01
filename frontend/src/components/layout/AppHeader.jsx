import { useEffect, useRef, useState } from 'react'

const CLIENT_NAVIGATION = [
  { id: 'services', label: 'Servicios' },
  { id: 'appointments', label: 'Mis turnos' },
]

function AppHeader({
  role,
  currentPage,
  onNavigate,
  onRoleChange,
}) {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false)
  const roleMenuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        roleMenuRef.current &&
        !roleMenuRef.current.contains(event.target)
      ) {
        setRoleMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
    }
  }, [])

  const navigation =
    role === 'client'
      ? CLIENT_NAVIGATION
      : []

  function handleLogoClick() {
    if (role === 'admin') {
      onNavigate('admin')
      return
    }

    onNavigate('services')
  }

  function handleRoleSelect(newRole) {
    onRoleChange(newRole)
    setRoleMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-3 py-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <CalendarIcon />
          </div>

          <span className="text-xl font-bold tracking-tight text-text-main sm:text-2xl">
            AgendApp
          </span>
        </button>

        {navigation.length > 0 && (
          <nav className="hidden self-stretch md:flex">
            {navigation.map((item) => (
              <NavigationItem
                key={item.id}
                label={item.label}
                active={currentPage === item.id}
                onClick={() => onNavigate(item.id)}
              />
            ))}
          </nav>
        )}

        {role === 'admin' && (
          <div className="hidden text-sm font-medium text-text-secondary md:block">
            Panel de administración
          </div>
        )}

        <div
          ref={roleMenuRef}
          className="relative"
        >
          <RoleSelector
            role={role}
            open={roleMenuOpen}
            onToggle={() =>
              setRoleMenuOpen((current) => !current)
            }
          />

          {roleMenuOpen && (
            <RoleMenu
              role={role}
              onSelect={handleRoleSelect}
            />
          )}
        </div>
      </div>

      {navigation.length > 0 && (
        <div className="flex border-t border-border md:hidden">
          {navigation.map((item) => (
            <NavigationItem
              key={item.id}
              label={item.label}
              active={currentPage === item.id}
              onClick={() => onNavigate(item.id)}
              mobile
            />
          ))}
        </div>
      )}

      {role === 'admin' && (
        <div className="border-t border-border px-5 py-3 text-center text-xs font-medium text-text-secondary md:hidden">
          Panel de administración
        </div>
      )}
    </header>
  )
}

function RoleSelector({
  role,
  open,
  onToggle,
}) {
  const isAdmin = role === 'admin'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 transition hover:bg-surface-soft sm:gap-3 sm:px-4"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary">
        {isAdmin ? (
          <AdminIcon />
        ) : (
          <UserIcon />
        )}
      </div>

      <div className="hidden text-left sm:block">
        <p className="text-[11px] leading-none text-text-muted">
          Vista
        </p>

        <p className="mt-1 text-sm font-semibold text-text-main">
          {isAdmin
            ? 'Administración'
            : 'Cliente'}
        </p>
      </div>

      <ChevronIcon open={open} />
    </button>
  )
}

function RoleMenu({
  role,
  onSelect,
}) {
  return (
    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-lg">
      <RoleOption
        title="Cliente"
        description="Reservar y consultar turnos"
        icon={<UserIcon />}
        active={role === 'client'}
        onClick={() => onSelect('client')}
      />

      <RoleOption
        title="Administración"
        description="Gestionar turnos y servicios"
        icon={<AdminIcon />}
        active={role === 'admin'}
        onClick={() => onSelect('admin')}
      />
    </div>
  )
}

function RoleOption({
  title,
  description,
  icon,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-xl p-3 text-left transition
        ${
          active
            ? 'bg-primary-soft'
            : 'hover:bg-surface-soft'
        }
      `}
    >
      <div
        className={`
          flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
          ${
            active
              ? 'bg-primary text-white'
              : 'bg-surface-soft text-text-secondary'
          }
        `}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-text-main">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-text-muted">
          {description}
        </p>
      </div>

      {active && (
        <CheckIcon />
      )}
    </button>
  )
}

function NavigationItem({
  label,
  active,
  onClick,
  mobile = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative font-medium transition
        ${
          mobile
            ? 'flex-1 px-3 py-3 text-xs sm:text-sm'
            : 'px-5 text-sm'
        }
        ${
          active
            ? 'text-primary'
            : 'text-text-secondary hover:text-text-main'
        }
      `}
    >
      {label}

      {active && (
        <span
          className={`
            absolute bottom-0 h-[2px] rounded-full bg-primary
            ${
              mobile
                ? 'left-1/2 w-10 -translate-x-1/2'
                : 'left-5 right-5'
            }
          `}
        />
      )}
    </button>
  )
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="4"
        rx="2"
      />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}

function AdminIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
      <path d="M8 14h3" />
      <path d="M8 17h6" />
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-text-muted transition-transform ${
        open ? 'rotate-180' : ''
      }`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

export default AppHeader
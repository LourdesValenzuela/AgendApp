function AppHeader({ currentPage, onNavigate }) {
  const navigation = [
    { id: 'services', label: 'Servicios' },
    { id: 'appointments', label: 'Mis turnos' },
    { id: 'admin', label: 'Administración' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => onNavigate('services')}
          className="flex items-center gap-3 py-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <CalendarIcon />
          </div>

          <span className="text-xl font-bold tracking-tight text-text-main sm:text-2xl">
            AgendApp
          </span>
        </button>

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

        <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary sm:flex">
          A
        </div>
      </div>

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
    </header>
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

export default AppHeader
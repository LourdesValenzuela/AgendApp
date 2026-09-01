function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover',

    secondary:
      'border border-border-strong bg-surface text-text-secondary hover:bg-surface-soft',

    danger:
      'border border-danger-border bg-surface text-danger hover:bg-danger-bg',

    ghost:
      'text-text-secondary hover:bg-surface-soft hover:text-text-main',
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-sm',
  }

  return (
    <button
      className={`
        rounded-xl
        font-semibold
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
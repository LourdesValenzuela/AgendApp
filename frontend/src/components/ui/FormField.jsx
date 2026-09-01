function FormField({
  label,
  htmlFor,
  children,
  hint,
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-text-main"
      >
        {label}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-xs text-text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

export default FormField
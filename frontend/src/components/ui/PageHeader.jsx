function PageHeader({
  eyebrow,
  title,
  description,
  className = '',
}) {
  return (
    <header className={`mb-10 max-w-3xl ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
      )}

      <h1 className="text-4xl font-bold tracking-[-0.03em] text-text-main sm:text-5xl">
        {title}
      </h1>

      {description && (
        <p className="mt-4 text-base leading-7 text-text-secondary">
          {description}
        </p>
      )}
    </header>
  )
}

export default PageHeader
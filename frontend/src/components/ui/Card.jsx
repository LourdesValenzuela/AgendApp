function Card({
  children,
  className = '',
  hover = false,
}) {
  return (
    <div
      className={`
        rounded-[22px]
        border
        border-border
        bg-surface
        shadow-[0_8px_30px_rgba(91,65,46,0.03)]
        ${hover
          ? 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(91,65,46,0.07)]'
          : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card
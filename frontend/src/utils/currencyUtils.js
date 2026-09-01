export function formatGuarani(value) {
  if (value === null || value === undefined) {
    return '₲ 0'
  }

  return `₲ ${Number(value).toLocaleString('es-PY')}`
}
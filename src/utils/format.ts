const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY

export function formatRelativeDate(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()

  if (diff < MINUTE) return 'Just now'
  if (diff < HOUR) {
    const mins = Math.floor(diff / MINUTE)
    return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`
  }
  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  }
  if (diff < WEEK) {
    const days = Math.floor(diff / DAY)
    return `Posted ${days} ${days === 1 ? 'day' : 'days'} ago`
  }

  return 'Posted over a week ago'
}

const currencyFormatters = new Map<string, Intl.NumberFormat>()

function getCurrencyFormatter(currency: string): Intl.NumberFormat {
  const cached = currencyFormatters.get(currency)
  if (cached) return cached

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  currencyFormatters.set(currency, formatter)
  return formatter
}

export function formatSalary(
  min: string | null,
  max: string | null,
  currency: string | null,
  unitText: string | null,
): string | null {
  if (!min && !max) return null
  if (!currency) return null

  const formatter = getCurrencyFormatter(currency)
  const suffix = unitText && unitText !== 'year' ? `/${unitText}` : ''

  if (min && max) {
    return `${formatter.format(Number(min))} - ${formatter.format(Number(max))}${suffix}`
  }

  const value = min ?? max
  return `${formatter.format(Number(value))}${suffix}`
}

const WORK_ARRANGEMENT_LABELS: Record<string, string> = {
  'on-site': 'On-site',
  hybrid: 'Hybrid',
  remote: 'Remote',
}

export function formatWorkArrangement(value: string | null): string | null {
  if (!value) return null
  return WORK_ARRANGEMENT_LABELS[value] ?? value
}

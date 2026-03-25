import type { IntlShape } from 'react-intl'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY

export function formatRelativeDate(intl: IntlShape, isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()

  if (diff < MINUTE) return intl.formatMessage({ id: 'time.justNow' })
  if (diff < HOUR) {
    const count = Math.floor(diff / MINUTE)
    return intl.formatMessage({ id: 'time.minutesAgo' }, { count })
  }
  if (diff < DAY) {
    const count = Math.floor(diff / HOUR)
    return intl.formatMessage({ id: 'time.hoursAgo' }, { count })
  }
  if (diff < WEEK) {
    const count = Math.floor(diff / DAY)
    return intl.formatMessage({ id: 'time.daysAgo' }, { count })
  }

  return intl.formatMessage({ id: 'time.overWeekAgo' })
}

const currencyFormatters = new Map<string, Intl.NumberFormat>()

function getCurrencyFormatter(locale: string, currency: string): Intl.NumberFormat {
  const key = `${locale}:${currency}`
  const cached = currencyFormatters.get(key)
  if (cached) return cached

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  currencyFormatters.set(key, formatter)
  return formatter
}

export function formatSalary(
  intl: IntlShape,
  min: string | null,
  max: string | null,
  currency: string | null,
  unitText: string | null,
): string | null {
  if (!min && !max) return null
  if (!currency) return null

  const formatter = getCurrencyFormatter(intl.locale, currency)
  const suffix = unitText && unitText !== 'year' ? `/${unitText}` : ''

  if (min && max) {
    return `${formatter.format(Number(min))} - ${formatter.format(Number(max))}${suffix}`
  }

  const value = min ?? max
  return `${formatter.format(Number(value))}${suffix}`
}

const WORK_ARRANGEMENT_IDS: Record<string, string> = {
  'on-site': 'workArrangement.on-site',
  hybrid: 'workArrangement.hybrid',
  remote: 'workArrangement.remote',
}

export function formatWorkArrangement(intl: IntlShape, value: string | null): string | null {
  if (!value) return null
  const messageId = WORK_ARRANGEMENT_IDS[value]
  if (messageId) return intl.formatMessage({ id: messageId })
  return value
}

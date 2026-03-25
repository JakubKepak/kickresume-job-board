import { describe, it, expect } from 'vitest'
import { formatRelativeDate, formatSalary, formatWorkArrangement } from './format'

describe('formatRelativeDate', () => {
  it('returns "Just now" for less than a minute ago', () => {
    const now = new Date().toISOString()
    expect(formatRelativeDate(now)).toBe('Just now')
  })

  it('returns minutes ago', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    expect(formatRelativeDate(fiveMinAgo)).toBe('5 minutes ago')
  })

  it('returns singular minute', () => {
    const oneMinAgo = new Date(Date.now() - 60 * 1000).toISOString()
    expect(formatRelativeDate(oneMinAgo)).toBe('1 minute ago')
  })

  it('returns hours ago', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(threeHoursAgo)).toBe('3 hours ago')
  })

  it('returns days ago', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(twoDaysAgo)).toBe('Posted 2 days ago')
  })

  it('returns singular day', () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(oneDayAgo)).toBe('Posted 1 day ago')
  })

  it('returns "Posted over a week ago" for more than 7 days', () => {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(twoWeeksAgo)).toBe('Posted over a week ago')
  })
})

describe('formatSalary', () => {
  it('formats a salary range', () => {
    expect(formatSalary('20000.00', '25000.00', 'USD', 'year')).toBe('$20,000 - $25,000')
  })

  it('formats hourly rate with suffix', () => {
    expect(formatSalary('16.00', '18.00', 'USD', 'hour')).toBe('$16 - $18/hour')
  })

  it('formats a single value when only min is provided', () => {
    expect(formatSalary('50000.00', null, 'USD', 'year')).toBe('$50,000')
  })

  it('formats a single value when only max is provided', () => {
    expect(formatSalary(null, '75000.00', 'USD', 'year')).toBe('$75,000')
  })

  it('returns null when both min and max are null', () => {
    expect(formatSalary(null, null, 'USD', 'year')).toBeNull()
  })

  it('returns null when currency is null', () => {
    expect(formatSalary('50000.00', '60000.00', null, 'year')).toBeNull()
  })

  it('formats non-USD currency', () => {
    const result = formatSalary('30000.00', '40000.00', 'EUR', 'year')
    expect(result).toContain('30,000')
    expect(result).toContain('40,000')
  })
})

describe('formatWorkArrangement', () => {
  it('maps "on-site" to "On-site"', () => {
    expect(formatWorkArrangement('on-site')).toBe('On-site')
  })

  it('maps "remote" to "Remote"', () => {
    expect(formatWorkArrangement('remote')).toBe('Remote')
  })

  it('maps "hybrid" to "Hybrid"', () => {
    expect(formatWorkArrangement('hybrid')).toBe('Hybrid')
  })

  it('returns null for null input', () => {
    expect(formatWorkArrangement(null)).toBeNull()
  })

  it('passes through unknown values', () => {
    expect(formatWorkArrangement('other')).toBe('other')
  })
})

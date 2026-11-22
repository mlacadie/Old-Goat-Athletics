/** A calendar day as `YYYY-MM-DD` in local time. Strings in this form sort in date order. */
export type DateKey = string

export function toDateKey(date: Date): DateKey {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** The first day of the month `offset` months after the one `dateKey` falls in. */
export function monthStart(dateKey: DateKey, offset: number): Date {
  const [year, month] = dateKey.split('-').map(Number)
  return new Date(year, month - 1 + offset, 1)
}

/** One square of a month grid: a day of the month, or a blank before the 1st or after the last day. */
export interface CalendarCell {
  key: string
  /** Null for a blank. */
  dateKey: DateKey | null
  day: number | null
}

/** The month starting at `start`, as weeks of 7 cells, Sunday first. */
export function monthWeeks(start: Date): CalendarCell[][] {
  const year = start.getFullYear()
  const month = start.getMonth()
  const leadingBlanks = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cellCount = Math.ceil((leadingBlanks + daysInMonth) / 7) * 7

  const cells: CalendarCell[] = Array.from({ length: cellCount }, (_, i) => {
    const day = i - leadingBlanks + 1
    if (day < 1 || day > daysInMonth) return { key: `blank-${i}`, dateKey: null, day: null }
    const dateKey = toDateKey(new Date(year, month, day))
    return { key: dateKey, dateKey, day }
  })
  return Array.from({ length: cellCount / 7 }, (_, week) => cells.slice(week * 7, week * 7 + 7))
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** "November 2026". Spelled out by hand so the server and the browser always agree. */
export function formatMonth(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}

/** Today where this code runs: the server's day on the server, the viewer's day in the browser. */
export function todayKey(): DateKey {
  return toDateKey(new Date())
}

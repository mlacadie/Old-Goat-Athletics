import type { ReactNode } from 'react'
import { MAX_GROUP_LINKS } from '../data/groups'
import { isCountry, REGIONS } from '../data/places'
import { isSport } from '../data/sports'
import type { GroupLink } from '../types/group'

/** Length and count limits for the Add / Edit Group form. The form shows them; the server enforces them. */
export const GROUP_LIMITS = {
  name: 80,
  description: 1000,
  place: 60,
  tags: 10,
  tag: 30,
  linkLabel: 30,
  linkUrl: 500,
} as const

/** What a User can set when adding or editing a Group. */
export interface GroupInput {
  name: string
  sport: string
  city: string
  /** A postal abbreviation from REGIONS in the US and Canada, free text (or null) elsewhere. */
  state: string | null
  /** An ISO country code from COUNTRIES. */
  country: string
  description: string
  tags: string[]
  links: GroupLink[]
}

export type GroupFormField =
  | 'name'
  | 'sport'
  | 'city'
  | 'state'
  | 'country'
  | 'description'
  | 'tags'
  | 'links'

/** One message per field that needs fixing, plus `form` for anything else. */
export type GroupFormErrors = Partial<Record<GroupFormField | 'form', string>>

/** What the add and edit actions return when the Group wasn't saved. On success they redirect. */
export interface GroupFormResult {
  errors: GroupFormErrors
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function texts(formData: FormData, key: string): string[] {
  return formData.getAll(key).map((value) => (typeof value === 'string' ? value.trim() : ''))
}

/**
 * A link URL as typed, made absolute ("instagram.com/x" becomes "https://instagram.com/x").
 * Null unless it is a plain http(s) web address, so no `javascript:` links reach the Group page.
 */
export function normalizeLinkUrl(raw: string): string | null {
  const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(raw)
  try {
    const url = new URL(hasScheme ? raw : `https://${raw}`)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    if (!url.hostname.includes('.')) return null
    return url.href
  } catch {
    return null
  }
}

/**
 * A city as typed, with extra spaces removed. All-lowercase or all-caps input gets capitalized
 * ("san diego" and "SAN DIEGO" become "San Diego"); anything else is kept as typed, so "McLean" survives.
 */
export function tidyPlaceName(raw: string): string {
  const name = raw.replace(/\s+/g, ' ').trim()
  if (name !== name.toLowerCase() && name !== name.toUpperCase()) return name
  return name.toLowerCase().replace(/(^|[\s\-.'])(\p{L})/gu, (_, before: string, letter: string) => before + letter.toUpperCase())
}

/** Comma-separated tags, trimmed, without blanks or repeats (ignoring case). */
function parseTags(raw: string): string[] {
  const seen = new Set<string>()
  const tags: string[] = []
  for (const tag of raw.split(',').map((part) => part.trim())) {
    const key = tag.toLowerCase()
    if (tag && !seen.has(key)) {
      seen.add(key)
      tags.push(tag)
    }
  }
  return tags
}

function parseLinks(formData: FormData): { links: GroupLink[]; error?: string } {
  const labels = texts(formData, 'linkLabel')
  const urls = texts(formData, 'linkUrl')
  const links: GroupLink[] = []

  for (const [index, label] of labels.entries()) {
    const raw = urls[index] ?? ''
    if (!label && !raw) continue
    if (!label || !raw) return { links, error: 'Give each link both a label and a URL.' }
    if (label.length > GROUP_LIMITS.linkLabel) {
      return { links, error: `Keep link labels to ${GROUP_LIMITS.linkLabel} characters.` }
    }
    const url = raw.length <= GROUP_LIMITS.linkUrl ? normalizeLinkUrl(raw) : null
    if (!url) return { links, error: `"${raw}" isn't a web address. Try something like instagram.com/yourgroup.` }
    links.push({ label, url })
  }

  if (links.length > MAX_GROUP_LINKS) return { links, error: `Add up to ${MAX_GROUP_LINKS} links.` }
  return { links }
}

/** Reads and checks the Add / Edit Group form. Never trust the browser: this runs on the server. */
export function parseGroupForm(
  formData: FormData,
): { ok: true; group: GroupInput } | { ok: false; errors: GroupFormErrors } {
  const errors: GroupFormErrors = {}

  const name = text(formData, 'name')
  if (!name) errors.name = 'Your Group needs a name.'
  else if (name.length > GROUP_LIMITS.name) errors.name = `Keep the name to ${GROUP_LIMITS.name} characters.`

  const sport = text(formData, 'sport')
  if (!isSport(sport)) errors.sport = 'Pick a sport. Choose Other if yours isn’t listed.'

  const description = text(formData, 'description')
  if (!description) errors.description = 'Tell people what your Group is about.'
  else if (description.length > GROUP_LIMITS.description) {
    errors.description = `Keep the description to ${GROUP_LIMITS.description} characters.`
  }

  const country = text(formData, 'country')
  if (!isCountry(country)) errors.country = 'Pick a country.'

  const state = text(formData, 'state')
  const region = REGIONS[country]
  if (region) {
    if (!region.options.some((option) => option.code === state)) {
      errors.state = `Pick a ${region.label.toLowerCase()}.`
    }
  } else if (state.length > GROUP_LIMITS.place) {
    errors.state = `Keep this to ${GROUP_LIMITS.place} characters.`
  }

  const city = tidyPlaceName(text(formData, 'city'))
  if (!city) errors.city = 'Add the city or town your Group is based in.'
  else if (city.length > GROUP_LIMITS.place) errors.city = `Keep this to ${GROUP_LIMITS.place} characters.`

  const tags = parseTags(text(formData, 'tags'))
  if (tags.length > GROUP_LIMITS.tags) errors.tags = `Add up to ${GROUP_LIMITS.tags} tags.`
  else if (tags.some((tag) => tag.length > GROUP_LIMITS.tag)) {
    errors.tags = `Keep each tag to ${GROUP_LIMITS.tag} characters.`
  }

  const { links, error: linksError } = parseLinks(formData)
  if (linksError) errors.links = linksError

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return {
    ok: true,
    group: {
      name,
      sport,
      city,
      state: state || null,
      country,
      description,
      tags,
      links,
    },
  }
}

/**
 * Props that show a form field's error under it, or `hint` when it has none. Spread onto a
 * TextField: `<TextField {...fieldErrorProps(errors, 'name')} />`.
 */
export function fieldErrorProps(
  errors: GroupFormErrors,
  field: GroupFormField,
  hint?: ReactNode,
): { error: boolean; helperText: ReactNode } {
  return { error: Boolean(errors[field]), helperText: errors[field] ?? hint }
}

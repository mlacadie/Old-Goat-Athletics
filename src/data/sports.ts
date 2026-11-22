/**
 * The Sport list: the sports a Group Owner picks from when adding or editing a Group. A set list
 * keeps the Groups page's sport pills clean. Keep it alphabetical with Other last, and add sports
 * as they come up.
 */
export const SPORTS = [
  'Baseball',
  'Basketball',
  'Cycling',
  'Field Hockey',
  'Football',
  'Golf',
  'Ice Hockey',
  'Lacrosse',
  'Rowing',
  'Rugby',
  'Running',
  'Skiing',
  'Soccer',
  'Softball',
  'Swimming',
  'Tennis',
  'Triathlon',
  'Volleyball',
  'Water Polo',
  'Wrestling',
  'Other',
] as const

export function isSport(value: string): boolean {
  return (SPORTS as readonly string[]).includes(value)
}

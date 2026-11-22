/**
 * Countries and states a Group Owner picks from on the Add / Edit Group form, so locations stay
 * consistent for the Groups page's state filter. Countries are stored as ISO 3166-1 alpha-2 codes
 * ("US"); states and provinces as their postal abbreviations ("MA").
 */

export interface Place {
  code: string
  name: string
}

function toPlaces(pairs: [code: string, name: string][]): Place[] {
  return pairs.map(([code, name]) => ({ code, name }))
}

/** The country a new Group starts with. */
export const DEFAULT_COUNTRY = 'US'

/** United States first (most Groups), then Canada, then everyone else alphabetically. */
export const COUNTRIES: Place[] = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  ...toPlaces([
    ['AF', 'Afghanistan'], ['AL', 'Albania'], ['DZ', 'Algeria'], ['AD', 'Andorra'], ['AO', 'Angola'],
    ['AG', 'Antigua and Barbuda'], ['AR', 'Argentina'], ['AM', 'Armenia'], ['AU', 'Australia'], ['AT', 'Austria'],
    ['AZ', 'Azerbaijan'], ['BS', 'Bahamas'], ['BH', 'Bahrain'], ['BD', 'Bangladesh'], ['BB', 'Barbados'],
    ['BY', 'Belarus'], ['BE', 'Belgium'], ['BZ', 'Belize'], ['BJ', 'Benin'], ['BM', 'Bermuda'], ['BT', 'Bhutan'],
    ['BO', 'Bolivia'], ['BA', 'Bosnia and Herzegovina'], ['BW', 'Botswana'], ['BR', 'Brazil'], ['BN', 'Brunei'],
    ['BG', 'Bulgaria'], ['BF', 'Burkina Faso'], ['BI', 'Burundi'], ['CV', 'Cabo Verde'], ['KH', 'Cambodia'],
    ['CM', 'Cameroon'], ['KY', 'Cayman Islands'], ['CF', 'Central African Republic'], ['TD', 'Chad'], ['CL', 'Chile'],
    ['CN', 'China'], ['CO', 'Colombia'], ['KM', 'Comoros'], ['CG', 'Congo'], ['CD', 'Congo (DRC)'],
    ['CR', 'Costa Rica'], ['CI', 'Côte d’Ivoire'], ['HR', 'Croatia'], ['CU', 'Cuba'], ['CY', 'Cyprus'],
    ['CZ', 'Czechia'], ['DK', 'Denmark'], ['DJ', 'Djibouti'], ['DM', 'Dominica'], ['DO', 'Dominican Republic'],
    ['EC', 'Ecuador'], ['EG', 'Egypt'], ['SV', 'El Salvador'], ['GQ', 'Equatorial Guinea'], ['ER', 'Eritrea'],
    ['EE', 'Estonia'], ['SZ', 'Eswatini'], ['ET', 'Ethiopia'], ['FJ', 'Fiji'], ['FI', 'Finland'], ['FR', 'France'],
    ['GA', 'Gabon'], ['GM', 'Gambia'], ['GE', 'Georgia'], ['DE', 'Germany'], ['GH', 'Ghana'], ['GR', 'Greece'],
    ['GD', 'Grenada'], ['GU', 'Guam'], ['GT', 'Guatemala'], ['GN', 'Guinea'], ['GW', 'Guinea-Bissau'],
    ['GY', 'Guyana'], ['HT', 'Haiti'], ['HN', 'Honduras'], ['HK', 'Hong Kong'], ['HU', 'Hungary'],
    ['IS', 'Iceland'], ['IN', 'India'], ['ID', 'Indonesia'], ['IR', 'Iran'], ['IQ', 'Iraq'], ['IE', 'Ireland'],
    ['IL', 'Israel'], ['IT', 'Italy'], ['JM', 'Jamaica'], ['JP', 'Japan'], ['JO', 'Jordan'], ['KZ', 'Kazakhstan'],
    ['KE', 'Kenya'], ['KI', 'Kiribati'], ['XK', 'Kosovo'], ['KW', 'Kuwait'], ['KG', 'Kyrgyzstan'], ['LA', 'Laos'],
    ['LV', 'Latvia'], ['LB', 'Lebanon'], ['LS', 'Lesotho'], ['LR', 'Liberia'], ['LY', 'Libya'],
    ['LI', 'Liechtenstein'], ['LT', 'Lithuania'], ['LU', 'Luxembourg'], ['MG', 'Madagascar'], ['MW', 'Malawi'],
    ['MY', 'Malaysia'], ['MV', 'Maldives'], ['ML', 'Mali'], ['MT', 'Malta'], ['MH', 'Marshall Islands'],
    ['MR', 'Mauritania'], ['MU', 'Mauritius'], ['MX', 'Mexico'], ['FM', 'Micronesia'], ['MD', 'Moldova'],
    ['MC', 'Monaco'], ['MN', 'Mongolia'], ['ME', 'Montenegro'], ['MA', 'Morocco'], ['MZ', 'Mozambique'],
    ['MM', 'Myanmar'], ['NA', 'Namibia'], ['NR', 'Nauru'], ['NP', 'Nepal'], ['NL', 'Netherlands'],
    ['NZ', 'New Zealand'], ['NI', 'Nicaragua'], ['NE', 'Niger'], ['NG', 'Nigeria'], ['KP', 'North Korea'],
    ['MK', 'North Macedonia'], ['NO', 'Norway'], ['OM', 'Oman'], ['PK', 'Pakistan'], ['PW', 'Palau'],
    ['PS', 'Palestine'], ['PA', 'Panama'], ['PG', 'Papua New Guinea'], ['PY', 'Paraguay'], ['PE', 'Peru'],
    ['PH', 'Philippines'], ['PL', 'Poland'], ['PT', 'Portugal'], ['PR', 'Puerto Rico'], ['QA', 'Qatar'],
    ['RO', 'Romania'], ['RU', 'Russia'], ['RW', 'Rwanda'], ['KN', 'Saint Kitts and Nevis'], ['LC', 'Saint Lucia'],
    ['VC', 'Saint Vincent and the Grenadines'], ['WS', 'Samoa'], ['SM', 'San Marino'],
    ['ST', 'São Tomé and Príncipe'], ['SA', 'Saudi Arabia'], ['SN', 'Senegal'], ['RS', 'Serbia'],
    ['SC', 'Seychelles'], ['SL', 'Sierra Leone'], ['SG', 'Singapore'], ['SK', 'Slovakia'], ['SI', 'Slovenia'],
    ['SB', 'Solomon Islands'], ['SO', 'Somalia'], ['ZA', 'South Africa'], ['KR', 'South Korea'],
    ['SS', 'South Sudan'], ['ES', 'Spain'], ['LK', 'Sri Lanka'], ['SD', 'Sudan'], ['SR', 'Suriname'],
    ['SE', 'Sweden'], ['CH', 'Switzerland'], ['SY', 'Syria'], ['TW', 'Taiwan'], ['TJ', 'Tajikistan'],
    ['TZ', 'Tanzania'], ['TH', 'Thailand'], ['TL', 'Timor-Leste'], ['TG', 'Togo'], ['TO', 'Tonga'],
    ['TT', 'Trinidad and Tobago'], ['TN', 'Tunisia'], ['TR', 'Türkiye'], ['TM', 'Turkmenistan'], ['TV', 'Tuvalu'],
    ['UG', 'Uganda'], ['UA', 'Ukraine'], ['AE', 'United Arab Emirates'], ['GB', 'United Kingdom'],
    ['UY', 'Uruguay'], ['UZ', 'Uzbekistan'], ['VU', 'Vanuatu'], ['VA', 'Vatican City'], ['VE', 'Venezuela'],
    ['VN', 'Vietnam'], ['VI', 'U.S. Virgin Islands'], ['YE', 'Yemen'], ['ZM', 'Zambia'], ['ZW', 'Zimbabwe'],
  ]),
]

const US_STATES = toPlaces([
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'],
  ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'],
  ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'],
  ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'], ['MO', 'Missouri'],
  ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'],
  ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'],
  ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'],
  ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
])

const CA_PROVINCES = toPlaces([
  ['AB', 'Alberta'], ['BC', 'British Columbia'], ['MB', 'Manitoba'], ['NB', 'New Brunswick'],
  ['NL', 'Newfoundland and Labrador'], ['NT', 'Northwest Territories'], ['NS', 'Nova Scotia'], ['NU', 'Nunavut'],
  ['ON', 'Ontario'], ['PE', 'Prince Edward Island'], ['QC', 'Quebec'], ['SK', 'Saskatchewan'], ['YT', 'Yukon'],
])

/** Countries where the state is picked from a list, and what that list is called. */
export const REGIONS: Record<string, { label: string; options: Place[] }> = {
  US: { label: 'State', options: US_STATES },
  CA: { label: 'Province', options: CA_PROVINCES },
}

export function isCountry(code: string): boolean {
  return COUNTRIES.some((country) => country.code === code)
}

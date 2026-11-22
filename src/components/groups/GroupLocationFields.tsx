'use client'

import { useMemo, useState } from 'react'
import { Autocomplete, MenuItem, Stack, TextField } from '@mui/material'
import { COUNTRIES, DEFAULT_COUNTRY, REGIONS, isCountry, type Place } from '../../data/places'
import { GROUP_LIMITS, type GroupFormErrors } from '../../lib/groupForm'
import type { Group, KnownCity } from '../../types/group'

/**
 * Country, state, and city on the Add / Edit Group form. Country is searchable from a set list;
 * state is a list in the US and Canada; city is typed but suggests cities other Groups already use,
 * so the same place isn't spelled three ways.
 */
export default function GroupLocationFields({
  group,
  knownCities,
  errors,
}: {
  group?: Group
  knownCities: KnownCity[]
  errors: GroupFormErrors
}) {
  const [country, setCountry] = useState(
    group?.country && isCountry(group.country) ? group.country : DEFAULT_COUNTRY,
  )
  const region = REGIONS[country]
  // A state typed before the lists existed (e.g. "Massachusetts") starts blank so the Owner picks it.
  const [state, setState] = useState(() => {
    const saved = group?.state ?? ''
    return !region || region.options.some((option) => option.code === saved) ? saved : ''
  })
  const countryPlace = COUNTRIES.find((place) => place.code === country) ?? COUNTRIES[0]

  const citySuggestions = useMemo(
    () => [
      ...new Set(
        knownCities
          .filter((known) => known.country === country && (!region || !state || known.state === state))
          .map((known) => known.city),
      ),
    ],
    [knownCities, country, region, state],
  )

  const changeCountry = (place: Place) => {
    setCountry(place.code)
    setState('')
  }

  return (
    <Stack spacing={2}>
      <Autocomplete
        options={COUNTRIES}
        value={countryPlace}
        onChange={(_, place) => changeCountry(place)}
        getOptionLabel={(place) => place.name}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        disableClearable
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            required
            error={Boolean(errors.country)}
            helperText={errors.country}
          />
        )}
      />
      <input type="hidden" name="country" value={country} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        {region ? (
          <TextField
            select
            name="state"
            label={region.label}
            required
            fullWidth
            value={state}
            onChange={(event) => setState(event.target.value)}
            error={Boolean(errors.state)}
            helperText={errors.state}
          >
            {region.options.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            name="state"
            label="State / Province / Region"
            fullWidth
            value={state}
            onChange={(event) => setState(event.target.value)}
            slotProps={{ htmlInput: { maxLength: GROUP_LIMITS.place } }}
            error={Boolean(errors.state)}
            helperText={errors.state ?? 'Optional'}
          />
        )}
        <Autocomplete
          freeSolo
          fullWidth
          options={citySuggestions}
          defaultValue={group?.city ?? ''}
          renderInput={(params) => (
            <TextField
              {...params}
              name="city"
              label="City or town"
              required
              slotProps={{
                ...params.slotProps,
                htmlInput: { ...params.slotProps.htmlInput, maxLength: GROUP_LIMITS.place },
              }}
              error={Boolean(errors.city)}
              helperText={errors.city}
            />
          )}
        />
      </Stack>
    </Stack>
  )
}

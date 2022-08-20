import { format, formatISO, fromUnixTime, isEqual, parseISO } from "date-fns"
import React from "react"
import useSWR from "swr"

import fetcher from "../../../lib/fetcher"
import { RootObject } from "../../types/msw"
import { METJSONForecast } from "../../types/yr"
import ForecastTable, { ForecastTableRow } from "../ForecastTable/ForecastTable"
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator"
import { useSettings } from "../SettingsProvider/SettingsProvider"
import { LOCATIONS } from "./Locations"

function Forecast() {
  const { locationName } = useSettings()
  const location = LOCATIONS.find((location) => location.name === locationName)
  const mswUrl = `/api/magic-seaweed-forecast?location=${location?.mswId}`
  const yrUrl = `https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${location?.latitude}&lon=${location?.longitude}`
  const { data: mswData, error: mswError } = useSWR<RootObject[]>(
    mswUrl,
    fetcher
  )
  const { data: yrData, error: yrError } = useSWR<METJSONForecast>(
    yrUrl,
    fetcher
  )

  const hasError = mswError || yrError
  const isLoading = (!mswData || !yrData) && !hasError

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  if (hasError) {
    return (
      <p className="p-4 text-sm text-center">
        An error occurred, please try again later 😔
      </p>
    )
  }

  // Group YR forecast time steps by day
  const forecastRowsByDay: { [k: string]: ForecastTableRow[] } = {}

  yrData?.properties.timeseries.forEach((timeSeriesUnit) => {
    const day = format(parseISO(timeSeriesUnit.time), "yyyy-MM-dd")

    const row = {
      swells: {},
      time: timeSeriesUnit.time,
      wind: {
        direction: timeSeriesUnit.data.instant.details?.wind_from_direction,
        speed: timeSeriesUnit.data.instant.details?.wind_speed,
      },
    }

    if (forecastRowsByDay[day]) {
      forecastRowsByDay[day].push(row)
    } else {
      forecastRowsByDay[day] = [row]
    }
  })

  /*
	Merge MSW data with YR data
	*/
  mswData?.forEach((datum) => {
    const date = fromUnixTime(datum.timestamp)
    const day = format(date, "yyyy-MM-dd")
    const forecastRowsForDay = forecastRowsByDay[day]
    const swells = {
      primary: {
        direction: datum.swell.components.primary.direction,
        height: datum.swell.components.primary.height,
        period: datum.swell.components.primary.period,
      },
      secondary: datum.swell.components.secondary && {
        direction: datum.swell.components.secondary.direction,
        height: datum.swell.components.secondary.height,
        period: datum.swell.components.secondary.period,
      },
      tertiary: datum.swell.components.tertiary && {
        direction: datum.swell.components.tertiary.direction,
        height: datum.swell.components.tertiary.height,
        period: datum.swell.components.tertiary.period,
      },
    }

    /*
		Iterate through existing forecast rows that we got from the YR data and
		merge the swell data into any row with a matching time or insert the
		swell data in the correct order if not
		*/
    for (let i = 0; i < forecastRowsForDay.length; i++) {
      const row = forecastRowsForDay[i]
      const rowDate = parseISO(row.time)

      if (isEqual(date, rowDate)) {
        row.swells = swells

        break
      } else if (date < rowDate) {
        forecastRowsForDay.splice(i, 0, {
          swells,
          time: formatISO(date),
          wind: {},
        })

        break
      } else if (i === forecastRowsForDay.length - 1) {
        forecastRowsForDay.push({
          swells,
          time: formatISO(date),
          wind: {},
        })
      }
    }
  })

  return (
    <div className="sm:px-4">
      {Object.keys(forecastRowsByDay).map((forecastDayKey) => (
        <ForecastTable
          key={forecastDayKey}
          times={forecastRowsByDay[forecastDayKey]}
        />
      ))}
    </div>
  )
}

export default Forecast

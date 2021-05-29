import axios from "axios"
import { format, fromUnixTime, isEqual, parseISO } from "date-fns"
import React, { useEffect, useState } from "react"

import { RootObject } from "../../types/msw"
import { METJSONForecast } from "../../types/yr"
import ForecastTable, { ForecastTableRow } from "../ForecastTable/ForecastTable"

const LOCATION_BORE = {
  lat: 58.7974,
  long: 5.5384,
}

const yrUrl = `https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${LOCATION_BORE.lat}&lon=${LOCATION_BORE.long}`
const mswUrl = "/api/magic-seaweed-forecast"

function Forecast() {
  const [yrData, setYrData] = useState<METJSONForecast | undefined>()
  const [mswData, setMswData] = useState<RootObject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    let yrResponse
    let mswResponse

    yrResponse = (await axios.get(yrUrl)).data
    mswResponse = (await axios.get(mswUrl)).data

    setYrData(yrResponse)
    setMswData(mswResponse)
    setIsLoading(false)
  }

  // Group YR forecast time steps by day
  const forecastDays: { [k: string]: ForecastTableRow[] } = {}

  yrData?.properties.timeseries.forEach((timeSeriesUnit) => {
    const day = format(parseISO(timeSeriesUnit.time), "yyyy-MM-dd")

    // look for matching time in MSW forecast
    const swellTime = mswData.find((datum) => {
      const mswDate = fromUnixTime(datum.timestamp)
      const yrDate = parseISO(timeSeriesUnit.time)

      return isEqual(mswDate, yrDate)
    })

    const row = {
      swells: {
        primary: swellTime && {
          direction: swellTime.swell.components.primary.direction,
          height: swellTime.swell.components.primary.height,
          period: swellTime.swell.components.primary.period,
        },
        secondary: swellTime?.swell.components.secondary && {
          direction: swellTime.swell.components.secondary.direction,
          height: swellTime.swell.components.secondary.height,
          period: swellTime.swell.components.secondary.period,
        },
        tertiary: swellTime?.swell.components.tertiary && {
          direction: swellTime.swell.components.tertiary.direction,
          height: swellTime.swell.components.tertiary.height,
          period: swellTime.swell.components.tertiary.period,
        },
      },
      time: timeSeriesUnit.time,
      wind: {
        direction: timeSeriesUnit.data.instant.details?.wind_from_direction,
        speed: timeSeriesUnit.data.instant.details?.wind_speed,
      },
    }

    if (forecastDays[day]) {
      forecastDays[day].push(row)
    } else {
      forecastDays[day] = [row]
    }
  })

  return isLoading ? (
    <div className="h-screen w-screen fixed top-0 left-0 bg-yellow-50 dark:bg-gray-800 flex items-center justify-center">
      <span className="text-md animate-pulse font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
        🧘 Loading Forecast
      </span>
    </div>
  ) : (
    <>
      {Object.keys(forecastDays).map((forecastDayKey) => (
        <ForecastTable
          key={forecastDayKey}
          times={forecastDays[forecastDayKey]}
        />
      ))}
    </>
  )
}

export default Forecast

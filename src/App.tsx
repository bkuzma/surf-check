import "./App.css"

import axios from "axios"
import { format, fromUnixTime, isEqual, parseISO } from "date-fns"
import React, { useEffect, useState } from "react"

import ForecastTable, {
  ForecastTableRow,
} from "./components/ForecastTable/ForecastTable"
import { RootObject } from "./types/msw"
import { METJSONForecast } from "./types/yr"

const LOCATION_BORE = {
  lat: 58.7974,
  long: 5.5384,
}

const yrUrl = `https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${LOCATION_BORE.lat}&lon=${LOCATION_BORE.long}`
const mswUrl = "/api/magic-seaweed-forecast"

function App() {
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

  return (
    <div className="space-y-5 py-5 container mx-auto">
      {isLoading
        ? "Loading..."
        : Object.keys(forecastDays).map((forecastDayKey) => (
            <ForecastTable
              key={forecastDayKey}
              times={forecastDays[forecastDayKey]}
            />
          ))}
    </div>
  )
}

export default App

import "./App.css"

import axios from "axios"
import { fromUnixTime, isEqual, parseISO } from "date-fns"
import React, { useState } from "react"

import ForecastTable from "./components/ForecastTable/ForecastTable"
import mswForecast from "./fixtures/msw-forecast.json"
import yrForecast from "./fixtures/yr-forecast.json"
import { RootObject } from "./types/msw"
import { METJSONForecast } from "./types/yr"

const LOCATION_BORE = {
  lat: 58.7974,
  long: 5.5384,
}

const requestURL = `https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${LOCATION_BORE.lat}&lon=${LOCATION_BORE.long}`

function App() {
  const [yrData, setYrData] = useState<METJSONForecast | undefined>(
    yrForecast as METJSONForecast
  )

  const mswData: RootObject[] = mswForecast

  const onClickFetch = async () => {
    const response = await axios.get(requestURL)
    setYrData(response.data)
  }

  const forecastTimes =
    yrData?.properties.timeseries.map((time) => {
      // look for matching time in MSW forecast
      const swellTime = mswData.find((datum) => {
        const mswDate = fromUnixTime(datum.timestamp)
        const yrDate = parseISO(time.time)

        return isEqual(mswDate, yrDate)
      })

      return {
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
        time: time.time,
        wind: {
          direction: time.data.instant.details?.wind_from_direction,
          speed: time.data.instant.details?.wind_speed,
        },
      }
    }) || []

  return (
    <div>
      <button onClick={onClickFetch}>Fetch YR Data</button>
      <ForecastTable times={forecastTimes} />
    </div>
  )
}

export default App

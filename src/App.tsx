import "./App.css"

import axios from "axios"
import { format, parseISO } from "date-fns"
import React, { useState } from "react"

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
  const [data, setData] = useState<METJSONForecast | undefined>(
    yrForecast as METJSONForecast
  )

  const mswData: RootObject[] = mswForecast

  const onClickFetch = async () => {
    const response = await axios.get(requestURL)
    setData(response.data)
  }

  return (
    <div>
      <button onClick={onClickFetch}>Fetch YR Data</button>

      <table>
        <thead>
          <tr>
            <td>Time</td>
            <td>Wind Direction</td>
            <td>Wind Speed</td>
          </tr>
        </thead>
        <tbody>
          {data?.properties.timeseries.map((time, index) => {
            return (
              <tr key={index}>
                <td>{format(parseISO(time.time), "EEEE, MMM dd HH:mm")}</td>
                <td>{time.data.instant.details?.wind_from_direction}</td>
                <td>{time.data.instant.details?.wind_speed}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <td>Time</td>
            <td>Primary Swell</td>
            <td>Secondary Swell</td>
            <td>Tertiary Swell</td>
          </tr>
        </thead>
        <tbody>
          {mswData.map((rootObject, index) => {
            return (
              <tr key={index}>
                <td>
                  {format(new Date(rootObject.timestamp), "EEEE, MMM dd HH:mm")}
                </td>
                <td>
                  {`${rootObject.swell.components.primary.direction} ${rootObject.swell.components.primary.height} ${rootObject.swell.components.primary.period} seconds`}
                </td>
                <td>
                  {rootObject.swell.components.secondary &&
                    `${rootObject.swell.components.secondary.direction} ${rootObject.swell.components.secondary.height} ${rootObject.swell.components.secondary.period} seconds`}
                </td>
                <td>
                  {rootObject.swell.components.tertiary &&
                    `${rootObject.swell.components.tertiary.direction} ${rootObject.swell.components.tertiary.height} ${rootObject.swell.components.tertiary.period} seconds`}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App

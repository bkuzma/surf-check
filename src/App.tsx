import "./App.css"

import axios from "axios"
import { format, fromUnixTime, parseISO } from "date-fns"
import React, { useState } from "react"

import DirectionalArrow from "./components/DirectionalArrow/DirectionalArrow"
import mswForecast from "./fixtures/msw-forecast.json"
import yrForecast from "./fixtures/yr-forecast.json"
import { RootObject, SwellComponent } from "./types/msw"
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

  const renderSwell = (swellComponent: SwellComponent) => (
    <div className="flex">
      <DirectionalArrow degrees={swellComponent.direction + 180} />
      <span>{`${swellComponent.height}`}</span>
      <span>{`${swellComponent.period} seconds`}</span>
    </div>
  )

  return (
    <div>
      <button onClick={onClickFetch}>Fetch YR Data</button>

      <div className="flex">
        <table className="divide-y divide-gray-200">
          <thead>
            <tr>
              <td>Time</td>
              <td>Wind Direction</td>
              <td>Wind Speed</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.properties.timeseries.map((time, index) => {
              return (
                <tr key={index}>
                  <td>
                    {format(parseISO(time.time), "EEEE, MMM dd yyyy HH:mm")}
                  </td>
                  <td>
                    {time.data.instant.details?.wind_from_direction ? (
                      <DirectionalArrow
                        degrees={time.data.instant.details?.wind_from_direction}
                      />
                    ) : (
                      "n/a"
                    )}
                  </td>
                  <td>{time.data.instant.details?.wind_speed}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <table className="divide-y divide-gray-200">
          <thead>
            <tr>
              <td>Time</td>
              <td>Primary Swell</td>
              <td>Secondary Swell</td>
              <td>Tertiary Swell</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mswData.map((rootObject, index) => {
              return (
                <tr key={index}>
                  <td>
                    {format(
                      fromUnixTime(rootObject.localTimestamp),
                      "EEEE, MMM dd yyyy HH:mm"
                    )}
                  </td>
                  <td>{renderSwell(rootObject.swell.components.primary)}</td>
                  <td>
                    {rootObject.swell.components.secondary &&
                      renderSwell(rootObject.swell.components.secondary)}
                  </td>
                  <td>
                    {rootObject.swell.components.tertiary &&
                      renderSwell(rootObject.swell.components.tertiary)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App

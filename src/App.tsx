import React, { useState } from "react"
import axios from "axios"

import { format, parseISO } from 'date-fns';
import forecast from './fixtures/forecast.json'
import { METJSONForecast } from './types/yr'
import "./App.css"

const LOCATION_BORE = {
  lat: 58.7974,
  long: 5.5384,
}

const requestURL = `https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${LOCATION_BORE.lat}&lon=${LOCATION_BORE.long}`

function App() {
	const [data, setData] = useState<METJSONForecast | undefined>(forecast as METJSONForecast)

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
							<td>{format(parseISO(time.time), 'EEEE, MMM dd HH:mm')}</td>
							<td>{time.data.instant.details?.wind_from_direction}</td>
							<td>{time.data.instant.details?.wind_speed}</td>
						</tr>
					)
				})}
				</tbody>
			</table>
    </div>
  )
}

export default App

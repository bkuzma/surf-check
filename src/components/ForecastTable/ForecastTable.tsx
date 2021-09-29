import { format, parseISO } from "date-fns"
import { useContext } from "react"

import SettingsContext from "../../contexts/settings-context"
import DirectionalArrow from "../DirectionalArrow/DirectionalArrow"

interface Swell {
  direction: number
  height: number
  period: number
}

export interface ForecastTableRow {
  time: string
  swells: {
    primary?: Swell
    secondary?: Swell
    tertiary?: Swell
  }
  wind: {
    direction?: number
    speed?: number
  }
}

export interface ForecastTableProps {
  times: ForecastTableRow[]
}

function ForecastTable(props: ForecastTableProps) {
  const { swellUnits, windUnits } = useContext(SettingsContext)

  const getArrowSizeFromWindSpeed = (windSpeedInMph: number): number => {
    const MIN_ARROW_SIZE = 10
    const MAX_ARROW_SIZE = 20
    const MAX_WIND_SPEED = 20

    const scale = Math.min(1, windSpeedInMph / MAX_WIND_SPEED)
    const arrowSize = (MAX_ARROW_SIZE - MIN_ARROW_SIZE) * scale + MIN_ARROW_SIZE

    return arrowSize
  }

  const renderSwell = (swellComponent: Swell) => {
    const swellHeight =
      swellUnits === "feet"
        ? swellComponent.height
        : (swellComponent.height / 3.281).toFixed(1)
    const swellUnit = swellUnits === "feet" ? "ft" : "m"

    return (
      <div className="flex items-center space-x-2 text-xs">
        <DirectionalArrow degrees={swellComponent.direction + 180} />
        <span>
          {swellHeight}
          {swellUnit} @ {swellComponent.period}s
        </span>
      </div>
    )
  }

  const tableHeaders = [
    format(parseISO(props.times[0].time), "EE M-dd"),
    "🌬 Wind",
    "🌊 Swell",
  ]

  return (
    <table className="mx-auto w-full">
      <thead>
        <tr>
          {tableHeaders.map((tableHeader, i) => (
            <th
              key={i}
              className="px-3 py-3 text-left text-xs font-medium text-gray-900 dark:text-yellow-300 uppercase tracking-wider sticky top-0 bg-yellow-300 dark:bg-gray-900 z-10 w-1/3"
            >
              {tableHeader}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm font-medium text-gray-900 bg-white">
        {props.times.map((time) => {
          let windSpeed
          let windUnit
          let arrowSize

          if (time.wind.speed) {
            const windInMph = (time.wind.speed * 2.237).toFixed(1)

            arrowSize = getArrowSizeFromWindSpeed(Number(windInMph))
            windSpeed = windUnits === "mph" ? windInMph : time.wind.speed
            windUnit = windUnits === "mph" ? "mph" : "m/s"
          } else {
            windSpeed = ""
            windUnit = ""
          }

          return (
            <tr
              key={time.time}
              className="dark:text-gray-300 h-24 bg-white dark:bg-gray-700 even:bg-blue-50 dark:even:bg-gray-800"
            >
              <td className="px-3">{format(parseISO(time.time), "HH:mm")}</td>
              <td className="px-3">
                <div className="flex space-x-2 items-center">
                  {time.wind.direction && (
                    <div className="w-5">
                      <DirectionalArrow
                        degrees={time.wind.direction}
                        height={arrowSize}
                        width={arrowSize}
                      />
                    </div>
                  )}
                  <span>
                    {windSpeed} {windUnit}
                  </span>
                </div>
              </td>
              <td className="px-3 space-y-1">
                {time.swells.primary && renderSwell(time.swells.primary)}
                {time.swells.secondary && renderSwell(time.swells.secondary)}
                {time.swells.tertiary && renderSwell(time.swells.tertiary)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ForecastTable

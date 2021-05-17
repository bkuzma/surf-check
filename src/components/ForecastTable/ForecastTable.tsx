import classNames from "classnames"
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

  const renderSwell = (swellComponent: Swell) => {
    const swellHeight =
      swellUnits === "feet"
        ? swellComponent.height
        : (swellComponent.height / 3.281).toFixed(1)
    const swellUnit = swellUnits === "feet" ? "ft" : "m"

    return (
      <div className="flex space-x-2 text-xs">
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
              className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider sticky top-0 bg-yellow-300 z-10 w-1/3"
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

          if (time.wind.speed) {
            windSpeed =
              windUnits === "mph"
                ? time.wind.speed
                : (time.wind.speed / 2.237).toFixed(1)
            windUnit = windUnits === "mph" ? "mph" : "m/s"
          } else {
            windSpeed = "n/a"
            windUnit = ""
          }

          return (
            <tr
              key={time.time}
              className={classNames("bg-white h-24", {
                "bg-blue-50": time.swells.primary,
              })}
            >
              <td className="px-3">{format(parseISO(time.time), "HH:mm")}</td>
              <td className="px-3">
                <div className="flex space-x-2">
                  {time.wind.direction && (
                    <DirectionalArrow degrees={time.wind.direction} />
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

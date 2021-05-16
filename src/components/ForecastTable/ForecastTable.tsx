import classNames from "classnames"
import { format, parseISO } from "date-fns"

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
  const renderSwell = (swellComponent: Swell) => (
    <div className="flex space-x-2 text-xs">
      <DirectionalArrow degrees={swellComponent.direction + 180} />
      <span>
        {`${swellComponent.height}`}m @ {`${swellComponent.period}s`}
      </span>
    </div>
  )

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
        {props.times.map((time) => (
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
                <span>{time.wind.speed} m/s</span>
              </div>
            </td>
            <td className="px-3 space-y-1">
              {time.swells.primary && renderSwell(time.swells.primary)}
              {time.swells.secondary && renderSwell(time.swells.secondary)}
              {time.swells.tertiary && renderSwell(time.swells.tertiary)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ForecastTable

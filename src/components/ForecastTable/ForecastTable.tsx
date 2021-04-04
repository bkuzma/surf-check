import { format, parseISO } from "date-fns"

import DirectionalArrow from "../DirectionalArrow/DirectionalArrow"
import styles from "./ForecastTable.module.css"

interface Swell {
  direction: number
  height: number
  period: number
}

export interface ForecastTableProps {
  times: {
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
  }[]
}

function ForecastTable(props: ForecastTableProps) {
  const renderSwell = (swellComponent: Swell) => (
    <div className="flex space-x-4">
      <DirectionalArrow degrees={swellComponent.direction + 180} />
      <span>{`${swellComponent.height}`} ft</span>
      <span>{`${swellComponent.period} seconds`}</span>
    </div>
  )

  return (
    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className={styles.th}>Time</th>
          <th className={styles.th}>Wind Direction</th>
          <th className={styles.th}>Wind Speed</th>
          <th className={styles.th}>Primary Swell</th>
          <th className={styles.th}>Secondary Swell</th>
          <th className={styles.th}>Tertiary Swell</th>
        </tr>
      </thead>
      <tbody className="text-sm font-medium text-gray-900 bg-white divide-y divide-gray-200">
        {props.times.map((time) => (
          <tr key={time.time}>
            <td className={styles.td}>
              {format(parseISO(time.time), "EEEE, MMM dd yyyy HH:mm")}
            </td>
            <td className={styles.td}>
              {time.wind.direction && (
                <DirectionalArrow degrees={time.wind.direction} />
              )}
            </td>
            <td className={styles.td}>{time.wind.speed}</td>
            <td className={styles.td}>
              {time.swells.primary && renderSwell(time.swells.primary)}
            </td>
            <td className={styles.td}>
              {time.swells.secondary && renderSwell(time.swells.secondary)}
            </td>
            <td className={styles.td}>
              {time.swells.tertiary && renderSwell(time.swells.tertiary)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ForecastTable

import { format, parseISO } from "date-fns"

import DirectionalArrow from "../DirectionalArrow/DirectionalArrow"
import styles from "./ForecastTable.module.css"

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
    <div className="flex space-x-4">
      <DirectionalArrow degrees={swellComponent.direction + 180} />
      <span>
        {`${swellComponent.height}`} ft @ {`${swellComponent.period}s`}
      </span>
    </div>
  )

  return (
    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className={styles.th}>
            {format(parseISO(props.times[0].time), "EEEE, MMM dd")}
          </th>
          <th className={styles.th}>Wind</th>
          <th className={styles.th}>Primary Swell</th>
          <th className={styles.th}>Secondary Swell</th>
          <th className={styles.th}>Tertiary Swell</th>
        </tr>
      </thead>
      <tbody className="text-sm font-medium text-gray-900 bg-white divide-y divide-gray-200">
        {props.times.map((time) => (
          <tr key={time.time}>
            <td className={styles.td}>
              {format(parseISO(time.time), "HH:mm")}
            </td>
            <td className={styles.td}>
              <div className="flex space-x-4">
                {time.wind.direction && (
                  <DirectionalArrow degrees={time.wind.direction} />
                )}
                <span>{time.wind.speed} m/s</span>
              </div>
            </td>
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

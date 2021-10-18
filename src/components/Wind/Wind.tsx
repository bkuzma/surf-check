import { useContext } from "react"

import { getWindSpeedInMps } from "../../../lib/util"
import settingsContext from "../../contexts/settings-context"
import DirectionalArrow from "../DirectionalArrow/DirectionalArrow"

interface WindProps {
  direction: number
  /** Wind speed in miles per hour */
  speed: number
}

const getArrowSizeFromWindSpeed = (windSpeedInMph: number): number => {
  const MIN_ARROW_SIZE = 10
  const MAX_ARROW_SIZE = 20
  const MAX_WIND_SPEED = 20

  const scale = Math.min(1, windSpeedInMph / MAX_WIND_SPEED)
  const arrowSize = (MAX_ARROW_SIZE - MIN_ARROW_SIZE) * scale + MIN_ARROW_SIZE

  return arrowSize
}

export default function Wind(props: WindProps) {
  const { windUnits } = useContext(settingsContext)

  let windSpeed
  let windUnit
  let arrowSize

  const windInMps = getWindSpeedInMps(props.speed)

  arrowSize = getArrowSizeFromWindSpeed(props.speed)
  windSpeed = (windUnits === "mph" ? props.speed : windInMps).toFixed(1)
  windUnit = windUnits === "mph" ? "mph" : "m/s"

  return (
    <div className="flex space-x-2 items-center text-xs sm:text-sm">
      <div className="w-5">
        <DirectionalArrow
          degrees={props.direction}
          height={arrowSize}
          width={arrowSize}
        />
      </div>
      <span>
        {windSpeed} {windUnit}
      </span>
    </div>
  )
}

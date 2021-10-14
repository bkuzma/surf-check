import { useContext } from "react"

import settingsContext from "../../contexts/settings-context"
import DirectionalArrow from "../DirectionalArrow/DirectionalArrow"

interface WindProps {
  direction: number
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

  const windInMph = (props.speed * 2.237).toFixed(1)

  arrowSize = getArrowSizeFromWindSpeed(Number(windInMph))
  windSpeed = windUnits === "mph" ? windInMph : props.speed
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

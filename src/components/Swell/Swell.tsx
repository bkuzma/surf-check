import type { SwellMeasurement } from "../../types"
import DirectionalArrow from "../DirectionalArrow/DirectionalArrow"

export interface SwellProps extends SwellMeasurement {
  units: string
}

export default function Swell(props: SwellProps) {
  const swellHeight =
    props.units === "feet" ? props.height : (props.height / 3.281).toFixed(1)
  const swellUnitLabel = props.units === "feet" ? "ft" : "m"

  return (
    <div className="flex items-center space-x-2 text-xs">
      <DirectionalArrow degrees={props.direction + 180} />
      <span>
        {swellHeight}
        {swellUnitLabel} @ {props.period}s
      </span>
    </div>
  )
}

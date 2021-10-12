import { useContext } from "react"

import SettingsContext from "../../contexts/settings-context"
import Swell, { SwellProps } from "../Swell/Swell"

export interface SwellGroupProps {
  primary?: SwellProps
  secondary?: SwellProps
  tertiary?: SwellProps
}

export default function SwellGroup(props: SwellGroupProps) {
  const { swellUnits } = useContext(SettingsContext)

  return (
    <div className="space-y-1">
      {props.primary && <Swell {...props.primary} units={swellUnits} />}
      {props.secondary && <Swell {...props.secondary} units={swellUnits} />}
      {props.tertiary && <Swell {...props.tertiary} units={swellUnits} />}
    </div>
  )
}

import { useContext } from "react"

import SettingsContext from "../../contexts/settings-context"
import { SwellGroup as ISwellGroup } from "../../types"
import Swell from "../Swell/Swell"

export interface SwellGroupProps extends ISwellGroup {}

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

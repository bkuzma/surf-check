import React from "react"

interface IContextProps {
  swellUnits: string
  windUnits: string
  setWindUnits: (units: string) => void
  setSwellUnits: (units: string) => void
}

export default React.createContext({} as IContextProps)

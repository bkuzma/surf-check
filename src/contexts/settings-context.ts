import React from "react"

interface IContextProps {
  darkMode: string
  swellUnits: string
  windUnits: string
  setDarkMode: (setting: string) => void
  setWindUnits: (units: string) => void
  setSwellUnits: (units: string) => void
}

export default React.createContext({} as IContextProps)

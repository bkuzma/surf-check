import React from "react"

interface IContextProps {
  darkModePreference: string
  swellUnits: string
  windUnits: string
  setDarkMode: (setting: string) => void
  setWindUnits: (units: string) => void
  setSwellUnits: (units: string) => void
  shouldUseDarkMode: boolean
}

export default React.createContext({} as IContextProps)

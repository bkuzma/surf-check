import React from "react"

interface IContextProps {
  darkModePreference: string
  swellUnits: "feet" | "meters"
  windUnits: string
  setDarkMode: (setting: string) => void
  setWindUnits: (units: string) => void
  setSwellUnits: (units: string) => void
}

export default React.createContext({} as IContextProps)

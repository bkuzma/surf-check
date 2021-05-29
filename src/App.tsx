import "./App.css"

import classNames from "classnames"
import React, { useState } from "react"

import Forecast from "./components/Forecast/Forecast"
import Settings from "./components/Settings/Settings"
import SettingsContext from "./contexts/settings-context"

const LOCAL_STORAGE_KEYS = {
  DARK_MODE: "DARK_MODE",
  SWELL_UNITS: "SWELL_UNITS",
  WIND_UNITS: "WIND_UNITS",
}

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE) || "system"
  )
  const [swellUnits, setSwellUnits] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.SWELL_UNITS) || "feet"
  )
  const [windUnits, setWindUnits] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.WIND_UNITS) || "mph"
  )

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode: (setting) => {
          setDarkMode(setting)
          localStorage.setItem(LOCAL_STORAGE_KEYS.DARK_MODE, setting)
        },
        setSwellUnits: (value) => {
          setSwellUnits(value)
          localStorage.setItem(LOCAL_STORAGE_KEYS.SWELL_UNITS, value)
        },
        setWindUnits: (value) => {
          setWindUnits(value)
          localStorage.setItem(LOCAL_STORAGE_KEYS.WIND_UNITS, value)
        },
        swellUnits,
        windUnits,
      }}
    >
      <div
        className={classNames({
          dark:
            darkMode === "on" ||
            (darkMode === "system" &&
              window.matchMedia("(prefers-color-scheme: dark)").matches),
        })}
      >
        <div className="pb-5 container mx-auto">
          <header className="py-5 bg-green-500 dark:bg-green-900">
            <h1 className="text-xl text-center mb-4 font-medium text-gray-900 dark:text-yellow-300 uppercase tracking-wider">
              🚜 Jæren Surf Check 🏄
            </h1>
            <Settings />
          </header>
          <Forecast />
        </div>
      </div>
    </SettingsContext.Provider>
  )
}

export default App

import "./App.css"

import classNames from "classnames"
import React, { useState } from "react"

import { ReactComponent as IconCog } from "./assets/svg/cog.svg"
import { ReactComponent as IconX } from "./assets/svg/x.svg"
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
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)

  const onClickSettings = () => {
    setIsSettingsVisible(!isSettingsVisible)
  }

  const onSettingsRequestClose = () => {
    setIsSettingsVisible(false)
  }

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
        <div className="pb-24 container mx-auto relative">
          <header className="p-5 bg-green-500 dark:bg-green-900">
            <h1 className="text-xl text-center font-medium text-gray-900 dark:text-yellow-300 uppercase tracking-wider">
              🚜 Jæren Surf Check 🏄
            </h1>
            <p className="mt-2 text-sm text-center">
              Bore Beach surf forecast with swell data from Magic Seaweed and
              wind data from YR.
            </p>
          </header>
          <div
            className={classNames("fixed z-20 left-0 h-full top-0 shadow", {
              hidden: !isSettingsVisible,
            })}
          >
            <Settings onRequestClose={onSettingsRequestClose} />
          </div>
          <Forecast />
          <button
            onClick={onClickSettings}
            className="fixed z-20 bottom-4 right-4 rounded-full w-14 h-14 bg-white dark:bg-gray-300 shadow-md flex justify-center items-center dark:text-gray-800"
            title="Settings"
          >
            {isSettingsVisible ? <IconX /> : <IconCog />}
          </button>
        </div>
      </div>
    </SettingsContext.Provider>
  )
}

export default App

import classNames from "classnames"
import Head from "next/head"
import React, { useEffect, useState } from "react"

import IconCog from "../src/assets/svg/cog.svg"
import IconX from "../src/assets/svg/x.svg"
import Forecast from "../src/components/Forecast/Forecast"
import Settings from "../src/components/Settings/Settings"
import SettingsContext from "../src/contexts/settings-context"

const LOCAL_STORAGE_KEYS = {
  DARK_MODE: "DARK_MODE",
  SWELL_UNITS: "SWELL_UNITS",
  WIND_UNITS: "WIND_UNITS",
}

export default function Home() {
  const [darkModePreference, setDarkModePreference] = useState("system")
  const [swellUnits, setSwellUnits] = useState("feet")
  const [windUnits, setWindUnits] = useState("mph")
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)

  /*
	We put references to localStorage in an effect because Web APIs are not available
	when Next.js prerenders pages:
	https://nextjs.org/docs/migrating/from-create-react-app#safely-accessing-web-apis
	*/
  useEffect(() => {
    setDarkModePreference(
      localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE) || "system"
    )
    setSwellUnits(
      localStorage.getItem(LOCAL_STORAGE_KEYS.SWELL_UNITS) || "feet"
    )
    setWindUnits(localStorage.getItem(LOCAL_STORAGE_KEYS.WIND_UNITS) || "mph")
  }, [])

  const onClickSettings = () => {
    setIsSettingsVisible(!isSettingsVisible)
  }

  const onSettingsRequestClose = () => {
    setIsSettingsVisible(false)
  }

  let doesSystemUseDarkMode = false
  if (typeof window !== "undefined") {
    doesSystemUseDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
  }

  const shouldUseDarkMode =
    darkModePreference === "on" ||
    (darkModePreference === "system" && doesSystemUseDarkMode)

  return (
    <SettingsContext.Provider
      value={{
        darkModePreference,
        setDarkMode: (setting) => {
          setDarkModePreference(setting)
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
      <Head>
        <title>Jæren Surf Check - Forecast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={classNames({
          dark: shouldUseDarkMode,
        })}
      >
        <div className="pb-24 container mx-auto relative">
          <header className="p-5 bg-green-500 dark:bg-green-900">
            <h1 className="text-xl text-center font-medium text-gray-900 dark:text-yellow-300 uppercase tracking-wider">
              🚜 Jæren Surf Check 🏄
            </h1>
            <p className="mt-2 text-sm text-center text-gray-900 dark:text-yellow-300">
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
            {isSettingsVisible ? (
              <IconX height={24} width={24} />
            ) : (
              <IconCog height={24} width={24} />
            )}
          </button>
        </div>
      </div>
    </SettingsContext.Provider>
  )
}

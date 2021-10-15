import "../styles/globals.css"

import { UserProvider } from "@auth0/nextjs-auth0"
import classNames from "classnames"
import type { AppProps } from "next/app"
import React, { useEffect, useState } from "react"

import IconCog from "../src/assets/svg/cog.svg"
import IconX from "../src/assets/svg/x.svg"
import Header from "../src/components/Header/Header"
import Settings from "../src/components/Settings/Settings"
import SettingsContext from "../src/contexts/settings-context"

const LOCAL_STORAGE_KEYS = {
  DARK_MODE: "DARK_MODE",
  SWELL_UNITS: "SWELL_UNITS",
  WIND_UNITS: "WIND_UNITS",
}

function MyApp({ Component, pageProps }: AppProps) {
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
        shouldUseDarkMode,
        swellUnits,
        windUnits,
      }}
    >
      <UserProvider>
        <div
          className={classNames({
            dark: shouldUseDarkMode,
          })}
        >
          <div className="pb-24 container mx-auto relative bg-gray-50 dark:bg-gray-800 min-h-full text-gray-900 dark:text-gray-300">
            <Header />
            <div
              className={classNames("fixed z-20 left-0 h-full top-0 shadow", {
                hidden: !isSettingsVisible,
              })}
            >
              <Settings onRequestClose={onSettingsRequestClose} />
            </div>
            <Component {...pageProps} />
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
      </UserProvider>
    </SettingsContext.Provider>
  )
}

export default MyApp

import { useUser } from "@auth0/nextjs-auth0"
import React, { useContext } from "react"
import { useDetectClickOutside } from "react-detect-click-outside"

import IconX from "../../assets/svg/x.svg"
import { LOCATIONS } from "../Forecast/Locations"
import { useSettings } from "../SettingsProvider/SettingsProvider"

interface SettingsProps {
  onRequestClose: () => void
}

function Settings(props: SettingsProps) {
  const {
    darkModePreference,
    locationName,
    setDarkMode,
    setLocationName,
    setSwellUnits,
    setWindUnits,
    swellUnits,
    windUnits,
  } = useSettings()

  const { user, error, isLoading } = useUser()
  const ref = useDetectClickOutside({ onTriggered: props.onRequestClose })

  const renderLogin = () => {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    /* eslint-disable @next/next/no-html-link-for-pages */
    return user ? (
      <>
        <p>Logged in as:</p>
        <p>{user.email}</p>
        <div className="mt-4">
          <a href="/api/auth/logout">Log out</a>
        </div>
      </>
    ) : (
      <a href="/api/auth/login">Log in</a>
    )
    /* eslint-enable @next/next/no-html-link-for-pages */
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 h-full p-6 text-xs text-gray-900 dark:text-yellow-300 font-medium uppercase tracking-wider relative"
      ref={ref}
    >
      <button
        className="absolute top-2 right-2 p-4 dark:text-yellow-300"
        title="Close"
      >
        <IconX height={24} width={24} onClick={props.onRequestClose} />
      </button>
      <div className="space-y-4">
        <h4 className="text-base">Settings</h4>
        <div>
          <label className="mr-2" htmlFor="swellUnits">
            🏝 Forecast Location
          </label>
          <select
            className="select block mt-1 w-full"
            name="locationName"
            id="locationName"
            onChange={(event) => setLocationName(event.currentTarget.value)}
            value={locationName}
          >
            {LOCATIONS.map((location) => (
              <option value={location.name} key={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2" htmlFor="swellUnits">
            🌊 Swell Units
          </label>
          <select
            className="select block mt-1 w-full"
            name="swellUnits"
            id="swellUnits"
            onChange={(event) => setSwellUnits(event.currentTarget.value)}
            value={swellUnits}
          >
            <option value="feet">feet</option>
            <option value="meters">meters</option>
          </select>
        </div>
        <div>
          <label className="mr-2" htmlFor="windUnits">
            🌬 Wind Units
          </label>
          <select
            className="select block mt-1 w-full"
            name="windUnits"
            id="windUnits"
            onChange={(event) => setWindUnits(event.currentTarget.value)}
            value={windUnits}
          >
            <option value="mph">mph</option>
            <option value="m/s">m/s</option>
          </select>
        </div>
        <div>
          <label className="mr-2" htmlFor="darkMode">
            🌗 Dark Mode
          </label>
          <select
            className="select block mt-1 w-full"
            name="darkMode"
            id="darkMode"
            onChange={(event) => setDarkMode(event.currentTarget.value)}
            value={darkModePreference}
          >
            <option value="on">on</option>
            <option value="off">off</option>
            <option value="system">system preferences</option>
          </select>
        </div>
      </div>
      <div className="mt-6">{renderLogin()}</div>
    </div>
  )
}

export default Settings

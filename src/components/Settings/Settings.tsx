import { useUser } from "@auth0/nextjs-auth0"
import React, { useContext } from "react"

import IconX from "../../assets/svg/x.svg"
import SettingsContext from "../../contexts/settings-context"

interface SettingsProps {
  onRequestClose: () => void
}

function Settings(props: SettingsProps) {
  const {
    darkModePreference,
    setDarkMode,
    setSwellUnits,
    setWindUnits,
    swellUnits,
    windUnits,
  } = useContext(SettingsContext)

  const { user, error, isLoading } = useUser()

  const renderLogin = () => {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

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
  }

  return (
    <div className="bg-white dark:bg-gray-800 h-full p-6 text-xs text-gray-900 dark:text-yellow-300 font-medium uppercase tracking-wider relative">
      <button
        className="absolute top-2 right-2 p-4 dark:text-yellow-300"
        title="Close"
      >
        <IconX height={24} width={24} onClick={props.onRequestClose} />
      </button>
      <div className="space-y-3">
        <h4 className="text-base">Settings</h4>
        <div>
          <label className="mr-2" htmlFor="swellUnits">
            🌊 Swell Units:
          </label>
          <select
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
            🌬 Wind Units:
          </label>
          <select
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
            🌗 Dark Mode:
          </label>
          <select
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

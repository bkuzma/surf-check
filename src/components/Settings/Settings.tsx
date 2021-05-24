import React, { useContext } from "react"

import SettingsContext from "../../contexts/settings-context"

function Settings() {
  const {
    darkMode,
    setDarkMode,
    setSwellUnits,
    setWindUnits,
    swellUnits,
    windUnits,
  } = useContext(SettingsContext)

  return (
    <div className="px-3 space-y-3 text-xs text-gray-900 dark:text-yellow-300 font-medium uppercase tracking-wider">
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
          value={darkMode}
        >
          <option value="on">on</option>
          <option value="off">off</option>
          <option value="system">system preferences</option>
        </select>
      </div>
    </div>
  )
}

export default Settings

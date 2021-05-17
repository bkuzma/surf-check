import React, { useContext } from "react"

import SettingsContext from "../../contexts/settings-context"

function Settings() {
  const { setSwellUnits, setWindUnits, swellUnits, windUnits } = useContext(
    SettingsContext
  )

  return (
    <div className="px-3 space-y-3">
      <div>
        <label
          className="text-xs font-medium text-gray-900 uppercase tracking-wider block mb-1"
          htmlFor="swellUnits"
        >
          🌊 Swell Units:
        </label>
        <select
          className="relative w-full py-1 pl-2 bg-blue-50 rounded-md"
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
        <label
          className="text-xs font-medium text-gray-900 uppercase tracking-wider block mb-1"
          htmlFor="windUnits"
        >
          🌬 Wind Units:
        </label>
        <select
          className="relative w-full py-1 pl-2 bg-blue-50 rounded-md"
          name="windUnits"
          id="windUnits"
          onChange={(event) => setWindUnits(event.currentTarget.value)}
          value={windUnits}
        >
          <option value="mph">mph</option>
          <option value="m/s">m/s</option>
        </select>
      </div>
    </div>
  )
}

export default Settings

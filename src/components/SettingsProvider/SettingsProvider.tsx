import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

interface SettingsContextProps {
  darkModePreference: string
  swellUnits: string
  windUnits: string
  setDarkMode: (setting: string) => void
  setWindUnits: (units: string) => void
  setSwellUnits: (units: string) => void
  shouldUseDarkMode: boolean
}

const SettingsContext = createContext({} as SettingsContextProps)

interface SettingsProviderProps {
  children: ReactNode
}

const LOCAL_STORAGE_KEYS = {
  DARK_MODE: "DARK_MODE",
  SWELL_UNITS: "SWELL_UNITS",
  WIND_UNITS: "WIND_UNITS",
}

export function SettingsProvider(props: SettingsProviderProps) {
  const [darkModePreference, setDarkModePreference] = useState("system")
  const [swellUnits, setSwellUnits] = useState("feet")
  const [windUnits, setWindUnits] = useState("mph")

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
      {props.children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }

  return context
}

import "../styles/globals.css"

import { UserProvider } from "@auth0/nextjs-auth0"
import classNames from "classnames"
import type { AppProps } from "next/app"
import React, { useState } from "react"

import IconCog from "../src/assets/svg/cog.svg"
import IconX from "../src/assets/svg/x.svg"
import Header from "../src/components/Header/Header"
import Settings from "../src/components/Settings/Settings"
import SettingsProvider from "../src/components/SettingsProvider/SettingsProvider"
import SettingsContext from "../src/contexts/settings-context"

function MyApp({ Component, pageProps }: AppProps) {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)

  const onClickSettings = () => {
    setIsSettingsVisible(!isSettingsVisible)
  }

  const onSettingsRequestClose = () => {
    setIsSettingsVisible(false)
  }

  return (
    <SettingsProvider>
      <UserProvider>
        <SettingsContext.Consumer>
          {({ shouldUseDarkMode }) => (
            <div
              className={classNames({
                dark: shouldUseDarkMode,
              })}
            >
              <div className="pb-24 relative bg-gray-50 dark:bg-gray-800 min-h-full text-gray-900 dark:text-gray-300">
                <Header />
                {isSettingsVisible && (
                  <div
                    className={classNames(
                      "fixed z-20 left-0 h-full w-3/5 sm:w-96 top-0 shadow"
                    )}
                  >
                    <Settings onRequestClose={onSettingsRequestClose} />
                  </div>
                )}
                <div className="container mx-auto">
                  <Component {...pageProps} />
                </div>
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
          )}
        </SettingsContext.Consumer>
      </UserProvider>
    </SettingsProvider>
  )
}

export default MyApp

import { useUser } from "@auth0/nextjs-auth0"
import { format, parseISO } from "date-fns"
import { useState } from "react"

import { getWindSpeedInMph } from "../../../lib/util"
import ClipboardList from "../../assets/svg/clipboard-list.svg"
import type { SwellGroup as SwellGroupType } from "../../types"
import DialogAddSurfCheck from "../DialogAddSurfCheck/DialogAddSurfCheck"
import DialogNeedLogin from "../DialogNeedLogin/DialogNeedLogin"
import SwellGroup from "../SwellGroup/SwellGroup"
import Wind from "../Wind/Wind"

export interface ForecastTableRow {
  time: string
  swells: SwellGroupType
  wind: {
    direction?: number
    /** Wind speed in meters per second */
    speed?: number
  }
}

export interface ForecastTableProps {
  times: ForecastTableRow[]
}

function ForecastTable(props: ForecastTableProps) {
  const { user } = useUser()
  const [modalForecastData, setModalForecastData] = useState<
    ForecastTableRow | undefined
  >(undefined)
  const [isDialogAddSurfCheckOpen, setIsSurfCheckDialogOpen] = useState(false)
  const [isDialogNeedLoginOpen, setIsNeedLoginDialogOpen] = useState(false)

  const onClickAddSurfCheck = (forecastData: ForecastTableRow) => {
    if (user) {
      setModalForecastData(forecastData)
      setIsSurfCheckDialogOpen(true)
    } else {
      setIsNeedLoginDialogOpen(true)
    }
  }

  const onCloseDialogNeedLogin = () => {
    setIsNeedLoginDialogOpen(false)
  }

  const onCloseDialogAddSurfCheck = () => {
    setIsSurfCheckDialogOpen(false)
  }

  const tableHeaders = [
    format(parseISO(props.times[0].time), "EE M-dd"),
    "🌬 Wind",
    "🌊 Swell",
    "",
  ]

  return (
    <>
      <table className="mx-auto w-full">
        <thead>
          <tr>
            {tableHeaders.map((tableHeader, i) => (
              <th
                key={i}
                className="px-3 py-3 text-left text-xs font-medium text-gray-900 dark:text-yellow-300 uppercase tracking-wider sticky top-0 bg-yellow-300 dark:bg-gray-900 z-10 w-1/3"
              >
                {tableHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm font-medium text-gray-900 bg-white">
          {props.times.map((time) => {
            return (
              <tr
                key={time.time}
                className="dark:text-gray-300 h-24 bg-white dark:bg-gray-700 even:bg-blue-50 dark:even:bg-gray-800"
              >
                <td className="px-2 sm:px-3 text-xs sm:text-sm">
                  <span>{format(parseISO(time.time), "HH:mm")}</span>
                </td>
                <td className="px-2 sm:px-3">
                  {time.wind.direction && time.wind.speed && (
                    <Wind
                      direction={time.wind.direction}
                      speed={getWindSpeedInMph(time.wind.speed)}
                    />
                  )}
                </td>
                <td className="px-2 sm:px-3">
                  <SwellGroup {...time.swells} />
                </td>
                <td className="pr-2 sm:pr-3">
                  <button
                    className="ml-1"
                    title="Add surf check"
                    onClick={() => onClickAddSurfCheck(time)}
                  >
                    <ClipboardList height="20" width="20" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {isDialogNeedLoginOpen && (
        <DialogNeedLogin isOpen={true} onClose={onCloseDialogNeedLogin} />
      )}
      {isDialogAddSurfCheckOpen && (
        <DialogAddSurfCheck
          forecastData={modalForecastData}
          isOpen={true}
          onClose={onCloseDialogAddSurfCheck}
        />
      )}
    </>
  )
}

export default ForecastTable

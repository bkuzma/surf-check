import { format, parseISO } from "date-fns"
import { useState } from "react"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import useSWR, { mutate } from "swr"

import fetcher from "../../../lib/fetcher"
import Dialog from "../Dialog/Dialog"
import DirectionalArrow from "../DirectionalArrow/DirectionalArrow"
import type { ForecastTableRow } from "../ForecastTable/ForecastTable"
import SwellGroup, { SwellGroupProps } from "../SwellGroup/SwellGroup"

interface DialogAddSurfCheckProps {
  isOpen: boolean
  onClose: () => void
  forecastData?: ForecastTableRow
}

interface FormInput {
  didSurf: boolean
  spotId: string
  windDirection: number
  windSpeed: number
}

interface PutSurfCheckInput extends FormInput {
  swellGroup?: SwellGroupProps
}

interface Spot {
  _id: string
  name: string
}

const SURF_CHECKS_PATH = "/api/surf-checks"

const putSurfCheck = (payload: PutSurfCheckInput) =>
  fetch(SURF_CHECKS_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(response)
  )

export default function DialogAddSurfCheck(props: DialogAddSurfCheckProps) {
  const [formState, setFormState] = useState("initial")
  const { control, register, handleSubmit } = useForm<FormInput>()
  const { data: spots } = useSWR<Spot[]>("/api/spots", fetcher)

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setFormState("submitting")

    try {
      await putSurfCheck({ ...data, swellGroup: props.forecastData?.swells })
      await mutate(SURF_CHECKS_PATH)

      props.onClose()
    } catch (error) {
      setFormState("initial")
      window.alert("Something went wrong, please try again")
    }
  }
  const windDirection = useWatch({
    control,
    name: "windDirection",
    defaultValue: 0,
  })

  const isSubmitting = formState === "submitting"

  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose}>
      <form
        className="text-gray-900 dark:text-gray-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Dialog.Title as="h3" className="text-lg leading-6 font-medium">
          Add Surf Check
        </Dialog.Title>
        <p className="mt-2 text-xs uppercase">
          {props.forecastData &&
            format(parseISO(props.forecastData.time), "EEEE, MMMM do kk:mm")}
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="label">Swell</h4>
            <div className="mt-2">
              <SwellGroup
                primary={props.forecastData?.swells.primary}
                secondary={props.forecastData?.swells.secondary}
                tertiary={props.forecastData?.swells.tertiary}
              />
            </div>
          </div>
          <div className="flex flex-wrap space-y-4 sm:space-y-0">
            <label className="label block w-full flex-shrink-0 sm:w-1/2">
              Wind Speed (mph)
              <input
                className="input-text w-20 mt-1 block"
                type="number"
                {...register("windSpeed")}
              />
            </label>
            <label className="label block w-full flex-shrink-0 sm:w-1/2">
              <div className="flex items-center">
                <span className="mr-2">Wind Direction (degrees)</span>
                <DirectionalArrow degrees={windDirection} />
              </div>
              <input
                className="input-text w-20 mt-1 block"
                type="number"
                {...register("windDirection")}
              />
            </label>
          </div>
          <label className="label block">
            Spot
            <select
              className="mt-1 block w-full select"
              {...register("spotId")}
            >
              <option value={undefined}>Choose a spot</option>
              {spots?.map((spot) => (
                <option key={spot._id} value={spot._id}>
                  {spot.name}
                </option>
              ))}
            </select>
          </label>
          <label className="label flex items-center">
            <input
              {...register("didSurf")}
              type="checkbox"
              className="h-4 w-4 mr-2"
            />
            Paddled out
          </label>
        </div>
        <div className="mt-6 sm:flex sm:flex-row-reverse">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn-green w-full sm:ml-3 sm:w-auto"
          >
            Submit
          </button>
          <button
            type="button"
            className="btn-outline mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  )
}

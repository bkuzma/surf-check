import { useState } from "react"
import { mutate } from "swr"

const SPOTS_PATH = "/api/spots"

const putSpot = (payload) =>
  fetch(SPOTS_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) =>
    response.ok ? response.json() : Promise.reject(response)
  )

export default function SpotAdder() {
  const [inputValue, setInputValue] = useState("")
  const [formState, setFormState] = useState("initial")
  const isSubmitting = formState === "submitting"

  const onChange = (event) => {
    setInputValue(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    setFormState("submitting")

    try {
      await putSpot({ name: inputValue })
      await mutate(SPOTS_PATH)

      setInputValue("")
      setFormState("submitted")
    } catch (error) {
      setFormState("failed")
    }
  }

  return (
    <form className="flex items-center space-x-2" onSubmit={onSubmit}>
      <input
        className="border rounded-md p-2"
        disabled={isSubmitting}
        onChange={onChange}
        placeholder="Spot name"
        type="text"
        value={inputValue}
      />
      <button
        className="rounded-md bg-gray-200 p-2"
        disabled={isSubmitting}
        type="submit"
      >
        Add
      </button>
    </form>
  )
}

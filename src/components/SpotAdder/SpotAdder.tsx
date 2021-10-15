import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { mutate } from "swr"

interface FormInput {
  name: string
}

const SPOTS_PATH = "/api/spots"

const putSpot = (payload: FormInput) =>
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

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value)
  }

  const onSubmit: FormEventHandler = async (event) => {
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
        className="input-text"
        disabled={isSubmitting}
        onChange={onChange}
        placeholder="Spot name"
        type="text"
        value={inputValue}
      />
      <button className="btn-green" disabled={isSubmitting} type="submit">
        Add
      </button>
    </form>
  )
}

import React from "react"

import { ArrowDown } from "../../icons"

interface ArrowProps {
  degrees: number
}

function Arrow(props: ArrowProps) {
  return (
    <ArrowDown
      style={{
        transform: `rotate(${props.degrees + 180}deg)`,
      }}
      width="20"
    />
  )
}

export default Arrow

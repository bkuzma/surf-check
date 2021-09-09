import React from "react"

import { ReactComponent as ArrowDown } from "../../assets/svg/arrow-down.svg"

interface ArrowProps {
  degrees: number
}

function Arrow(props: ArrowProps) {
  return (
    <ArrowDown
      style={{
        transform: `rotate(${props.degrees}deg)`,
      }}
      height="20"
      width="20"
    />
  )
}

export default Arrow

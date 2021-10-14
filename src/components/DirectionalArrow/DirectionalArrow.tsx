import React from "react"

import ArrowDown from "../../assets/svg/arrow-down.svg"

interface ArrowProps {
  degrees: number
  height?: number
  width?: number
}

const Arrow = ({ degrees, height = 20, width = 20 }: ArrowProps) => {
  return (
    <ArrowDown
      className="transition-transform"
      style={{
        transform: `rotate(${degrees}deg)`,
      }}
      height={height}
      width={width}
    />
  )
}

export default Arrow

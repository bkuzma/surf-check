export interface WindMeasurement {
  direction: number
  speed: number
}

export interface SwellMeasurement {
  direction: number
  height: number
  period: number
}

export interface SwellGroup {
  primary?: SwellMeasurement
  secondary?: SwellMeasurement
  tertiary?: SwellMeasurement
}

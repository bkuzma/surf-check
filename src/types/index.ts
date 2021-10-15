export interface Spot {
  _id: string
  name: string
  surfChecks: SurfChecks
}

export interface SurfChecks {
  data: SurfCheck[]
}

export interface SurfCheck {
  _ts: number
  didSurf: boolean
  swellGroup: SwellGroup
  wind: WindMeasurement
}

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

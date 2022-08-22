export interface Spot {
  _id: string
  name: string
  surfChecks: SurfChecks
}

export interface SurfChecks {
  data: SurfCheck[]
}

enum WaveSize {
  SMALL,
  MEDIUM,
  LARGE,
}

export interface SurfCheck {
  _ts: number
  didCloseOut: boolean
  didSurf: boolean
  didWork: boolean
  swellGroup: SwellGroup
  wasLinedUp: boolean
  waveSize: WaveSize
  wind: WindMeasurement
}

export interface WindMeasurement {
  direction: number
  /** Wind speed in miles per hour */
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

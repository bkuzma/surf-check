export interface Combined {
  height: number
  period: number
  direction: number
  compassDirection: string
}

export interface SwellComponent {
  height: number
  period: number
  direction: number
  compassDirection: string
}

export interface Components {
  combined: Combined
  primary: SwellComponent
  secondary?: SwellComponent
  tertiary?: SwellComponent
}

export interface Swell {
  absMinBreakingHeight: number
  absMaxBreakingHeight: number
  probability: number
  unit: string
  minBreakingHeight: number
  maxBreakingHeight: number
  components: Components
}

export interface Wind {
  speed: number
  direction: number
  compassDirection: string
  chill: number
  gusts: number
  unit: string
}

export interface Condition {
  pressure: number
  temperature: number
  weather: string
  unitPressure: string
  unit: string
}

export interface Charts {
  swell: string
  period: string
  wind: string
  pressure: string
  sst?: string
}

export interface RootObject {
  timestamp: number
  localTimestamp: number
  issueTimestamp: number
  fadedRating: number
  solidRating: number
  swell: Swell
  wind: Wind
  condition: Condition
  charts: Charts
}

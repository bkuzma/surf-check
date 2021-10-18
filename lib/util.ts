/** Convert a wind speed from meters per second to miles per hour */
export const getWindSpeedInMph = (windSpeedInMps: number) => {
  return windSpeedInMps * 2.237
}

/** Convert a wind speed from miles per hour to meters per second */
export const getWindSpeedInMps = (windSpeedInMph: number) => {
  return windSpeedInMph / 2.237
}

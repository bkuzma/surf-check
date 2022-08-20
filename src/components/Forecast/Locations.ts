export type Location = {
  name: string
  latitude: number
  longitude: number
  mswId: string
}

export const LOCATIONS: Location[] = [
  {
    name: "Hellestø",
    latitude: 58.8414177,
    longitude: 5.56097,
    // Hellestø ID on Magic Seaweed is actually 1889 but our API key is only valid for Bore
    mswId: "1886",
  },
  {
    name: "Bore",
    latitude: 58.7974,
    longitude: 5.5384,
    mswId: "1886",
  },
]

import { VercelRequest, VercelResponse } from "@vercel/node"

import { listSpots } from "../../lib/fauna"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const spots = await listSpots()

  response.json(spots)
}

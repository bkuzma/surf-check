import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import type { NextApiHandler } from "next"

import { getSpot } from "../../../lib/fauna"

const handler: NextApiHandler = async (request, response) => {
  const user = getSession(request, response)?.user

  if (!user) {
    return response.status(403).end()
  }

  const handlers: {
    [key: string]: () => void
  } = {
    GET: async () => {
      const spot = await getSpot(request.query.id)

      if (spot.auth0UserId !== user.sub) {
        return response.status(403).end()
      }

      response.json(spot)
    },
  }

  if (!request.method || !handlers[request.method]) {
    return response.status(405).end()
  }

  await handlers[request.method]()
}

export default withApiAuthRequired(handler)

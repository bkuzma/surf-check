import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import type { NextApiHandler } from "next"

import { createSpot, listSpots } from "../../../lib/fauna"

const handler: NextApiHandler = async (request, response) => {
  const user = getSession(request, response)?.user

  if (!user) {
    return response.status(403).end()
  }

  const handlers: {
    [key: string]: () => void
  } = {
    GET: async () => {
      const spots = await listSpots(user.sub)

      response.json(spots)
    },

    POST: async () => {
      const {
        body: { name },
      } = request
      const created = await createSpot({
        auth0UserId: user.sub,
        name,
      })

      response.json(created)
    },
  }

  if (!request.method || !handlers[request.method]) {
    return response.status(405).end()
  }

  await handlers[request.method]()
}

export default withApiAuthRequired(handler)

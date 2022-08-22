import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import type { NextApiHandler } from "next"

import { createSurfCheck } from "../../lib/fauna"

const handler: NextApiHandler = async (request, response) => {
  const user = getSession(request, response)?.user

  if (!user) {
    return response.status(403).end()
  }

  const handlers: {
    [key: string]: () => void
  } = {
    POST: async () => {
      const {
        body: {
          didCloseOut,
          didSurf,
          didWork,
          spotId,
          swellGroup,
          wasLinedUp,
          waveSize,
          windDirection,
          windSpeed,
        },
      } = request
      const created = await createSurfCheck({
        auth0UserId: user.sub,
        didCloseOut,
        didSurf,
        didWork,
        spot: {
          connect: spotId,
        },
        swellGroup: {
          create: {
            primary: {
              create: swellGroup.primary,
            },
            ...(swellGroup.secondary && {
              secondary: {
                create: swellGroup.secondary,
              },
            }),
            ...(swellGroup.tertiary && {
              tertiary: {
                create: swellGroup.tertiary,
              },
            }),
          },
        },
        wasLinedUp,
        waveSize,
        wind: {
          create: {
            direction: Number(windDirection),
            speed: Number(windSpeed),
          },
        },
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

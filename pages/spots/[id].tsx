import { format } from "date-fns"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import useSWR from "swr"

import fetcher from "../../lib/fetcher"
import LoadingIndicator from "../../src/components/LoadingIndicator/LoadingIndicator"
import SwellGroup from "../../src/components/SwellGroup/SwellGroup"
import Wind from "../../src/components/Wind/Wind"
import type {
  SwellGroup as SwellGroupType,
  WindMeasurement,
} from "../../src/types"

interface Spot {
  name: string
  surfChecks: SurfChecks
}

interface SurfChecks {
  data: SurfCheck[]
}

interface SurfCheck {
  _ts: number
  didSurf: boolean
  swellGroup: SwellGroupType
  wind: WindMeasurement
}

export default function Spot() {
  const router = useRouter()
  const { data: spot } = useSWR<Spot>(`/api/spots/${router.query.id}`, fetcher)

  if (!spot)
    return (
      <div className="p-4 flex justify-center">
        <LoadingIndicator />
      </div>
    )

  return (
    <div className="p-4">
      <h2 className="text-sm font-medium uppercase tracking-wider">
        {spot?.name} Surf Checks:
      </h2>
      {spot.surfChecks.data.length > 0 ? (
        <ul className="divide-y">
          {spot.surfChecks.data.map((surfCheck, i) => (
            <li className="py-4 text-xs sm:text-sm space-y-4" key={i}>
              <div className="flex items-center">
                <div className="w-1/2 font-medium uppercase tracking-wider">
                  {format(surfCheck._ts / 1000, "MM-dd-yyyy kk:mm")}
                </div>
                <div className="w-1/2">
                  <span className="font-medium uppercase tracking-wider">
                    Paddled out:
                  </span>{" "}
                  {surfCheck.didSurf ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <h4 className="font-medium uppercase tracking-wider">
                    🌊 Swell
                  </h4>
                  <div className="mt-2">
                    <SwellGroup {...surfCheck.swellGroup} />
                  </div>
                </div>
                <div className="w-1/2">
                  <h4 className="font-medium uppercase tracking-wider">
                    🌬 Wind
                  </h4>
                  <div className="mt-2">
                    <Wind {...surfCheck.wind} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs mt-4">No surf checks yet.</p>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  return {
    props: {
      id,
    },
  }
}

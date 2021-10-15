import { useUser } from "@auth0/nextjs-auth0"
import Head from "next/head"
import Link from "next/link"
import useSWR from "swr"

import fetcher from "../../lib/fetcher"
import LoadingIndicator from "../../src/components/LoadingIndicator/LoadingIndicator"
import SpotAdder from "../../src/components/SpotAdder/SpotAdder"

function SpotList() {
  const { data, error } = useSWR("/api/spots", fetcher)

  if (error) return <div>failed to load</div>
  if (!data)
    return (
      <div className="flex justify-center">
        <LoadingIndicator />
      </div>
    )

  return (
    <ul className="space-y-2">
      {data.map((spot) => (
        <li key={spot.name}>
          <Link href={`/spots/${spot._id}`}>
            <a className="text-sm underline uppercase tracking-wider">
              {spot.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Spots() {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  const isLoggedIn = !isLoading && user

  return (
    <div className="p-4">
      <Head>
        <title>Jæren Surf Check - Spots</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-base font-medium uppercase tracking-wider">Spots</h2>
      {isLoggedIn && (
        <div className="mt-4">
          <SpotAdder />
        </div>
      )}
      <div className="mt-4">
        {isLoggedIn ? (
          <SpotList />
        ) : (
          <div>
            {/* eslint-disable @next/next/no-html-link-for-pages */}
            <a className="underline" href="/api/auth/login">
              Log in
            </a>{" "}
            to see your spots.
            {/* eslint-enable @next/next/no-html-link-for-pages */}
          </div>
        )}
      </div>
    </div>
  )
}

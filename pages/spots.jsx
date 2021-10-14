import { useUser } from "@auth0/nextjs-auth0"
import Head from "next/head"
import Link from "next/link"
import useSWR from "swr"

import SpotAdder from "../src/components/SpotAdder/SpotAdder"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function SpotList() {
  const { data, error } = useSWR("/api/spots", fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ul>
      {data.map((spot) => (
        <li key={spot.name}>
          <Link href={`/spots/${spot._id}`}>
            <a className="font-medium underline text-gray-900">{spot.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Spots() {
  const { user, isLoading } = useUser()

  const isLoggedIn = !isLoading && user

  return (
    <div className="p-4">
      <Head>
        <title>Jæren Surf Check - Spots</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-lg text-gray-900">Spots</h2>
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
            <a className="underline" href="/api/auth/login">
              Log in
            </a>{" "}
            to see your spots.
          </div>
        )}
      </div>
    </div>
  )
}

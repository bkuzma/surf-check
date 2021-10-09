import Head from "next/head"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Spots() {
  const { data, error } = useSWR("/api/spots", fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Head>
        <title>Jæren Surf Check - Spots</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data.map((spot) => (
          <li key={spot.name}>{spot.name}</li>
        ))}
      </ul>
    </>
  )
}

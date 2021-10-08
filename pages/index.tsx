import Head from "next/head"

import Forecast from "../src/components/Forecast/Forecast"

export default function Home() {
  return (
    <>
      <Head>
        <title>Jæren Surf Check - Forecast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Forecast />
    </>
  )
}

import { VercelRequest, VercelResponse } from "@vercel/node"
const fetch = require("node-fetch")

const getMagicSeaweedForcast = async (
  request: VercelRequest,
  response: VercelResponse
) => {
  const forecast = await fetch(
    `http://magicseaweed.com/api/${process.env.MSW_API_TOKEN}/forecast/?spot_id=1886&units=us`
  )
  const data = await forecast.json()

  response.json(data)
}

export default getMagicSeaweedForcast

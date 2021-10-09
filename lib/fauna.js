import { gql, GraphQLClient } from "graphql-request"

const CLIENT_SECRET = process.env.FAUNA_ADMIN_KEY
const FAUNA_GRAPHQL_BASE_URL = "https://graphql.eu.fauna.com/graphql"

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
})

export const listSpots = () => {
  const query = gql`
    query Spots($size: Int) {
      spots(_size: $size) {
        data {
          _id
          _ts
          name
        }
      }
    }
  `

  return graphQLClient
    .request(query, { size: 999 })
    .then(({ spots: { data } }) => data)
}

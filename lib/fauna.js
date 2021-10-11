import { gql, GraphQLClient } from "graphql-request"

const CLIENT_SECRET = process.env.FAUNA_ADMIN_KEY
const FAUNA_GRAPHQL_BASE_URL = "https://graphql.eu.fauna.com/graphql"

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
})

export const listSpots = (auth0UserId) => {
  const query = gql`
    query Spots($auth0UserId: String!, $size: Int) {
      spotsByUser(auth0UserId: $auth0UserId, _size: $size) {
        data {
          _id
          _ts
          name
        }
      }
    }
  `

  return graphQLClient
    .request(query, { auth0UserId, size: 999 })
    .then(({ spotsByUser: { data } }) => data)
}

export const createSpot = (newSpot) => {
  const mutation = gql`
    mutation CreateSpot($input: SpotInput!) {
      createSpot(data: $input) {
        _id
        _ts
        name
      }
    }
  `

  return graphQLClient.request(mutation, { input: newSpot })
}

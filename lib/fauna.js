import { gql, GraphQLClient } from "graphql-request"

const CLIENT_SECRET = process.env.FAUNA_ADMIN_KEY
const FAUNA_GRAPHQL_BASE_URL = process.env.FAUNA_GRAPHQL_BASE_URL

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

export const getSpot = (id) => {
  const query = gql`
    query GetSpot($id: ID!) {
      findSpotByID(id: $id) {
        _id
        _ts
        auth0UserId
        name
        surfChecks {
          data {
            _ts
            didCloseOut
            didSurf
            didWork
            swellGroup {
              primary {
                direction
                height
                period
              }
              secondary {
                direction
                height
                period
              }
              tertiary {
                direction
                height
                period
              }
            }
            wasLinedUp
            waveSize
            wind {
              direction
              speed
            }
          }
        }
      }
    }
  `

  return graphQLClient
    .request(query, { id })
    .then(({ findSpotByID }) => findSpotByID)
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

export const createSurfCheck = (newSurfCheck) => {
  const mutation = gql`
    mutation CreateSurfCheck($input: SurfCheckInput!) {
      createSurfCheck(data: $input) {
        _id
        _ts
      }
    }
  `

  return graphQLClient.request(mutation, { input: newSurfCheck })
}

![Vercel](https://vercelbadge.vercel.app/api/bkuzma/surf-check)

## Introduction

Surf Check started as a surf forecasting app for the Jæren area of Norway. I found myself constantly checking multiple sources for my surf forecast, namely one site for swell information and another for wind, and I thought it'd be great to consolidate the two data sources in one place.

Later on, after rereading some of William Finnegan's [writings](https://www.newyorker.com/magazine/1992/08/24/playing-docs-games-part-one) about Mark "Doc" Renneker, a San Francisco-based surfer who kept a meticuous journal of surf conditions every single time he went surfing, I thought it'd be great to add a journaling feature to the app.

This project also gave me an excuse to learn [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [useSWR](https://swr.vercel.app/), [auth0](https://auth0.com/) and [fauna](https://fauna.com/), among others.

## Local Development

To get the project running locally, run the following in the project directory:

```sh
# Install dependencies
yarn install

# Log in to Vercel
npx vercel login

# Link project to Vercel
npx vercel link

# Environment variables are set in Vercel; this command pulls them down
# into a local .env.local file
yarn pull-env-vars

# Start Next.js development server
yarn dev
```

To serve the built version of our app:

```sh
# Bundles the app in production mode
yarn build

# Starts a server that serves the built files
yarn start
```

To lint:

```sh
yarn lint
```

## Deployment

This project is hosted with [Vercel](https://vercel.com/). When a branch is pushed to remote, Vercel creates a dynamic review app from that branch. Any pushes to the `main` branch result in a deployment to the production site.

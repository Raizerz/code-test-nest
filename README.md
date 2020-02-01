# Documentation
> CARS API SERVICE

## Table of Contents
- [Getting started](#getting-started)
- [Development](#development)
- [Production](#production)
- [Tests](#tests)

## Getting started
### Preparing
- Create `.env` and `.env.test` config files inside root directory:

```shell
cp .env.example .env && cp .env.test.example .env.test
```
- Run `yarn install` command.

### Development
Start docker container for PostgreSQL DB:
```shell
npm run docker-middleware-dev
```
After that, you can serve the app with `yarn start` command.

### Production
Run docker containers with following command:
```shell
docker-compose up
```

## Tests
* To run unit tests, run `yarn test` command.
* To run e2e tests, you must be sure that docker container for PostgreSQL was started in development mode (see development section above). After that, test DB will be createad for e2e purposes. You can start e2e tests by `yarn test:e2e` command.

# Holis Test backend

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

## Prerequisite

You need to have Node on your machine (version 12 minimum)
Docker alse needs to be installed to provide the database

## Installation

```bash
$ yarn
```

then build the app with

```bash
$ yarn build
```

or if you use NPM

```bash
$ npm install
```

then build the app with

```bash
$ npm run build
```

## Initialisation of the Database

We use a docker container of PostgreSQL for the database.
After installing docker just run the next command to pull the postgreSQL image and run the container.

```bash
$ docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

## Running the app

Synchronisation + migration of the DB is automatic when you run the app.

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

or

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

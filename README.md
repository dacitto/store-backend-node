# Storefront Backend Project

Storefront Backend Project is the second project in the [Udacity’s Full Stack JavaScript Developer Nanodegree](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067).

# Project Overview

Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.

Your job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

Your application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.

# Technologies and tools

#### Server

- [NodeJs](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)

#### Database

- [Postgresql](https://www.postgresql.org/)

#### Tests

- [Jasmine](https://jasmine.github.io/)
- [Supertest](https://github.com/ladjs/supertest#readme)

#### Code Formatters

- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)

## API Endpoints

#### Products

- Index
  - GET
  - `http://localhost:3000/api/products`
- Show
  - GET
  - `http://localhost:3000/api/products/:id`
- Create [token required]
  - POST
  - `http://localhost:3000/api/products/create`
  ```js
   {
   product_name: string,
   price: number,
   }
  ```

#### Users

- Index [token required]
  - GET `http://localhost:3000/api/users`
- Show [token required]
  - GET
  - `http://localhost:3000/api/show/:userId`
- Create a new user[token required]
  - POST
  - `http://localhost:3000/api/users/create`
  ```js
   {
   username: string,
   first_name: string,
   last_name:string,
   password: string
   }
  ```

#### Auth

- register
  - POST
  - `http://localhost:3000/api/auth/register`
  - request body
    ```js
    {
        username:string,
        password:string
    }
    ```
- Login
  - POST
  - `http://localhost:3000/api/auth/login`
  - request body
    ```js
    {
    username: string,
    first_name: string,
    last_name:string,
    password: string
    }
    ```

#### Orders

- Index [token required] (all orders)
- GET `http://localhost:3000/api/orders`
- Show [token required]
- GET
- `http://localhost:3000/api/orders/:orderId`
- Create New Order[token required]

- POST
- `http://localhost:3000/api/order/create`

  - request body
    ```js
    {
    product_name: string,
    price: number,
    }
    ```

- Current Order by user (args: user id)[token required]
  - GET
  - `http://localhost:3000/api/orders/ordersByUser/:userId`
- Current All Orders [token required]
  - GET
  - `http://localhost:3000/api/orders/`
- Current specific Order [token required]
  - GET
  - `http://localhost:3000/api/orders/:orderId`
- Create an order
  - POST
  - `http://localhost:3000/api/orders/create`
  - request body
    ```
    {
    product_name: string,
    price: number,
    }
    ```

## Installation

#### Requirements

- postgress

  - you have to create two databases:
    `store` and `store_test`

- npm
  - you have to install `db-migrate` globaly by runinig the following command:
  ```
  npm i -g db-migrate
  ```

### To run the app you need to:

open the project directory with cmd, then you can run the following commands:

- open the project directory then use the following commend

`npm i` or `pnpm i` to install project dependencies.

- create `.env` file and copy the `.env.example` to it.

```s
ENVIRONMENT='dev'
APP_NAME='store-backend'
PORT=3000

POSTGRES_HOST='localhost'
POSTGRES_PORT=5432
POSTGRES_USER='postgres'
POSTGRES_PASSWORD='Pass123'
POSTGRES_DB='store'
POSTGRES_TEST_DB='store_test'
#  create Jwt Secret Rounds pepper
JWT_SECRET='tugffjeh322 1'
BCRYPT_ROUNDS=5
BCRYPT_PASSWORD_PEPPER =RX

```

- run `db-migrate up` to migrate the database.
- run server using `npm watch` or `pnpm watch`
  The server will run on [localhost:3000](http://localhost:3000/).

## Other useful commands:

- `npm run build` compile typescript to /dist folder
- `npm run lint` run Eslint
- `npm run test` run unit tests (jasmine)
- `npm run start` start the server on production mode
- `npm run prettier` formate the code
- `npm run dev` watch the project in development mode
- `npm run tsc` compile typescript
- `db:up` database megrate up
- `db:down tsc` database megrate down

#### Special Thanks to Our session lead:

- [Mahmoud Kassem](https://github.com/mahkassem).

# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

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
- Create N[token required]
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

## Data Shapes

#### Product

TABLE products

```sql
   id serial PRIMARY KEY,
   product_name VARCHAR(255) NOT NULL UNIQUE,
   price REAL
```

#### User

TABLE users

```sql
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
```

#### Orders

TABLE orders

```sql
    id serial PRIMARY KEY,
    user_id INT,
    product_id INT,
    status_of_order VARCHAR(255) NOT NULL,
    quantity INT,
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
```

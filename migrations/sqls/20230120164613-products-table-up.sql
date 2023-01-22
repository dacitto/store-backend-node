CREATE TABLE products (
    id serial PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL UNIQUE,
    price REAL
);


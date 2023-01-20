CREATE TABLE orders (
    id serial PRIMARY KEY,
    user_id INT,
    product_id INT,
    status_of_order VARCHAR(255) NOT NULL,
    quantity INT,
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

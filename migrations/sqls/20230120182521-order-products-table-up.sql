CREATE TABLE order_products (
    id serial PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id),
    CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id)
);
CREATE TABLE orders (
    id serial PRIMARY KEY,
    user_id INT,
    status_of_order VARCHAR(255) NOT NULL,
    CONSTRAINT fk_userid FOREIGN KEY(user_id) REFERENCES users(id)
);

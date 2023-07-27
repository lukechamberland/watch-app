CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR (255) NOT NULL, 
  email VARCHAR (255) NOT NULL,
  login_auth VARCHAR (255) NOT NULL
);

CREATE TABLE order_products (
  id INTEGER PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL
);

CREATE TABLE orders (
  id INTEGER NOT NULL PRIMARY KEY,
  order_products_id INTEGER NOT NULL REFERENCES order_products(id),
  user_id INTEGER REFERENCES users(id), 
  subtotal_amount INTEGER NOT NULL,
  tax_amount INTEGER NOT NULL,
  total_amount INTEGER NOT NULL
);


CREATE TABLE products (
  id INTEGER PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  image_url VARCHAR (255) NOT NULL, 
  description VARCHAR (255) NOT NULL,
  name VARCHAR(255) NOT NULL, 
  price INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE order_products ADD order_id INTEGER REFERENCES orders(id);

ALTER TABLE orders
ADD order_date DATE;

ALTER TABLE products
ADD favourite BOOLEAN DEFAULT FALSE;

ALTER TABLE products
ADD inventory INTEGER;

ALTER TABLE products
ADD available BOOLEAN DEFAULT TRUE;

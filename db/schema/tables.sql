CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR (255) NOT NULL, 
  email VARCHAR (255) NOT NULL,
  login_auth VARCHAR (255) NOT NULL
);

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  order_id INTEGER REFERENCES orders(id),
  quantity INTEGER NOT NULL
);

CREATE TABLE orders (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id), 
  subtotal_amount INTEGER NOT NULL,
  tax_amount INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  order_date DATE
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  image_url VARCHAR (255) NOT NULL, 
  description VARCHAR (255) NOT NULL,
  name VARCHAR(255) NOT NULL, 
  price INTEGER NOT NULL DEFAULT 0, 
  inventory INTEGER DEFAULT 1, 
  available BOOLEAN DEFAULT TRUE
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL, 
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  is_active BOOLEAN DEFAULT TRUE
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




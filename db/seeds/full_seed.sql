INSERT INTO users (user_name, email, login_auth)
VALUES
  ('John Doe', 'john.doe@example.com', 'password123'),
  ('Jane Smith', 'jane.smith@example.com', 'securepass321'),
  ('Alice Johnson', 'alice.johnson@example.com', 'mysecretpass'),
  ('Joe Smith', 'JoeSmith@email.com', 'PW123'),
  ('Luke Chamberland', 'luke.chamberland@shaw.ca', 'google-oauth2|114410736718166296363'),
  ('JamesScott', 'jamesscott@example.com', 'examplepassword');

INSERT INTO products (user_id, image_url, description, name, price, favourite, inventory, available)
VALUES
  (1, 'https://example.com/images/watch1.jpg', 'Classic black leather watch', 'Leather Strap Watch', 100, 't', 10, 't'),
  (2, 'https://example.com/images/watch2.jpg', 'Elegant stainless steel watch', 'Stainless Steel Watch', 120, 'f', 8, 't'),
  (3, 'https://example.com/images/watch3.jpg', 'Sports chronograph watch', 'Chronograph Sports Watch', 80, 't', 15, 't'),
  (4, 'example_url', 'new watch', 'Grey watch', 75, 't', 25, 't'),
  (5, 'example_url_2', 'new watch 2', 'white watch', 150, 't', 25, 't'),
  (6, 'example_url_3', 'new watch 3', 'Rose Gold Watch', 220, 't', 25, 't');

INSERT INTO orders (order_products_id, user_id, subtotal_amount, tax_amount, total_amount, order_date)
VALUES
  (1, 1, 220, 22, 242, '2023-07-14'),
  (2, 2, 240, 24, 264, '2023-07-15'),
  (3, 3, 320, 32, 352, '2023-07-16');

INSERT INTO order_products (product_id, quantity)
VALUES
  (1, 2),
  (2, 1),
  (3, 3);
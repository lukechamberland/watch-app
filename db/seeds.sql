INSERT INTO products (user_id, image_url, description, name, price, inventory, available)
VALUES
  (1, 'https://example.com/images/watch1.jpg', 'Classic black leather watch', 'Leather Strap Watch', 100, 10, 'true'),
  (2, 'https://example.com/images/watch2.jpg', 'Elegant stainless steel watch', 'Stainless Steel Watch', 120, 8, 'true'),
  (3, 'https://example.com/images/watch3.jpg', 'Sports chronograph watch', 'Chronograph Sports Watch', 80, 15, 'true'),
  (4, 'example_url', 'new watch', 'Grey watch', 75, 25, 'true'),
  (4, 'example_url_2', 'new watch 2', 'white watch', 150, 25, 'true'),
  (7, 'example_url_3', 'new watch 3', 'Rose Gold Watch', 220, 25, 'true'),
  (7, 'example_url_4', 'new watch 5', 'Silver Watch', 220, 25, 'true');

  INSERT INTO order_products (product_id, quantity, order_id)
VALUES
  (1, 2, 1),
  (2, 1, 2),
  (3, 3, 3),
  (4, 1, 3);

  INSERT INTO orders (user_id, subtotal_amount, tax_amount, total_amount, order_date)
VALUES
  (2, 220, 22, 242, '2023-07-14'),
  (4, 240, 24, 264, '2023-07-15'),
  (7, 320, 32, 352, '2023-07-16');

    INSERT INTO favourites (id, user_id, product_id, is_active)
VALUES
  (1, 1, 2, true),
  (2, 7, 4, true),
  (3, 7, 5, true);


SELECT favourites.user_id, favourites.product_id, favourites.is_active, products.name
FROM favourites 
JOIN products ON products.id=products.id
WHERE favourites.is_active IS true AND products.id = favourites.product_id;

SELECT orders.user_id, orders.total_amount, orders.order_date, order_products.order_id, products.name, products.image_url, products.price
FROM orders
JOIN order_products ON order_products.order_id = orders.id
JOIN products ON products.id = order_products.product_id
WHERE orders.user_id = 7;
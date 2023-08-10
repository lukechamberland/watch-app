INSERT INTO products (user_id, image_url, description, name, price, inventory, available, category)
VALUES
  (1, 'https://www.raymond-weil.us/wp-content/uploads/2019/03/RW_toccata_5485-stc-20001_packshot.png', 'Classic black leather watch', 'Leather Strap Watch', 100, 10, 'true', 'mens'),
  (2, 'https://ca.nixon.com/cdn/shop/files/A1342-5088-view1.png?v=1684460839', 'Elegant stainless steel watch', 'Stainless Steel Watch', 120, 8, 'true', 'womens'),
  (3, 'https://timex.ca/cdn/shop/products/TW7C77500.png?v=1687300285&width=900', 'chronograph watch', 'Chronograph Watch', 80, 15, 'true', 'kids'),
  (4, 'https://www.nixon.com/cdn/shop/files/A1180-001-view1_dfd05198-6007-46f4-997c-a54b82d2c4fd_500x.png?v=1684461195', 'new watch', 'Grey watch', 75, 25, 'true', 'athletic'),
  (4, 'https://ca.nixon.com/cdn/shop/files/A099-5003-view1.png?v=1684460092', 'new watch 2', 'white watch', 150, 25, 'true', 'womens'),
  (7, 'https://timex.ca/cdn/shop/products/TW2V52500.png?v=1687301810&width=900', 'new watch 3', 'Rose Gold Watch', 220, 25, 'true', 'womens'),
  (7, 'https://www.bogartsjewellers.com/cdn/shop/products/Dress_1_400x500.png?v=1629373102', 'new watch 5', 'Silver Watch', 220, 25, 'true', 'mens'),
  (5, 'https://www.bell.ca/Styles/images/109452_Apple_Watch_SE2_40mm_Strlite_Sprt_Bnd_lrg1.png', 'Second Generation', 'Apple Watch SE', 250, 2, 'true', 'athletic'),
  (7, 'https://www.nixon.com/cdn/shop/files/A1057-1031-view1_e9cc997a-e3cb-41e3-8269-711541168606.png?v=1684461002', 'All Black', 'Porter', 190, 4, 'true', 'mens');

  INSERT INTO order_products (product_id, quantity, order_id)
VALUES
  (11, 2, 4),
  (12, 1, 5),
  (13, 3, 6),
  (14, 1, 6);

  INSERT INTO orders (user_id, subtotal_amount, tax_amount, total_amount, order_date)
VALUES
  (2, 220, 22, 242, '2023-07-14'),
  (4, 240, 24, 264, '2023-07-15'),
  (7, 320, 32, 352, '2023-07-16');

    INSERT INTO favourites (id, user_id, product_id, is_active)
VALUES
  (1, 1, 12, true),
  (2, 7, 14, true),
  (3, 7, 15, true);


SELECT favourites.user_id, favourites.product_id, favourites.is_active, products.name
FROM favourites 
JOIN products ON products.id=products.id
WHERE favourites.is_active IS true AND products.id = favourites.product_id;

SELECT orders.user_id, orders.total_amount, orders.order_date, order_products.order_id, products.name, products.image_url, products.price
FROM orders
JOIN order_products ON order_products.order_id = orders.id
JOIN products ON products.id = order_products.product_id
WHERE orders.user_id = 7;

UPDATE products SET image_url='https://ca.nixon.com/cdn/shop/files/A1342-5088-view1.png?v=1684460839' WHERE id=12;
UPDATE products SET image_url='https://timex.ca/cdn/shop/products/TW7C77500.png?v=1687300285&width=900' WHERE id=13;


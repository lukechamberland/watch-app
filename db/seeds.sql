INSERT INTO products (user_id, image_url, description, name, price, inventory, available, category)
VALUES
  (1, 'https://www.raymond-weil.us/wp-content/uploads/2019/03/RW_toccata_5485-stc-20001_packshot.png', 'Classic black leather watch', 'Leather Strap Watch', 100, 10, 'true', 'mens'),
  (2, 'https://fossil.scene7.com/is/image/FossilPartners/MK5774_main?$sfcc_fos_hi-res$', 'Elegant stainless steel watch', 'Stainless Steel Watch', 120, 8, 'true', 'womens'),
  (3, 'https://chrono-kids-store.com/cdn/shop/products/91_acdb5e1b-8a92-485d-bee3-6f479cec3d38.jpg?v=1654678034', 'Sports chronograph watch', 'Chronograph Sports Watch', 80, 15, 'true', 'kids'),
  (4, 'https://cdn.shopify.com/s/files/1/1170/6510/products/165065437114469723.jpg?v=1670866736', 'new watch', 'Grey watch', 75, 25, 'true', 'athletic'),
  (4, 'https://cdn.shopify.com/s/files/1/0578/5675/3853/products/whitesolarwatchsilvercasesilvermesh_400x.jpg?v=1678906796', 'new watch 2', 'white watch', 150, 25, 'true', 'womens'),
  (7, 'https://ca.rosefieldwatches.com/cdn/shop/products/TWR-T50_5dc0bfc3-a9bf-49e2-ae84-a8d574672203_1200x.jpg?v=1614785640', 'new watch 3', 'Rose Gold Watch', 220, 25, 'true', 'womens'),
  (7, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.carlheim.com%2Fproducts%2Fadam-watch-link-silver-blue-40mm&psig=AOvVaw2r9Ur-tdxjV2mYgSBaXOyA&ust=1691613283427000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCutdn0zYADFQAAAAAdAAAAABAJ', 'new watch 5', 'Silver Watch', 220, 25, 'true', 'mens');

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
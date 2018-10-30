USE bamazon;

-- mock 10 products in the database

INSERT INTO products 
(product_name, department_name, price,stock_quantity,product_sales)
VALUES 
("Apple Watch","electronics",499,100,0),
("Nintendo Switch","electronics",299,100,0),
("Kettle Chips","snack",4.99,100,0),
("Coco-cola","beverage",1.99,100,0),
("Kit-Kat","snack",2.66,100,0),
("Dyson vacuum","electronics",399,100,0),
("Bose Headphone","electronics",349.99,100,0),
("Logitech Mouse","electronics",9.99,100,0),
("Head and Shoulders shampoo","personal care",3.99,100,0),
("Le Creuset Pot","cookware",129.99,100,0);


INSERT INTO departments 
(product_name, department_name, price,stock_quantity,product_sales)
VALUES 

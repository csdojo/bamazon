USE bamazon;

-- mock 10 products in the database

INSERT INTO products 
(product_name, department_name, price,stock_quantity)
VALUES 
("Apple Watch","electronics",499,100),
("Nintendo Switch","electronics",299,100),
("Kettle Chips","snack",4.99,100),
("Coco-cola","beverage",1.99,100),
("Kit-Kat","snack",2.66,100),
("Dyson vacuum","electronics",399,100),
("Bose Headphone","electronics",349.99,100),
("Logitech Mouse","electronics",9.99,100),
("Head and Shoulders shampoo","personal care",3.99,100),
("Le Creuset Pot","cookware",129.99,100);
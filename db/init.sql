CREATE DATABASE IF NOT EXISTS resturant;
USE resturant;

CREATE TABLE IF NOT EXISTS restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  meal VARCHAR(50) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.0
);

INSERT INTO restaurants (name, meal, rating) VALUES
('Pizza House', 'pizza', 4.6),
('Shawarma King', 'shawarma', 4.7),
('Burger Hub', 'burger', 4.4);
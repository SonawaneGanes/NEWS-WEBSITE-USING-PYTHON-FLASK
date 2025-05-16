CREATE DATABASE my_news_app;

USE my_news_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE NOT NULL,
    state VARCHAR(100),
    city VARCHAR(100),
    password VARCHAR(100) NOT NULL
);


USE my_news_app;
SELECT * FROM news;

SELECT * FROM users;

CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    image_url VARCHAR(255),  -- optional
    published_at DATETIME
);

CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes(
  id SERIAL PRIMARY KEY,
  title TEXT,
  image_url TEXT,
  description TEXT,
  user_id INTEGER
);

INSERT INTO 
dishes (title, image_url, description)
values ('cake', 'https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4087-feature-2.jpg', 'yum');

INSERT INTO 
dishes (title, image_url, description)
values ('waffles', 'https://leitesculinaria.com/wp-content/uploads/2021/05/belgian-liege-waffles-1200.jpg', 'yum yum');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email TEXT,
  password_digest TEXT
);





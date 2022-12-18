DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS activities_tags CASCADE;
DROP TABLE IF EXISTS cities CASCADE;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL,
  name TEXT NOT NULL, 
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  PRIMARY KEY (user_id)
  );
  
CREATE TABLE IF NOT EXISTS activities (
  activity_id SERIAL,
  title TEXT UNIQUE NOT NULL, 
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  photo TEXT NOT NULL,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  city_id INT NOT NULL,
  PRIMARY KEY (activity_id),
  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  FOREIGN KEY (city_id)
    REFERENCES cities (city_id)
  );

CREATE TABLE IF NOT EXISTS comments (
  comments_id SERIAL,
  user_id INT NOT NULL,
  activity_id INT NOT NULL,
  comment TEXT,
  rating TEXT NOT NULL,
  PRIMARY KEY (comments_id),
  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  FOREIGN KEY (activity_id)
    REFERENCES activities (activity_id)
  );

CREATE TABLE IF NOT EXISTS tags (
  tags_id SERIAL,
  name TEXT, 
  PRIMARY KEY (tags_id)
  );

INSERT INTO tags(name) VALUES ('nature'),('city'),('lake/beach'),('art'),('food'),('music'),('sport');

CREATE TABLE IF NOT EXISTS activities_tags (
  activities_tags_id SERIAL,
  tags_id INT NOT NULL,
  activity_id INT NOT NULL,
  PRIMARY KEY (activities_tags_id),
  FOREIGN KEY (tags_id)
    REFERENCES tags (tags_id),
  FOREIGN KEY (activity_id)
    REFERENCES activities (activity_id)
  );

CREATE TABLE IF NOT EXISTS cities (
  city_id SERIAL,
  name TEXT, 
  PRIMARY KEY (city_id)
  );



-- CREATE TABLE account_roles (
--   user_id INT NOT NULL,
--   role_id INT NOT NULL,
--   grant_date TIMESTAMP,
--   PRIMARY KEY (user_id, role_id),
--   FOREIGN KEY (role_id)
--       REFERENCES roles (role_id),
--   FOREIGN KEY (user_id)
--       REFERENCES accounts (user_id)
-- );

--   CREATE TABLE Persons (
--     PersonID int,
--     LastName varchar(255),
--     FirstName varchar(255),
--     Address varchar(255),
--     City varchar(255)
-- );
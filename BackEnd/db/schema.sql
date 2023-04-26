DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS activities_tags CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS provinces CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL,
  username TEXT UNIQUE NOT NULL, 
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  PRIMARY KEY (user_id)
  );


CREATE TABLE IF NOT EXISTS sessions (
  session_id TEXT NOT NULL, 
  date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  PRIMARY KEY (session_id),
  FOREIGN KEY (user_id)
    REFERENCES users (user_id)
  );

CREATE TABLE IF NOT EXISTS provinces (
  province TEXT, 
  province_id TEXT,
  PRIMARY KEY (province_id)
  );

INSERT INTO provinces(province, province_id) VALUES ('Alberta', 'AB'), ('British Columbia', 'BC'), ('Manitoba','MB'), ('New Brunswick','NB'), ('Newfoundland and Labrador','NL'), ('Northwest Territories','NT'), ('Nova Scotia','NS'), ('Nunavut', 'NU'), ('Ontario','ON'), ('Prince Edward Island','PE'), ('Quebec','QC'), ('Saskatchewan','SK'), ('Yukon','YT');

CREATE TABLE IF NOT EXISTS cities (
  city_id SERIAL,
  name TEXT UNIQUE, 
  province_id TEXT,
  PRIMARY KEY (city_id),
  FOREIGN KEY (province_id)
    REFERENCES provinces (province_id)
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

 
CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL,
  user_id INT NOT NULL,
  activity_id INT NOT NULL,
  review TEXT,
  rating INT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (review_id),
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




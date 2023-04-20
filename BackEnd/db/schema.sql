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

INSERT INTO users(username, email, password) VALUES ('Deia', 'deia@gmail', 'deia'),('Lucas', 'lucas@gmail', 'lucas'),('Mike', 'mike@gmail', 'mike');

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

INSERT INTO cities(name, province_id) VALUES ('Toronto', 'ON'),('Charlottetown','PE');
  
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

INSERT INTO activities(title, description, address, latitude, longitude, photo, user_id, city_id) VALUES ('Craigleigh Gardens Dog Park',
    'A quiet 3.4 hectare park near Castle Frank Road and Bloor Street East featuring an entrance with ornamental gates, a mature tree canopy and a dog off-leash area. The park is adjacent to Milkmans Lane with access to a ravine trail and the Don Valley Brick Works.',
    'Milkmans Lane',
    43.67748558012985,
    -79.37223787483332,
    'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZyUyMHBhcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
     1,
    1), ('Brighton Beach Lighthouse',
    'Brighton Beach Front Range Lighthouse is a 12.2 metre (40 ft) square, tapered light tower, and features white-painted shingles with red accents and lantern room; a decorative maple leaf is painted on two faces of the lantern room. It sits along the shoreline of the North (Yorke) River in the residential community of Brighton Ward of the City of Charlottetown in Prince Edward Island.',
    '160 York Ln',
    46.23060602367885,
    -63.146939255098474,
    'https://images.unsplash.com/photo-1522679056866-8dbbc8774a9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    2,
    4), ('Graffiti Alley',
    'Graffiti Alley runs parallel to the trendy stretch of Queen Street West. It encompasses three city blocks and includes the contiguous alleyway of Rush Lane. It is a popular spot to view some of the best examples of a vibrant street art and mural culture from Toronto. Graffiti Alley is a popular backdrop for photoshoots, as well as a place to see works by iconic artists like Duro the Third, uber5000, and ELICSER. It has served as the venue for small street festivals, a set for music videos, and for a time, had a restaurant named after it.',
    'Graffiti Alley, ON',
    43.64807490885711,
    -79.39846217344689,
    'https://images.unsplash.com/photo-1562252636-e05a15ede29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGdyYWZmaXRpJTIwYWxsZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    3,
    1);
 
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

  INSERT INTO reviews(user_id, activity_id, review, rating) VALUES (3,1,'This is a beautiful park where dogs can be off-leash. There are enough benches to sit, rest and read a good book', 4),(3,1,'Amazing park with cute and energetic dogs. The place is beside a huge trail to make a hiking',5),(2,1,'I had a great time in Prince Edward Island and I really recommend taking a car and going along the scenic view', 3);

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

INSERT INTO activities_tags (tags_id, activity_id) VALUES (1,1),(7,1),(3,2),(7,2),(2,3),(4,3)


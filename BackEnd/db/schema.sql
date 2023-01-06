DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS activities_tags CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS provinces CASCADE;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL,
  name TEXT NOT NULL, 
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  PRIMARY KEY (user_id)
  );

INSERT INTO users(name, email, password) VALUES ('Deia', 'deia@gmail', 'deia'),('Lucas', 'lucas@gmail', 'lucas'),('Mike', 'mike@gmail', 'mike');

CREATE TABLE IF NOT EXISTS provinces (
  province TEXT, 
  province_id TEXT,
  PRIMARY KEY (province_id)
  );
o
INSERT INTO provinces(province, province_id) VALUES ('Alberta', 'AB'), ('British Columbia', 'BC'), ('Manitoba','MB'), ('New Brunswick','NB'), ('Newfoundland and Labrador','NL'), ('Northwest Territories','NT'), ('Nova Scotia','NS'), ('Nunavut', 'NU'), ('Ontario','ON'), ('Prince Edward Island','PE'), ('Quebec','QC'), ('Saskatchewan','SK'), ('Yukon','YT');

CREATE TABLE IF NOT EXISTS cities (
  city_id SERIAL,
  name TEXT UNIQUE, 
  province_id TEXT,
  PRIMARY KEY (city_id),
  FOREIGN KEY (province_id)
    REFERENCES provinces (province_id)
  );

INSERT INTO cities(name, province_id) VALUES ('Toronto', 'ON'),('Vancouver','BC'),('Calgary', 'AB'),('Charlottetown','PE');
  
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
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper eu lectus ac maximus. Sed non posuere arcu. Fusce pharetra arcu justo, vel mollis ante fermentum nec. Fusce commodo aliquam consequat. Phasellus ut ipsum vel diam accumsan volutpat. Vestibulum sit amet felis laoreet, faucibus est in, commodo enim. Sed ultricies urna vitae elit luctus molestie.',
    'Milkmans Lane',
    43.67748558012985,
    -79.37223787483332,
    'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZyUyMHBhcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
     1,
    1), ('Brighton Beach Lighthouse',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper eu lectus ac maximus. Sed non posuere arcu. Fusce pharetra arcu justo, vel mollis ante fermentum nec. Fusce commodo aliquam consequat. Phasellus ut ipsum vel diam accumsan volutpat. Vestibulum sit amet felis laoreet, faucibus est in, commodo enim. Sed ultricies urna vitae elit luctus molestie.',
    '160 York Ln',
    46.23060602367885,
    -63.146939255098474,
    'https://images.unsplash.com/photo-1522679056866-8dbbc8774a9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHRob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    2,
    4), ('Graffiti Alley',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquam finibus dolor, vitae placerat tortor porta id. Fusce et nulla egestas, tempus felis in, tempus ipsum. Donec a urna maximus, maximus sapien id, elementum metus. Integer faucibus rutrum lacus, egestas posuere augue malesuada ut. Proin semper risus sit amet nulla tristique, ut lobortis tellus imperdiet. Cras egestas orci quis mauris tincidunt tempus. Nullam sodales nunc purus, ac varius ante gravida vel. Sed eu turpis dapibus, vestibulum erat quis, sagittis urna. In lobortis urna a tincidunt dictum. Etiam sit amet libero sed diam ultricies imperdiet. In hac habitasse platea dictumst.',
    'Graffiti Alley, ON',
    43.64807490885711,
    -79.39846217344689,
    'https://images.unsplash.com/photo-1562252636-e05a15ede29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGdyYWZmaXRpJTIwYWxsZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    3,
    1);
 
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

INSERT INTO activities_tags (tags_id, activity_id) VALUES (1,1),(7,1),(3,2),(7,2),(2,3),(4,3)




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
CREATE TABLE users (
  user_id SERIAL,
  name TEXT, 
  email TEXT,
  password TEXT,
  PRIMARY KEY (user_id)
  );
  
CREATE TABLE activities (
  activity_id SERIAL,
  title TEXT, 
  description TEXT,
  photo TEXT,
  date_created TIMESTAMP,
  user_id INT,
  PRIMARY KEY (activity_id),
  FOREIGN KEY (user_id)
    REFERENCES users (user_id)
  );

  CREATE TABLE comments (
  comments_id SERIAL,
  user_id INT,
  activity_id INT,
  comment TEXT,
  rating TEXT,
  PRIMARY KEY (comments_id),
  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  FOREIGN KEY (activity_id)
    REFERENCES activities (activity_id)
  );

CREATE TABLE tags (
  tags_id SERIAL,
  name TEXT, 
  PRIMARY KEY (tags_id)
  );

CREATE TABLE activities_tags (
  activities_tags_id SERIAL ,
  tags_id INT,
  activity_id INT,
  PRIMARY KEY (activities_tags_id),
  FOREIGN KEY (tags_id)
    REFERENCES tags (tags_id),
  FOREIGN KEY (activity_id)
    REFERENCES activities (activity_id)
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
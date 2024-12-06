CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  dob DATE,
  age INT,
  mobile VARCHAR(20),
  phone VARCHAR(20),
  gender ENUM('Male', 'Female', 'Other'),
  hobbies JSON
);

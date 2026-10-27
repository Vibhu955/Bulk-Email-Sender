create database db6;
use db6;
CREATE TABLE roles(
	id INT PRIMARY KEY,
    `name` VARCHAR(25)
);
Insert into roles values (1,"admin"),(2,"user");

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(35),
    email VARCHAR(35) UNIQUE NOT NULL,
    role_id INT,
    phone_number BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
        CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id)
); -- premanent deletion of users
select * from user;

CREATE TABLE user_credentials (
    id INT PRIMARY KEY,
    `password` VARCHAR(250),
		CONSTRAINT fk_users FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE templates(
	id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(35) NOT NULL,
    body MEDIUMTEXT NOT NULL, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
		CONSTRAINT fk_created FOREIGN KEY (created_by) REFERENCES users(id),
		CONSTRAINT fk_updated FOREIGN KEY (updated_by) REFERENCES users(id) 
);

CREATE TABLE email_logs(
	id INT PRIMARY KEY AUTO_INCREMENT,
	template_id INT, 
    sent_by INT,
	no_of_receivers INT,
    success_receivers INT,
    rejected_receivers INT,
    sent_at TIMESTAMP,
		CONSTRAINT fk_sentby FOREIGN KEY (sent_by) REFERENCES users(id),
		CONSTRAINT fk_templates FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE SET NULL
);

INSERT INTO templates (name, body)
VALUES (
  'User Contact Template',
  '<h2>Hello {{name}}</h2>
   <p>Your email is: {{email}}</p>
   <p>Your phone number is: {{phone_number}}</p>'
);

select * from users;
select * from user_credentials;
select * from templates;
select * from email_logs;

SET sql_mode= 0;

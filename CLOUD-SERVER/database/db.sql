CREATE DATABASE smarthome;

\c smarthome;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password CHAR(64) NOT NULL
);

CREATE TABLE raspberry_pi (
  rpi_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  rpi_name VARCHAR(40) NOT NULL,
  socket_id VARCHAR(64),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE gadget_type (
  gadget_type_id SERIAL PRIMARY KEY,
  gadget_type_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE gadget (
  gadget_id SERIAL PRIMARY KEY,
  rpi_id INT NOT NULL,
  gadget_type_id INT NOT NULL,
  gadget_name VARCHAR(40) NOT NULL,
  gpio_number INT NOT NULL,
  power INT NOT NULL,
  status BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (rpi_id) REFERENCES raspberry_pi(rpi_id),
  FOREIGN KEY (gadget_type_id) REFERENCES gadget_type(gadget_type_id)
);

CREATE TABLE scheduled_tasks (
  gadget_id INT NOT NULL,
  SCHEDULED_TIME TIMESTAMPTZ NOT NULL,
  TASK_TO_DO BOOLEAN NOT NULL,
  STATUS VARCHAR(20),
  FOREIGN KEY (gadget_id) REFERENCES gadget(gadget_id)
);

CREATE TABLE session (
  gadget_id INT NOT NULL,
  starting_datetime TIMESTAMPTZ NOT NULL,
  ending_datetime TIMESTAMPTZ,
  FOREIGN KEY (gadget_id) REFERENCES gadget(gadget_id)
);

DROP TABLE session;
DROP TABLE scheduled_tasks;
DROP TABLE gadget;
DROP TABLE gadget_type;
DROP TABLE raspberry_pi;
DROP TABLE users;

-- Query To GET ALL PI OF A USERID
SELECT rp_id, user_id, username FROM
  (SELECT id as rp_id, user_id FROM raspberry_pi) as raspberry_pi INNER JOIN users
  ON raspberry_pi.user_id = users.id;

-- Query To Get All the Gadgets of A USER|PI
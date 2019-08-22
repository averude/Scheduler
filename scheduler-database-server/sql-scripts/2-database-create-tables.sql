-- PostgreSQL

CREATE TABLE departments (
  id            SERIAL,
  name          VARCHAR (128) NOT NULL,
  UNIQUE (name),
  PRIMARY KEY (id)
);

CREATE TABLE positions (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  name          VARCHAR (128) NOT NULL,
  UNIQUE (department_id, name),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE day_type_groups (
  id            SERIAL,
  name          VARCHAR(128)  NOT NULL,
  color         VARCHAR(7)    NOT NULL,
  UNIQUE (name),
  PRIMARY KEY (id)
);

CREATE TABLE day_types (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  group_id      INTEGER   NOT NULL,
  name          VARCHAR (128) NOT NULL,
  label         VARCHAR (5),
  default_value FLOAT         NOT NULL CHECK ( default_value >= 0 AND default_value <= 24 ),
  UNIQUE (department_id, name),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES day_type_groups ON DELETE CASCADE
);

CREATE TABLE shift_patterns (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  name          VARCHAR (128) NOT NULL,
  override_existing_values BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (department_id, name),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE pattern_units (
  id            SERIAL,
  pattern_id    INTEGER       NOT NULL,
  order_id      INTEGER       NOT NULL,
  day_type_id   INTEGER       NOT NULL,
  value         FLOAT         NOT NULL CHECK ( value >= 0 AND value <= 24 ),
  UNIQUE (pattern_id, order_id),
  PRIMARY KEY (id),
  FOREIGN KEY (pattern_id)    REFERENCES shift_patterns(id) ON DELETE CASCADE,
  FOREIGN KEY (day_type_id)   REFERENCES day_types(id)      ON DELETE CASCADE
);

CREATE TABLE shifts (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  pattern_id    INTEGER,
  name          VARCHAR (128) NOT NULL,
  UNIQUE (department_id, name),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)    ON DELETE CASCADE,
  FOREIGN KEY (pattern_id)    REFERENCES shift_patterns(id) ON DELETE SET NULL
);

CREATE TABLE employees (
  id            SERIAL,
  shift_id      INTEGER,
  position_id   INTEGER       NOT NULL,
  first_name    VARCHAR (64)  NOT NULL,
  second_name   VARCHAR (64)  NOT NULL,
  patronymic    VARCHAR (64)  NOT NULL,
  UNIQUE (first_name, second_name, patronymic, position_id),
  PRIMARY KEY (id),
  FOREIGN KEY (shift_id)      REFERENCES shifts(id)    ON DELETE SET NULL,
  FOREIGN KEY (position_id)   REFERENCES positions(id) ON DELETE CASCADE
);

CREATE TABLE work_schedule (
  id            SERIAL,
  employee_id   INTEGER       NOT NULL,
  day_type_id   INTEGER,
  holiday       BOOLEAN       NOT NULL  DEFAULT FALSE,
  hours         FLOAT         NOT NULL  CHECK ( hours >= 0 AND hours <= 24 ),
  date          DATE          NOT NULL,
  UNIQUE (employee_id, date),
  PRIMARY KEY (id),
  FOREIGN KEY (employee_id)   REFERENCES employees(id) ON DELETE CASCADE,
  FOREIGN KEY (day_type_id)   REFERENCES day_types(id) ON DELETE SET NULL
);

CREATE TABLE working_time (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  shift_id      INTEGER       NOT NULL,
  date          DATE          NOT NULL,
  hours         FLOAT         NOT NULL  CHECK ( hours >= 0 ),
  UNIQUE (shift_id, date),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
  FOREIGN KEY (shift_id)      REFERENCES shifts(id)      ON DELETE CASCADE
);

CREATE TABLE holidays (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  date          DATE          NOT NULL,
  name          VARCHAR (255) NOT NULL,
  UNIQUE (department_id, date, name),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE extra_weekends (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  holiday_id    INTEGER,
  date          DATE          NOT NULL,
  UNIQUE (holiday_id),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)  ON DELETE CASCADE,
  FOREIGN KEY (holiday_id)    REFERENCES holidays(id)     ON DELETE CASCADE
);

-- Security

CREATE TABLE authorities (
  id            SERIAL,
  name          VARCHAR (255) NOT NULL,
  UNIQUE (name),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id            SERIAL,
  username      VARCHAR (64)  NOT NULL,
  password      VARCHAR (64)  NOT NULL,
  first_name    VARCHAR (64)  NOT NULL,
  second_name   VARCHAR (64)  NOT NULL,
  department_id INTEGER,
  shift_id      INTEGER,
  employee_id   INTEGER,
  locked        BOOLEAN       NOT NULL  DEFAULT FALSE,
  enabled       BOOLEAN       NOT NULL  DEFAULT TRUE,
  UNIQUE (username),
  PRIMARY KEY (id)
);

CREATE TABLE users_authorities (
  authority_id  INTEGER       NOT NULL,
  user_id       INTEGER       NOT NULL,
  PRIMARY KEY (authority_id, user_id),
  FOREIGN KEY (authority_id)  REFERENCES authorities(id)  ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (user_id)       REFERENCES users(id)        ON UPDATE CASCADE
);
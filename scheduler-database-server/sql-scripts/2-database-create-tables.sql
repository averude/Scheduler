-- PostgreSQL
CREATE TABLE departments (
  id            SERIAL,
  name          VARCHAR (64)  NOT NULL,
  UNIQUE (name),
  PRIMARY KEY (id)
);

CREATE TABLE positions (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  name          VARCHAR (64)  NOT NULL,
  UNIQUE (department_id, name),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT
);

CREATE TABLE day_types (
  id            SERIAL,
  name          VARCHAR (64)  NOT NULL,
  label         VARCHAR (5),
  UNIQUE (name, label),
  PRIMARY KEY (id)
);

CREATE TABLE shift_patterns (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  name          VARCHAR (64)  NOT NULL,
  UNIQUE (department_id, name),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT
);

CREATE TABLE pattern_units (
  id            SERIAL,
  pattern_id    INTEGER       NOT NULL,
  order_id      INTEGER       NOT NULL,
  day_type_id   INTEGER       NOT NULL,
  label         VARCHAR (5),
  value         FLOAT         NOT NULL,
  UNIQUE (pattern_id, order_id),
  PRIMARY KEY (id),
  FOREIGN KEY (pattern_id)    REFERENCES shift_patterns(id) ON DELETE CASCADE,
  FOREIGN KEY (day_type_id)   REFERENCES day_types(id)      ON DELETE RESTRICT
);

CREATE TABLE shifts (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  pattern_id    INTEGER,
  name          VARCHAR (64)  NOT NULL,
  UNIQUE (department_id, name),
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
  FOREIGN KEY (pattern_id)    REFERENCES shift_patterns(id)
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
  FOREIGN KEY (shift_id)      REFERENCES shifts(id)    ON DELETE RESTRICT,
  FOREIGN KEY (position_id)   REFERENCES positions(id) ON DELETE RESTRICT
);

CREATE TABLE work_schedule (
  id            SERIAL,
  employee_id   INTEGER       NOT NULL,
  day_type_id   INTEGER,
  holiday       BOOLEAN       NOT NULL  DEFAULT FALSE,
  hours         FLOAT         NOT NULL  CHECK (hours > 0 AND hours < 24),
  label         VARCHAR (5),
  date          DATE          NOT NULL,
  UNIQUE (employee_id, date),
  PRIMARY KEY (id),
  FOREIGN KEY (employee_id)   REFERENCES employees(id) ON DELETE CASCADE,
  FOREIGN KEY (day_type_id)   REFERENCES day_types(id)
);
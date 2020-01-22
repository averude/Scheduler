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
  short_name    VARCHAR (20),

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
  id                  SERIAL,
  department_id       INTEGER       NOT NULL,
  group_id            INTEGER       NOT NULL,
  name                VARCHAR (128) NOT NULL,
  label               VARCHAR (5),
  use_previous_value  BOOLEAN       NOT NULL  DEFAULT FALSE,
  start_time          INTEGER       CHECK ( 0 <= start_time and start_time <= 1440 ),
  end_time            INTEGER       CHECK ( 0 <= end_time and end_time <= 1440 ),
  break_start_time    INTEGER       CHECK ( 0 <= break_start_time and break_start_time <= 1440 ),
  break_end_time      INTEGER       CHECK ( 0 <= break_end_time and break_end_time <= 1440 ),

  CHECK ( start_time < end_time AND break_start_time < break_end_time
            AND start_time < break_start_time AND end_time > break_end_time
            AND (end_time - start_time) > (break_end_time - break_start_time) ),
  UNIQUE (department_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id)      REFERENCES day_type_groups ON DELETE CASCADE
);

CREATE TABLE shift_patterns (
  id                          SERIAL,
  department_id               INTEGER       NOT NULL,
  name                        VARCHAR (128) NOT NULL,
  holiday_day_type_id         INTEGER       DEFAULT NULL,
  extra_weekend_day_type_id   INTEGER       DEFAULT NULL,
  extra_work_day_day_type_id  INTEGER       DEFAULT NULL,

  UNIQUE (department_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id)             REFERENCES departments(id)  ON DELETE CASCADE,
  FOREIGN KEY (holiday_day_type_id)       REFERENCES day_types(id)    ON DELETE SET NULL,
  FOREIGN KEY (extra_weekend_day_type_id) REFERENCES day_types(id)    ON DELETE SET NULL
);

CREATE TABLE pattern_units (
  id                  SERIAL,
  pattern_id          INTEGER     NOT NULL,
  order_id            INTEGER     NOT NULL,
  day_type_id         INTEGER     NOT NULL,
  start_time          INTEGER     CHECK ( 0 <= start_time and start_time <= 1440 ),
  end_time            INTEGER     CHECK ( 0 <= end_time and end_time <= 1440 ),
  break_start_time    INTEGER     CHECK ( 0 <= break_start_time and break_start_time <= 1440),
  break_end_time      INTEGER     CHECK ( 0 <= break_end_time and break_end_time <= 1440),

  CHECK ( start_time < end_time AND break_start_time < break_end_time
    AND start_time < break_start_time AND end_time > break_end_time
    AND (end_time - start_time) > (break_end_time - break_start_time) ),
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
  position_id   INTEGER       NOT NULL,
  first_name    VARCHAR (64)  NOT NULL,
  second_name   VARCHAR (64)  NOT NULL,
  patronymic    VARCHAR (64)  NOT NULL,

  UNIQUE (first_name, second_name, patronymic, position_id),

  PRIMARY KEY (id),
  FOREIGN KEY (position_id)   REFERENCES positions(id) ON DELETE CASCADE
);

CREATE TABLE shift_composition (
  id            SERIAL,
  shift_id      INTEGER       NOT NULL,
  employee_id   INTEGER       NOT NULL,
  substitution  INTEGER       NOT NULL  DEFAULT 1,
  from_date     DATE          NOT NULL,
  to_date       DATE          NOT NULL,

  EXCLUDE USING GIST (
    employee_id WITH =,
    shift_id WITH =,
    substitution WITH =,
    daterange(from_date, to_date, '[]') WITH &&
  ),
  CHECK ( from_date <= to_date ),

  PRIMARY KEY (id),
  FOREIGN KEY (shift_id)      REFERENCES shifts(id)     ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (employee_id)   REFERENCES employees(id)  ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE work_schedule (
  id                  SERIAL,
  employee_id         INTEGER     NOT NULL,
  day_type_id         INTEGER,
  holiday             BOOLEAN     NOT NULL  DEFAULT FALSE,
  date                DATE        NOT NULL,
  start_time          INTEGER     CHECK ( 0 <= start_time and start_time <= 1440 ),
  end_time            INTEGER     CHECK ( 0 <= end_time and end_time <= 1440 ),
  break_start_time    INTEGER     CHECK ( 0 <= break_start_time and break_start_time <= 1440),
  break_end_time      INTEGER     CHECK ( 0 <= break_end_time and break_end_time <= 1440),

  CHECK ( start_time < end_time AND break_start_time < break_end_time
    AND start_time < break_start_time AND end_time > break_end_time
    AND (end_time - start_time) > (break_end_time - break_start_time) ),
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
  UNIQUE (department_id, date),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)  ON DELETE CASCADE,
  FOREIGN KEY (holiday_id)    REFERENCES holidays(id)     ON DELETE CASCADE
);

CREATE TABLE extra_work_days (
  id                SERIAL,
  department_id     INTEGER   NOT NULL,
  extra_weekend_id  INTEGER,
  date              DATE      NOT NULL,

  UNIQUE (extra_weekend_id),
  UNIQUE (department_id, date),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id)     REFERENCES departments(id)    ON DELETE CASCADE,
  FOREIGN KEY (extra_weekend_id)  REFERENCES extra_weekends(id) ON DELETE CASCADE
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

-- PostgreSQL

CREATE TABLE IF NOT EXISTS enterprises (
  id            SERIAL,
  name          VARCHAR (128) NOT NULL,

  UNIQUE (name),

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS departments (
  id            SERIAL,
  enterprise_id INTEGER,
  name          VARCHAR (128) NOT NULL,

  UNIQUE (enterprise_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS positions (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  name          VARCHAR (256) NOT NULL,
  short_name    VARCHAR (64),

  UNIQUE (department_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS day_type_groups (
  id            SERIAL,
  name          VARCHAR(128)  NOT NULL,
  color         VARCHAR(7)    NOT NULL,

  UNIQUE (name),

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS day_types (
  id                  SERIAL,
  enterprise_id       INTEGER       NOT NULL,
  group_id            INTEGER       NOT NULL,
  name                VARCHAR (128) NOT NULL,
  label               VARCHAR (5),
  use_previous_value  BOOLEAN       NOT NULL  DEFAULT FALSE,
  UNIQUE (enterprise_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)      ON DELETE CASCADE,
  FOREIGN KEY (group_id)      REFERENCES day_type_groups(id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS summation_columns (
  id                  SERIAL,
  enterprise_id       INTEGER       NOT NULL,
  name                VARCHAR (128) NOT NULL,
  column_type         VARCHAR (64)  NOT NULL    DEFAULT 'hours_sum',
  special_calendar_date_types VARCHAR (255),

  UNIQUE (enterprise_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS summation_columns_day_types_ranges (
  id                  SERIAL,
  summation_column_id INTEGER       NOT NULL,
  day_type_id         INTEGER       NOT NULL,
  from_time           INTEGER       CHECK ( 0 <= from_time and from_time <= 1440 ),
  to_time             INTEGER       CHECK ( 0 <= to_time and to_time <= 1440 ),

  CHECK ( from_time != to_time ),

  PRIMARY KEY (id),
  FOREIGN KEY (day_type_id)         REFERENCES day_types(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (summation_column_id) REFERENCES summation_columns(id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS department_day_types (
  id                  SERIAL,
  department_id       INTEGER       NOT NULL,
  day_type_id         INTEGER       NOT NULL,
  name                VARCHAR(128)  NOT NULL,
  start_time          INTEGER       CHECK ( 0 <= start_time and start_time <= 1440 ),
  end_time            INTEGER       CHECK ( 0 <= end_time and end_time <= 1440 ),
  break_start_time    INTEGER       CHECK ( 0 <= break_start_time and break_start_time <= 1440 ),
  break_end_time      INTEGER       CHECK ( 0 <= break_end_time and break_end_time <= 1440 ),

  CHECK ( start_time < end_time AND break_start_time < break_end_time
    AND start_time < break_start_time AND end_time > break_end_time
    AND (end_time - start_time) > (break_end_time - break_start_time) ),
  UNIQUE (department_id, day_type_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)  ON DELETE CASCADE,
  FOREIGN KEY (day_type_id)   REFERENCES day_types(id)    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shift_patterns (
  id                          SERIAL,
  department_id               INTEGER       NOT NULL,
  name                        VARCHAR (128) NOT NULL,

  holiday_dep_day_type_id         INTEGER       DEFAULT NULL,
  extra_weekend_dep_day_type_id   INTEGER       DEFAULT NULL,
  extra_work_day_dep_day_type_id  INTEGER       DEFAULT NULL,

  UNIQUE (department_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id)             REFERENCES departments(id)  ON DELETE CASCADE,
  FOREIGN KEY (holiday_dep_day_type_id)         REFERENCES department_day_types(id)    ON DELETE SET NULL,
  FOREIGN KEY (extra_weekend_dep_day_type_id)   REFERENCES department_day_types(id)    ON DELETE SET NULL,
  FOREIGN KEY (extra_work_day_dep_day_type_id)  REFERENCES department_day_types(id)    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS pattern_units (
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

CREATE TABLE IF NOT EXISTS shifts (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  pattern_id    INTEGER,
  name          VARCHAR (128) NOT NULL,

  UNIQUE (department_id, name),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)    ON DELETE CASCADE,
  FOREIGN KEY (pattern_id)    REFERENCES shift_patterns(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS employees (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  position_id   INTEGER       NOT NULL,
  first_name    VARCHAR (64)  NOT NULL,
  second_name   VARCHAR (64)  NOT NULL,
  patronymic    VARCHAR (64)  NOT NULL,

  UNIQUE (first_name, second_name, patronymic, position_id),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (position_id)   REFERENCES positions(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS main_shift_compositions (
  id            SERIAL,
  shift_id      INTEGER       NOT NULL,
  employee_id   INTEGER       NOT NULL,
  from_date     DATE          NOT NULL,
  to_date       DATE          NOT NULL,

  EXCLUDE USING GIST (
    employee_id WITH =,
    daterange(from_date, to_date, '[]') WITH &&
  ),
  CHECK ( from_date <= to_date ),

  PRIMARY KEY (id),
  FOREIGN KEY (shift_id)      REFERENCES shifts(id)     ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (employee_id)   REFERENCES employees(id)  ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS substitution_shift_compositions (
  id                    SERIAL,
  shift_id              INTEGER       NOT NULL,
  employee_id           INTEGER       NOT NULL,
  shift_composition_id  INTEGER       NOT NULL,
  from_date             DATE          NOT NULL,
  to_date               DATE          NOT NULL,

  EXCLUDE USING GIST (
    employee_id WITH =,
    daterange(from_date, to_date, '[]') WITH &&
  ),
  CHECK ( from_date <= to_date ),

  PRIMARY KEY (id),
  FOREIGN KEY (shift_id)      REFERENCES shifts(id)     ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (employee_id)   REFERENCES employees(id)  ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (shift_composition_id) REFERENCES main_shift_compositions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS work_schedule (
  id                    SERIAL,
  department_id         INTEGER     NOT NULL,
  employee_id           INTEGER     NOT NULL,
  actual_day_type_id    INTEGER,
  scheduled_day_type_id INTEGER,
  date                  DATE        NOT NULL,
  start_time            INTEGER     CHECK ( 0 <= start_time and start_time <= 1440 ),
  end_time              INTEGER     CHECK ( 0 <= end_time and end_time <= 1440 ),
  break_start_time      INTEGER     CHECK ( 0 <= break_start_time and break_start_time <= 1440),
  break_end_time        INTEGER     CHECK ( 0 <= break_end_time and break_end_time <= 1440),

  CHECK ( start_time < end_time AND break_start_time < break_end_time
    AND start_time < break_start_time AND end_time > break_end_time
    AND (end_time - start_time) > (break_end_time - break_start_time) ),
  UNIQUE (employee_id, department_id, date),

  PRIMARY KEY (id, department_id),
  FOREIGN KEY (department_id) REFERENCES departments(id), --ON DELETE CASCADE,-- ON UPDATE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (actual_day_type_id) REFERENCES day_types(id) ON DELETE SET NULL,
  FOREIGN KEY (scheduled_day_type_id) REFERENCES day_types(id) ON DELETE SET NULL
) PARTITION BY LIST (department_id);

CREATE TABLE IF NOT EXISTS working_norms (
  id            SERIAL,
  department_id INTEGER       NOT NULL,
  shift_id      INTEGER       NOT NULL,
  date          DATE          NOT NULL,
  hours         FLOAT         NOT NULL  CHECK ( hours >= 0 ) DEFAULT 0,
  days          INTEGER       NOT NULL  CHECK ( days >= 0 ) DEFAULT 0,

  UNIQUE (shift_id, date),

  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
  FOREIGN KEY (shift_id)      REFERENCES shifts(id)      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS special_calendar_dates (
  id            SERIAL,
  enterprise_id INTEGER       NOT NULL,
  date_type     VARCHAR (64)  NOT NULL,
  date          DATE          NOT NULL,
  name          VARCHAR (255) NOT NULL,

  UNIQUE (enterprise_id, date),

  PRIMARY KEY (id),
  FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE
);

-- Security

CREATE TABLE IF NOT EXISTS user_accounts (
  id              SERIAL,
  username        VARCHAR(64)     NOT NULL,
  password        VARCHAR(64)     NOT NULL,
  role            VARCHAR(64)     NOT NULL    DEFAULT 'USER',
  locked          BOOLEAN         NOT NULL    DEFAULT FALSE,
  enabled         BOOLEAN         NOT NULL    DEFAULT TRUE,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS shift_admin_user_accounts (
  id              SERIAL,
--   username        VARCHAR(64)     NOT NULL,
  shift_id        INTEGER         NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (id)        REFERENCES user_accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (shift_id)  REFERENCES shifts(id)        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS department_admin_user_accounts (
  id              SERIAL,
--   username        VARCHAR(64)     NOT NULL,
  department_id   INTEGER         NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (id)            REFERENCES user_accounts(id)  ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id)    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS enterprise_admin_user_accounts (
  id              SERIAL,
--   username        VARCHAR(64)     NOT NULL,
  enterprise_id   INTEGER         NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (id)            REFERENCES user_accounts(id)  ON DELETE CASCADE,
  FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS global_admin_user_accounts (
  id              SERIAL,
--   username        VARCHAR(64)     NOT NULL,
  is_global_admin BOOLEAN         NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (id)            REFERENCES user_accounts(id)  ON DELETE CASCADE
);

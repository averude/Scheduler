INSERT INTO authorities (name) VALUES ('GLOBAL_ADMIN');
INSERT INTO authorities (name) VALUES ('DEPARTMENT_ADMIN');
INSERT INTO authorities (name) VALUES ('SHIFT_ADMIN');
INSERT INTO authorities (name) VALUES ('CLIENT');

INSERT INTO users (username, password, first_name, second_name)
VALUES ('global_admin', '$2a$10$zHFEsBOCUZt0JCTVJ5hrJeNwCrZFE366f2DDTauuioHJyVsXUdHJ.', 'Andrew', 'Kolesnyk');

INSERT INTO users_authorities (authority_id, user_id) VALUES (1,1);

INSERT INTO day_type_groups (name, color) VALUES ('Normal working day', '');
INSERT INTO day_type_groups (name, color) VALUES ('Night shift', '');
INSERT INTO day_type_groups (name, color) VALUES ('Weekend', '');
INSERT INTO day_type_groups (name, color) VALUES ('Vacation', '');
INSERT INTO day_type_groups (name, color) VALUES ('Sick day', '');
INSERT INTO day_type_groups (name, color) VALUES ('Business trip', '');
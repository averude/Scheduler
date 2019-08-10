INSERT INTO authorities (name) VALUES ('GLOBAL_ADMIN');
INSERT INTO authorities (name) VALUES ('DEPARTMENT_ADMIN');
INSERT INTO authorities (name) VALUES ('SHIFT_ADMIN');
INSERT INTO authorities (name) VALUES ('CLIENT');

INSERT INTO users (username, password) VALUES ('global_admin', '$2a$10$zHFEsBOCUZt0JCTVJ5hrJeNwCrZFE366f2DDTauuioHJyVsXUdHJ.');

INSERT INTO users_authorities (authority_id, user_id) VALUES (1,1);

INSERT INTO day_type_groups (name) VALUES ('Normal working day');
INSERT INTO day_type_groups (name) VALUES ('Night shift');
INSERT INTO day_type_groups (name) VALUES ('Weekend');
INSERT INTO day_type_groups (name) VALUES ('Vacation');
INSERT INTO day_type_groups (name) VALUES ('Sick day');
INSERT INTO day_type_groups (name) VALUES ('Business trip');
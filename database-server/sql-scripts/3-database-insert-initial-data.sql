INSERT INTO user_accounts (username, password, role, authority)
VALUES ('global_admin', '$2a$10$zHFEsBOCUZt0JCTVJ5hrJeNwCrZFE366f2DDTauuioHJyVsXUdHJ.', 'ADMIN', 'GLOBAL');

INSERT INTO day_type_groups (name, color) VALUES ('Normal working day', '#51a761');
INSERT INTO day_type_groups (name, color) VALUES ('Night shift', '#51a761');
INSERT INTO day_type_groups (name, color) VALUES ('Weekend', '');
INSERT INTO day_type_groups (name, color) VALUES ('Vacation', '#ff6262');
INSERT INTO day_type_groups (name, color) VALUES ('Sick day', '#a025ba');
INSERT INTO day_type_groups (name, color) VALUES ('Business trip', '#f3f16f');

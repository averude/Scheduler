INSERT INTO departments (name) VALUES ('Test department');

INSERT INTO positions (department_id, name) VALUES (1, 'Test Position 1');
INSERT INTO positions (department_id, name) VALUES (1, 'Test Position 2');

INSERT INTO employees (position_id, first_name, second_name, patronymic)
VALUES (1, 'Олег', 'Романов', 'Юрьевич');
INSERT INTO employees (position_id, first_name, second_name, patronymic)
VALUES (2, 'Вячеслав', 'Козловский', 'Евгеньевич');
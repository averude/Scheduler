#   Enterprise Scheduler
This is the backend side of the simple enterprise scheduler service built with Spring Boot, Spring Cloud, Docker and PostgreSQL. 

##  Getting Started
####    Running this project on the local machine:
* Make sure you've installed [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/).
* Build the project `mvn package [-DskipTests]`.
* Run `docker-compose up -f docker-compose.yml`.
####    Running this project on the remote machine:
* Make sure that the remote machine has [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/). 
* Build the project `mvn package [-DskipTests]`.
* Run script `./collect.sh`.
* Send `./scheduler.tar` to the remote machine.
* On the remote machine run `tar -xvf ./scheduler.tar`.
* Run `docker-compose up -f docker-compose.yml`.

## Microservice description

### Admin Service API

Method  | Path                                              | Description
--------|---------------------------------------------------|-------------------------------
GET     | /departments                                      | Get all departments
GET     | /departments/{department_id}                      | Get a department by its ID
POST    | /departments                                      | Create a new department
PUT     | /departments/                                     | Update a department
DELETE  | /departments/{department_id}                      | Delete a department by its ID
GET     | /positions                                        | Get all positions in the department
GET     | /positions/{position_id}                          | Get a position by its ID
POST    | /positions                                        | Create a new position
PUT     | /positions/                                       | Update a position
DELETE  | /positions/{position_id}                          | Delete the position by its ID
GET     | /employees                                        | Get all employees in the department 
GET     | /positions/{position_id}/employees                | Get all employees in the specified position
GET     | /employees/{employee_id}                          | Get an employee by its ID
POST    | /employees                                        | Create a new employee
PUT     | /employees/                                       | Update an employee
DELETE  | /employees/{employee_id}                          | Delete an employee by its ID
GET     | /daytypes                                         | Get all day types
GET     | /daytypes/{daytype_id}                            | Get a day type by its ID
POST    | /daytypes                                         | Create a new day type
PUT     | /daytypes/                                        | Update a day type
DELETE  | /daytypes/{daytype_id}                            | Delete a day type by its ID
GET     | /shifts                                           | Get all shifts in the department
GET     | /shifts/{shift_id}                                | Get a shift by its ID
POST    | /shifts                                           | Create a new shift
PUT     | /shifts/                                          | Update a shift
DELETE  | /shifts/{shift_id}                                | Delete a shift by its ID
GET     | /patterns                                         | Get all schedule patterns in the department
GET     | /patterns/{pattern_id}                            | Get a schedule pattern by its ID
POST    | /patterns                                         | Create a new schedule pattern
PUT     | /patterns/                                        | Update a schedule pattern
DELETE  | /patterns/{pattern_id}                            | Delete a schedule pattern by its ID
GET     | /patterns/{pattern_id}/units                      | Get all pattern units in the specified schedule pattern
GET     | /units/{unit_id}                                  | Get a pattern unit by its ID 
POST    | /units                                            | Create a new pattern unit
PUT     | /units/                                           | Update a pattern unit
DELETE  | /units/{unit_id}                                  | Delete a pattern unit by its ID
---------------------------------------------------------------------------------------------

### Schedule Service API

Method  | Path                                              | Description
--------|---------------------------------------------------|-------------------------------
GET     | /search?employeeId={employee_id}&from={from_date}&to={to_date}  | Get schedule for specified employee between specified dates (ISO format "yyyy-MM-dd"). If {to_date} is not specified, then {to_date} is current date
POST    | /{employee_id}                      | Create new work days for specified employee
PUT     | /{employee_id}                      | Update work days for specified employee
---------------------------------------------------------------------------------------------

### Statistics Service API

Method  | Path                                              | Description
--------|---------------------------------------------------|-------------------------------
GET     | /positions/employees                              | Get a number of employees in each position of the department 
---------------------------------------------------------------------------------------------

##  Related Projects
* [Scheduler Frontend](https://github.com/averude/SchedulerFrontend) - frontend side of the service.

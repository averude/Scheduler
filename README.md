## Brief description

Employee rostering and work scheduling web service

## Key features

* Enterprise, Department or Shift administration differentiation
* Automated schedule generation with pre-established patterns
* Easy export to excel report
* Customizable statistics display

## Used technologies

* Angular
  * Material
  * RxJS
  * ExcelJs
* Java
  * Spring Boot
  * Spring Data
  * Spring Security
  * EhCache
* Postgres
* Nginx
* Docker

## Installation guide

####Install

1. [Docker](https://docs.docker.com/engine/install/)  
2. [Docker-compose](https://docs.docker.com/compose/install/)  
3. [Maven](https://maven.apache.org/install.html)  
4. [Angular CLI](https://angular.io/guide/setup-local) 

####Clone sources
`git clone https://github.com/averude/Scheduler.git`

####Compile and build
1. Generate JKS and put it into the `./auth-server/src/main/resources/jks` folder
2. In the root of the project folder run `mvn package`   
3. In `./frontend-server/src/environments` files change the IP address in the base URL to the address of your REST server (Linux host)
4. Inside the `./frontend-server` folder run `ng build --prod` or `ng serve` (for local run)  

####Configure
In the project folder create environment file `.env` with the next sections:
1. Profile  
`PROFILE` - possible values `prod` or `dev`
2. Database section: 
   1. DB driver class name  
   `DB_DRIVER_CLASS_NAME`
   2. DB volume path  
   `DB_VOLUME_PATH`
   3. DB URL  
   `DB_URL`
   4. DB name  
   `DB_NAME`
   5. DB user  
   `DB_USERNAME`
   6. DB user password  
   `DB_PASSWD`
   7. Postgres password  
   `POSTGRES_PASSWORD`
3. Security section
   1. JWT set URI  
   `JWT_SET_URI`
   2. Key store file  
   `KEY_STORE_FILE`
   3. Key store password  
   `KEY_STORE_PASSWORD`
   4. Key alias  
   `KEY_ALIAS`
   5. JWK kid  
   `JWK_KID`
   6. Token validity seconds  
   `VALIDITY_SECONDS`
   7. The `bcrypt`-ed hash of `global_admin` password  
   `GLOBAL_ADMIN_PASS_HASH`
4. Backend section  
   1. Path to logs volume
   `LOG_VOLUME_PATH`
   2. (Available only on `prod` profile) Graylog host and GELF port  
   `GRAYLOG_HOST`  
   `GRAYLOG_GELF_PORT`
5. Frontend section
   1. Path to dist volume  
   `FRONTEND_VOLUME_PATH`

`.env` file example

    #######################
    # APPLICATION PROFILE #
    # VALUES: dev or prod #
    #######################
    PROFILE=dev  
    
    ##################
    #    Database    #
    ##################
    DB_DRIVER_CLASS_NAME=org.postgresql.Driver  
    DB_URL=jdbc:postgresql://database-server:5432  
    DB_NAME=schedulerdb
    DB_USERNAME=scheduler
    DB_PASSWD=scheduler  
    DB_VOLUME_PATH=path_to_your_project_folder/database  
    POSTGRES_PASSWORD=postgres  
    GLOBAL_ADMIN_PASS_HASH=some_hash
    
    ##################
    #    Security    #
    ##################
    JWT_SET_URI=http://auth-server:5000/.well-known/jwks.json  
    KEY_STORE_FILE=scheduler-jwt.jks  
    KEY_STORE_PASSWORD=scheduler  
    KEY_ALIAS=scheduler-oauth-jwt  
    JWK_KID=scheduler-key-id  
    VALIDITY_SECONDS=21600      
    
    ##################
    #    Backend     #
    ##################
    LOG_VOLUME_PATH=path_to_your_project_folder/logs  
    #GRAYLOG_HOST=your_graylog_addr  
    #GRAYLOG_GELF_PORT=your_graylog_port
    
    ##################
    #    Frontend    #
    ##################
    FRONTEND_VOLUME_PATH=path_to_your_project_folder/frontend-server/dist/scheduler

####Start
Up containers via `docker-compose up -d` and then in browser 
open link according to the way you served frontend

    login: global-admin
    pass:  according_to_your_hash
    

## UI example
![Picture one](../media/images/1.png?raw=true)  
![Picture two](../media/images/2.png?raw=true)  
![Picture three](../media/images/3.png?raw=true)  

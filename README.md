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
1. Profile (`prod` or `dev`)
2. Database section: 
   1. DB volume path 
   2. Path to DB
   3. DB driver
   4. DB user
   5. DB password
   6. Postgres password
3. Security section
   1. JWK
   2. JWT set URI
   3. Validity seconds
   3. ...and so on
4. Backend section
   1. Path to logs volume
5. Frontend section
   1. Path to dist volume

`.env` file example

    #######################
    # APPLICATION PROFILE #
    # VALUES: dev or prod #
    #######################
    PROFILE=prod  

    #################
    # Security      #
    #################
    JWT_SET_URI=http://auth-server:5000/.well-known/jwks.json  
    KEY_STORE_FILE=scheduler-jwt.jks  
    KEY_STORE_PASSWORD=scheduler  
    KEY_ALIAS=scheduler-oauth-jwt  
    JWK_KID=scheduler-key-id  
    VALIDITY_SECONDS=21600  
    
    #################
    # Database      #
    #################
    DB_DRIVER_CLASS_NAME=org.postgresql.Driver  
    DB_URL=jdbc:postgresql://database-server:5432  
    DB_NAME=schedulerdb
    DB_USERNAME=scheduler
    DB_PASSWD=scheduler  
    DB_VOLUME_PATH=/app/scheduler/database  
    POSTGRES_PASSWORD=postgres  
    GLOBAL_ADMIN_PASS_HASH=some_hash
    
    #################
    # Backend       #
    #################
    LOG_VOLUME_PATH=/app/scheduler/logs  
    #GRAYLOG_HOST=your_graylog_addr  
    #GRAYLOG_GELF_PORT=your_graylog_port
    
    #################
    # Frontend      #
    #################
    FRONTEND_VOLUME_PATH=/app/scheduler/frontend-server/dist

####Start
Up containers via `docker-compose up -d` and then in browser 
open link according to the way you deployed blah blah blah

    login: global-admin
    pass:  according_to_your_hash
    

## UI example
![Picture one](../media/images/1.png?raw=true)  
![Picture two](../media/images/2.png?raw=true)  
![Picture three](../media/images/3.png?raw=true)  

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
1. In project folder run `mvn package`   
2. Inside the `./frontend-server` folder run `ng build` or `ng serve` (for local run)  
3. Generate JWK

####Configure
In the project folder create environment file `.env` with the next sections:
1. Profile (prod or dev)
2. Database section: 
   1. DB volume path 
   2. Path to DB
   3. DB driver
   4. DB user
   5. DB password
   6. Postgres password
3. Security section
   1. JWK
   2. Path
   3. ...and so on
4. Backend section
5. Frontend section
   1. Path to dist

####Start
docker-compose up --build -d

    login: global-admin
    pass:  admin
    
For prod password should be changed

## UI example
![Picture one](../media/images/1.png?raw=true)  
![Picture two](../media/images/2.png?raw=true)  
![Picture three](../media/images/3.png?raw=true)  

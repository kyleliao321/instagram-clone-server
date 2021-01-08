# Instagram Clone - Server

`Instagram-Clone-Server` is a clone server that used for [Instagram-Clone-Android-Application](https://github.com/kyleliao321/instagram-clone-clean-architecture), which will make network request to it when setup together. This repository won't get into the detail about how to connect two applications, it will only show how to run the server as demo and setup development environment.

## Table of contents
- [Demo](#demo)
- [Development](#development)
- [API document](#api-document)
- [Test](#test)

## Demo
When starts server as demo, the application will populate database with fake data. At the same time, it will create a root user for you to make request. 

### 1. Create .env file
- Create a new file called `.env` in root directory.
- Pass the following text into the file
```
DEMO_DB_HOST=demo-db
DEMO_DB_USER=postgres
DEMO_DB_PASSWORD=password
DEMO_DB_NAME=instagram_clone_server_demo

DEMO_ROOT_USER_NAME=root
DEMO_ROOT_USER_PASSWORD=root
```
notes: `DEMO_ROOT_USER_NAME` and `DEMO_ROOT_USER_PASSWORD` are optional, if you don't provide it, the application will just use `root` as username and password.

### 2. Start demo server
```bash
docker-compose up
## WARNING: it might take a few seconds to populate the database
```

### 3. Usage
When services started successfully, the server will listen on `http://localhost:8080`. To make a network request, please check on [API Document](#api-document). 

### 4. Teardown demo server
```bash
## stop and remove services
docker-compose down

## remove created volumes
docker volume prune
```

## Developement
The clone application uses docker to help users setup developement environment. The default docker-compose file will start three services - server, developement-database and test-database. The server is running with nodemon to detect updates automatically. The two databases have its own purpose to prevent data-contamination. The developement-database is used for development, it will not automatically clean-up data. The test-database is used for integration and e2e tests, it will always clean-up data after testing. Follow the instruction below to learn how to setup services and start them:

### 1. Create .env file
- Create a new file called `.env` in root directory.
- Pass the following text into the file:
```
DEV_DB_HOST=dev-db
DEV_DB_USER=postgres
DEV_DB_PASSWORD=password
DEV_DB_NAME=instagram_clone_server_dev

TEST_DB_HOST=127.0.0.1
TEST_DB_PORT=5433
TEST_DB_USER=postgres
TEST_DB_PASSWORD=password
TEST_DB_NAME=instagram_clone_server_test
```

### 2. Setup development environment
```bash
## setup containers
docker-compose -f docker-compose-dev.yml --no-start
```

### 3. Usage
```bash
## start services
docker-compose -f docker-compose-dev.yml start
## After starting the services, application will run in background with developement mode.
## With nodemon, any changes that happend inside src directory will trigger it to rebuild and re-serve.
## By default, the application is listsening on port 8080. 
## Also, two databases are running when services started - one for developement and one for testing.
## So, you can run npm test:integration or npm test:e2e without worried any undesired influences on developement database.


## stop services
docker-compose -f docker-compose-dev.yml stop
```

### 4. Tearn down development envrionment
```bash
## remove services
docker-compose -f docker-compose-dev.yml down

## remove created volumes
docker volume prune
```

## API document
API endpoins are documented with swagger-ui-express. Check on documents by starting the service and connect to `http://localhost:8080/api/v1/docs`. 

## Test

### Unit Test
Since unit test does not have any dependencies on database, you can run it directly with:
```bash
npm run test:unit
```

### Integration Test
DAOs need to access database to run integration test. Therefore, remember to start the docker-compose before run integration test:
```bash
docker-compose start ## if services is not started yet

npm run test:integration
```

### E2E Test
E2E test required database to run. Therefore, remember to start the docker-comose before run e2e test:
```bash
docker-compose start ## if services is not started yet

npm run test:e2e
```
### Postman
Testing collection and environment for Postman are provided in `/__test__/postman`. You can import them manually into Postman and run with Collection Runner or run with newman-cli:
```bash
## install newman globally if not installed yet
npm install -g newman

## run test
newman run ./__test__/postman/instagram-clone-server-story-test.postman_collection.json -e ./__test__/postman/instagram-clone-server-env.postman_environment.json --bail
```
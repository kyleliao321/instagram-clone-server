# Instagram Clone - Server

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
docker-compose run --rm app install npm

## build containers
docker-compose --env-file .env up --no-start
```

### 3. Usage
```bash
## start services
docker-compose start
## After starting the services, application will run in background with developement mode.
## With nodemon, any changes that happend inside src directory will trigger it to rebuild and re-serve.
## By default, the application is listsening on port 8080. 
## Also, two databases are running when services started - one for developement and one for testing.
## So, you can run npm test:integration or npm test:e2e without worried any undesired influences on developement database.


## stop services
docker-compose stop
```

### 4. Tearn down development envrionment
```bash
docker-compose down
```
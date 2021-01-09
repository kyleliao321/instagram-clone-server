# Instagram Clone - Server

`Instagram-Clone-Server` is a clone server that used for [Instagram-Clone-Android-Application](https://github.com/kyleliao321/instagram-clone-clean-architecture), which will make network request to it when setup together. This repository won't get into the detail about how to connect two applications, it will only show how to run the server as demo and setup development environment.

## Table of contents
- [Demo](#demo)
- [Development](#development)
- [API document](#api-document)
- [Test](#test)
---
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
Notes: `DEMO_ROOT_USER_NAME` and `DEMO_ROOT_USER_PASSWORD` are optional, if you don't provide it, the application will just use `root` as username and password.

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
---

## Developement
To make development envrionemnt isolated from host machine and prevent any dependency confliction, the project use docker to setup development environment. Follow the instruction below to setup your development envrionment:

### 1. Create .env file
- Create a new file called `.env` in root directory.
- Pass the following text into the file:
```
DEV_DB_HOST=dev-db
DEV_DB_USER=postgres
DEV_DB_PASSWORD=password
DEV_DB_NAME=instagram_clone_server_dev

TEST_DB_HOST=test-db
TEST_DB_USER=postgres
TEST_DB_PASSWORD=password
TEST_DB_NAME=instagram_clone_server_test
```

### 2. Setup development environment
```bash
## setup containers
docker-compose -f docker-compose-dev.yml up -d
```

### 3. Usage
Now, the application should run in created docker container. Although docker-compose has mouted the entire project into the container, you should not working directly on your local machine to make sure development environment is consistent. You have several way to start development with container envrionemnt:

- Run `docker exec -it instagram-clone-server-app sh` in command line to enter the shell of working directory. Inside the shell, you can run all the pre-defined npm scripts, such as `npm run lint`.
- Install [Remote-Container extension](https://code.visualstudio.com/docs/remote/containers) in Visual Studio Code. Then, Prsee `Ctrl + Shift + p` to open Command Palette, and run `Remote-Containers: Attach to Running Container`, select `instagram-clone-server-app`. It will launch the container into vs code. Now, you can open the folder inside `/home/node/app` to start development.

Note: Although you're developing inside docker container, docker-compose bind the working directory on host machine with container's. As a result, any chanags inside container will reflect back to host machine, allow you to use version control tool in host machine.

### 4. Tearn down development envrionment
```bash
## remove services
docker-compose -f docker-compose-dev.yml down

## remove created volumes
docker volume prune
```

---

## API document
API endpoins are documented with swagger-ui-express. Check on documents by starting the service and connect to `http://localhost:8080/api/v1/docs`. 

---

## Test

After setting up development environment, you can run test inside container. 

### Unit Test
```bash
npm run test:unit
```

### Integration Test
```bash
npm run test:integration
```

### E2E Test
```bash
npm run test:e2e
```
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

### 1. Prerequisite
- Install docker and docker-compose on your host machine.
- Clone the project.

### 2. Create .env file
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

### 3. Start demo server
```bash
docker-compose up -d
## WARNING: it might take a few seconds to populate the database
```

### 4. Usage
When services started successfully, the server will listen on `http://localhost:8080`. To make a network request, please check on [API Document](#api-document). 

### 5. Teardown demo server
```bash
## stop and remove services
docker-compose down

## remove created volumes
docker volume prune
```

## Development
To prevent any dependency within application has conflicts with host machine, the project use docker to setup development environment, making it isolated. Follow the instruction below to setup your development envrionment:

### 1. Prerequisite
- Install docker and docker-compose on your host machine.
- Clone the project.

### 2. Create .env file
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

### 3. Setup development environment
```bash
## setup containers
docker-compose -f docker-compose-dev.yml up -d
```

### 4. Usage
Now, the application should run in created docker container. It used nodemon to detect any changes, so it will automatically rebuild the project when needed. You can check on the logs with `docker logs instagram-clone-server-app`, or just attaching shell with the process which container is running on, to see logs in real time: `docker attach instagram-clone-server-app`.

Although docker-compose has mouted the entire project into the container, it is recommended that not directly working on your local machine, to make sure development environment is consistent. You have several way to start development with container envrionemnt:

1. Run `docker exec -it instagram-clone-server-app sh` in shell to enter the shell of working directory. Inside it, you can run all the pre-defined npm scripts, such as `npm run lint` or [testings](#test).
2. Install [Remote-Container extension](https://code.visualstudio.com/docs/remote/containers) in Visual Studio Code. Then, Prsee `Ctrl + Shift + p` to open Command Palette, and run `Remote-Containers: Attach to Running Container`, select `instagram-clone-server-app`. It will launch the container into VS Code.

Note: Although you're developing inside docker container, docker-compose bind the working directory on host machine with container's. As a result, any changes inside container will be reflected back to host machine, allowing you to use version control tool on host machine.

### 5. Tearn down development envrionment
```bash
## remove services
docker-compose -f docker-compose-dev.yml down

## remove created volumes
docker volume prune
```

---

## API document
API endpoins are documented with swagger-ui-express. Check on documents by starting the service and connect to [http://localhost:8080/api/v1/docs](http://localhost:8080/api/v1/docs). 

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

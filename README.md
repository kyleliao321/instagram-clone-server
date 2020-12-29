# Instagram Clone - Server

## Developement

### 1. Create .env file
- Create a new file called `.env` in root directory.
- Pass the following text into the file:
```
DEV_DB_HOST=db
DEV_DB_USER=postgres
DEV_DB_PASSWORD=password
DEV_DB_NAME=instagram_clone_server_dev
```

### 2. Setup development environment
```bash
## setup containers
docker-compose run --rm app install npm

## build containers
docker-compose --env-file .env up --not-start
```

### 3. Usage
```bash
## start services
docker-compose start

## stop services
docker-compose stop
```
- Both postgres database and server should run in background now, you can check them with `docker containers ls` command.
- nodemon is wathcing on `src` directory, and changes will trigger nodemon to rebuild and serve.
- By default, server is listening on port 8080.

### 4. Tearn down development envrionment
```bash
docker-compose down
```
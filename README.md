# Instagram Clone - Server

## Developement

### Create .env file
- Create a new file called `.env` in root directory.
- Pass the following text into the file:
```
DEV_DB_HOST=db
DEV_DB_USER=postgres
DEV_DB_PASSWORD=password
DEV_DB_NAME=instagram_clone_server_dev
```

### Setup development environment
```bash
## setup containers
docker-compose run --rm app install npm

## run containers
docker-compose --env-file .env up -d
```

### Usage
- Both postgres database and server should run in background now, you can check them with `docker containers ls` command.
- nodemon is wathcing on `src` directory, and changes will trigger nodemon to rebuild and serve.
- By default, server is listening on port 8080.

### Tearn down development envrionment
```bash
docker-compose down
```
# Home Library Service

RS School NodeJS 2023 Q2

Task: Logging & Error Handling and Authentication and Authorization

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop](https://docs.docker.com/desktop/) on Mac , Windows or Linux

## Running application

Clone repository

```shell
git clone https://github.com/shopot/nodejs2023Q2-service.git
```

```shell
cd ./nodejs2023Q2-service
```

```shell
git checkout feature/logging-auth
```

Installing NPM modules

```shell
npm install
```

Create .env file (based on .env.example)
and you can change port number in .env file

```shell
cp .env.example .env
```

Start Docker containers

```shell
docker compose up -d
```

Check Docker containers is started

```shell
# List running containers
docker ps

# Check start the application container
docker logs shopot-hls-app
```

Run migrations inside container to create database entities

```shell
docker exec -it shopot-hls-app npm run migration:run
```

## Fetch the logs of app container
Open a new terminal and start fetch the logs of app container
```shell
docker logs -f shopot-hls-app
```

## Running the tests with authentication and authorization
Running the tests inside a Docker container

```shell
docker exec -it shopot-hls-app npm run test:auth
```

Running the tests locally (npm packages should be installed)

```shell
npm run test:auth
```

## Check writing logs
```shell
# List files
docker exec -it shopot-hls-app ls -ls logs

# Example view log file
docker exec -it shopot-hls-app cat <log_filename>
```

## Scan Application image for security vulnerabilities

After the first run of the application, the Docker images will be created you can run scan security vulnerabilities

```shell
npm run scan:security
```

## Build production Docker image with application

Run Docker command for build image with application (don't forget end dotted)

```shell
docker build --no-cache -t example-name:prod  -f docker/bin/api/Dockerfile .
```

Check final size of the Docker image with application

```shell
docker image ls
```

## Docker Containerization detail

Application Dockerfile `docker/bin/postgres/Dockerfile`

PostgreSQL Dockerfile `docker/bin/api/Dockerfile`

Default Docker network is `10.5.0.0/16`

- PostgreSQL Docker container IP's `10.5.0.2`
- Application Docker container IP's `10.5.0.3`

PostgreSQL data files location in `shopot-hls-postgres-volume` volume

PostgreSQL log files location in `shopot-hls-postgres-volume` volume

PostgreSQL config files location in `docker/configs`

#### OpenAPI

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/ (only developer mode).

You can download OpenAPI Specification in JSON or YAML format by typing http://localhost:4000/docs-json
or http://localhost:4000/docs-yaml (only developer mode)

**You will check OpenAPI spec in doc folder corresponds with assignment**

For more information about OpenAPI/Swagger please visit https://swagger.io/.


## Uninstall application

```shell
# Stop containers
docker compose down

# Remove Docker app image
docker image rm shopot-hls-app.dev

# Remove Docker database image
docker image rm shopot-hls-db.dev

# Remove Docker volumes
docker volume rm shopot-hls-postgres-volume
docker volume rm shopot-hls-app-volume
```
## How to remove unused data (remove all unused containers, networks, images, volumes)

[Docker system prune](https://docs.docker.com/engine/reference/commandline/system_prune/)

**WARNING! This will remove:**
  - all stopped containers
  - all networks not used by at least one container
  - all volumes not used by at least one container
  - all images without at least one container associated to them
  - all build cache

```shell
docker system prune -a --volumes
```

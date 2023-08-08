# Home Library Service

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
git checkout feature/pg-docker
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

# Check start application
docker logs shopot-hls-app

# Check containers network
docker network inspect shopot-hls-network
```

Run migrations inside container to create database entities

```shell
docker exec -it shopot-hls-app npm run migration:run
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/ (only developer mode).

You can download OpenAPI Specification in JSON or YAML format by typing http://localhost:4000/docs-json
or http://localhost:4000/docs-yaml (only developer mode)

**You will check OpenAPI spec in doc folder corresponds with assignment**

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running the tests

After creating database entities open new terminal and enter:

```shell
npm run test
```

Or running tests inside a Docker container

```shell
docker exec -it shopot-hls-app npm run test
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

PostgreSQL data files location in `docker/data/pg_data`

PostgreSQL log files location in `docker/data/pg_logs`

PostgreSQL config files location in `docker/configs`

#!/bin/bash

# takes 2-3 minutes - after bash script finishes running, still wait 20 seconds wihle the java backend container is setting up

# before running, make sure none of langutor's containers are already running (todo: automate this/check for this and handle it)


# remove network if it's already there
docker network rm languator_local_container_network || true

docker network create -d bridge --subnet=172.18.0.0/16 languator_local_container_network

docker run -p 3306:3306 --network languator_local_container_network --ip 172.18.0.22 -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7

cd languator-backend

docker build -t se-cw .

# wait for mysql to setup
sleep 20s


docker run -p 8080:8080 --network languator_local_container_network --ip 172.18.0.23 -d se-cw

cd ..

cd languator-frontend

docker build -t languator-frontend .

# wait for java backend to setup
sleep 20s

docker run -p 5000:5000 -d languator-frontend
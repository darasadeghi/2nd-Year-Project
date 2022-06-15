# comes with node and npm installed - this image is sourced from the docker registry, and is 
# then cached on our local machine to save the network overhead for when other (local) docker images 
# want to build-on from this base-image
FROM node:13.12.0-alpine
# set the directroy within the container's file system that all other commands in this docker 
# file should, by default, run relative to
WORKDIR /app
# copy everything in the host's same-directory-as-'this'-dockerfile directory to the 
# "/app/" directory within the docker image's filesystem.
COPY . .
# install node modules into this image's filesystem at the "/app/" directory
RUN npm install
# when a docker container is instantiated from 'this' image, it will have its
# process running on port 8080 exposed to the host machine (machine that instantiates
# docker container) as well as other containers running on the same docker-network (if 
# it's setup)
EXPOSE 5000
# bundle the files with no sourcemaps and don't setup a development file server (that has 
# hot-reload) (the 'dev-build' npm command will bundle the files with source maps and 
# setup a development file-server)
RUN npm run prod-build
# 'CMD' == the sign-off command that'll be called on when we instantiate docker containers from 
# the docker image created by 'this' Dockerfile - everything before this command is run when 
# creating the image, 'this' command is the only thing called on when creating a container from 
# the image - eg, we don't run 'npm install' again when creating a container from an image, we 
# run that when creating an image from a Dockerfile
# TODO: do the OSTEP  project on (file system) images to better understand stuff like this.
CMD ["npm", "run", "serve-prod"]

Languator Frontend

- Design Document: https://docs.google.com/document/d/1eob4KJWfJ8tiHT5_FGrDOypSCnBMrM40aLD9ENr_tu4/edit?usp=sharing

Todo (didn't start todo from the beginning, so the todos aren't from nothing to something):
- [x] solution tab
- [x] leaderboard tab
- [x] attempt tab
- [x] next problem button (with 'french' being the hardcoded language to get, for the time being)
- [x] submit button (only increment user's score when they have not viewed the 'solution' tab && their submission is correct)
- [x] make the mock data access not generate new records everytime the interval triggers, instead make the object stored its own collection of users (will make the mock more realistic)
- [x] notification popup
- [x] add docker file and instructions for how to: Dockerfile->image->container
- [ ] next problem button - create an option to select from a list of languages which one you'll like the next problem to be 
- [ ] create mock backend
- [ ] create new data access implementations that use env variable that's setup to speak to your mock backend
- [ ] figure out how I can pass in environment variables when running a docker container
- [ ] add a docker-compose file to simplify how i instantiate docker containers from an image that's created from this project's docker file (also, make it simple to 'pass-in' environment variables)
- [ ] add scss



How i use this project's Dockerfile to build an image, and then use the image to instantiate a Docker Container:
- "docker build -t languator-frontend-v1 ." - build a docker image using the Dockerfile in the current directory ("." == current directory), and name the docker image "languator-frontend-v1"
- "docker run -d -p 3000:8080 languator-frontend-v1" - instantiates a docker container from the docker image "languator-frontend-v1" - the docker container runs in the background (detached mode) - maps the host machine's port 3000 to the docker container's port 8080. Note: port 8080 is the port that the 'serve' file-server process 'listens' on. Note: if you want to instantiate multiple containers from the same image, then you can but you need to make the host's ports that they listen on be different - eg, the following two commands would setup 2 containers that are instantiated from the same image:
    - "docker run -d -p 3000:8080 languator-frontend-v1"
    - "docker run -d -p 3001:8080 languator-frontend-v1"

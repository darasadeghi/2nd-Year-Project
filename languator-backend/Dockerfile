FROM ubuntu:18.04

# java 8
RUN apt-get update && apt-get install -y openjdk-8-jdk && apt-get clean;

# certificates
RUN apt-get update && apt-get install ca-certificates-java && apt-get clean && update-ca-certificates -f;

# Setup container's shell's environment variable for JAVA_HOME - used by (i think) maven
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

RUN apt-get update
RUN apt-get install -y vim

RUN apt-get install -y maven
COPY . .

RUN ["mvn","package"]

EXPOSE 8080


ENTRYPOINT ["java","-jar","target/languator-backend-0.0.1-SNAPSHOT.jar"]

FROM node
MAINTAINER Skand
EXPOSE 3000
ADD ./server /server/
WORKDIR /server/
RUN ["npm", "install"]
RUN ["npm", "run", "client-install"]
ENTRYPOINT ["npm", "run", "dev"]
